<script setup lang="ts">
import {
    computed,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    onUpdated,
    ref,
    watch,
    type CSSProperties,
} from "vue";

export type RefineFrameStatus =
    "queued" | "generating" | "refining" | "complete" | "error";

interface RefineFrameProps {
    status?: RefineFrameStatus;
    aspectRatio?: string;
    width?: number | string;
    radius?: number;
    background?: string;
    color?: string;
    stageDuration?: number;
    sweep?: boolean;
    showStatus?: boolean;
    hideAfter?: number;
    labels?: Partial<Record<RefineFrameStatus, string>>;
    retryLabel?: string;
    className?: string;
}

type Stage = { blur: number; sat: number; scale: number; opacity: number };
interface Sim {
    p: number;
    raf: number;
    last: number;
    key: string;
    w: number;
    h: number;
    levels: HTMLCanvasElement[];
    glint: CanvasGradient | null;
    sent: boolean;
}

const STAGES: Record<RefineFrameStatus, Stage> = {
    queued: { blur: 4, sat: 0.6, scale: 1.04, opacity: 0.7 },
    generating: { blur: 1.5, sat: 0.8, scale: 1.02, opacity: 0.85 },
    refining: { blur: 0.5, sat: 0.95, scale: 1.005, opacity: 1 },
    complete: { blur: 0, sat: 1, scale: 1, opacity: 1 },
    error: { blur: 2, sat: 0.5, scale: 1, opacity: 0.28 },
};

const TARGET: Partial<Record<RefineFrameStatus, number>> = {
    queued: 0,
    generating: 0.5,
    refining: 0.875,
    complete: 1,
};

const LEVELS = [48, 32, 20, 12, 8, 5, 3, 2, 1];
const EDGE = 28;
const STRIPS = 14;
const DEFAULT_LABELS: Record<RefineFrameStatus, string> = {
    queued: "Queued",
    generating: "Generating",
    refining: "Refining",
    complete: "Ready",
    error: "Failed",
};
const ACTIVE = new Set<string>(["queued", "generating", "refining"]);

const props = withDefaults(defineProps<RefineFrameProps>(), {
    status: "generating",
    aspectRatio: "1 / 1",
    width: "100%",
    radius: 9999,
    background: "#18181b",
    color: "#f5f5f5",
    stageDuration: 400,
    sweep: true,
    showStatus: true,
    hideAfter: 1400,
    labels: undefined,
    retryLabel: "Retry",
    className: "",
});

const emit = defineEmits<{ retry: [] }>();

const instance = getCurrentInstance();
const hasRetry = () => !!instance?.vnode.props?.onRetry;

const stage = computed(() => STAGES[props.status] ?? STAGES.generating);
const active = computed(() => ACTIVE.has(props.status));
const text = computed(() => ({ ...DEFAULT_LABELS, ...props.labels }));

const printRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const sim: Sim = {
    p: 0,
    raf: 0,
    last: 0,
    key: "",
    w: 0,
    h: 0,
    levels: [],
    glint: null,
    sent: false,
};
let reduce = false;
const mosaic = ref(false);
const resolved = ref(false);

const chip = ref(props.showStatus);
let chipTimer: ReturnType<typeof setTimeout> | undefined;

const syncChip = () => {
    clearTimeout(chipTimer);
    if (!props.showStatus) {
        chip.value = false;
        return;
    }
    chip.value = true;
    if (props.status === "complete" && props.hideAfter > 0) {
        chipTimer = setTimeout(() => (chip.value = false), props.hideAfter);
    }
};
watch(() => [props.status, props.showStatus, props.hideAfter], syncChip);

const build = (
    s: Sim,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement,
    dpr: number,
) => {
    const rect = canvas.getBoundingClientRect();
    const numW =
        typeof props.width === "number"
            ? props.width
            : parseFloat(props.width as string) || 280;
    const W = Math.max(
        1,
        Math.round((rect.width > 0 ? rect.width : numW) * dpr),
    );
    const H = Math.max(
        1,
        Math.round((rect.height > 0 ? rect.height : numW) * dpr),
    );
    const key = `${img.currentSrc || img.src}|${W}x${H}`;
    if (s.key === key && s.levels.length > 0) return;
    s.key = key;
    s.w = W;
    s.h = H;
    canvas.width = W;
    canvas.height = H;

    const iw = img.naturalWidth || W;
    const ih = img.naturalHeight || H;
    const cover = Math.max(W / iw, H / ih);
    const sw = W / cover;
    const sh = H / cover;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;

    const glint =
        canvas.getContext("2d")?.createLinearGradient(0, 0, W, 0) ?? null;
    if (glint) {
        for (const [at, a] of [
            [0, 0],
            [0.08, 0.1],
            [0.2, 0.7],
            [0.32, 1],
            [0.68, 1],
            [0.8, 0.7],
            [0.92, 0.1],
            [1, 0],
        ]) {
            glint.addColorStop(at, `rgba(255, 255, 255, ${a})`);
        }
    }
    s.glint = glint;

    s.levels = LEVELS.map((block) => {
        const b = block === 1 ? 1 : Math.max(2, Math.round(block * dpr));
        const full = document.createElement("canvas");
        full.width = W;
        full.height = H;
        const fc = full.getContext("2d");
        if (!fc) return full;

        if (b === 1) {
            fc.imageSmoothingEnabled = true;
            fc.imageSmoothingQuality = "high";
            try {
                fc.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
            } catch {
                // Safe fallback
            }
            return full;
        }

        const small = document.createElement("canvas");
        small.width = Math.max(1, Math.round(W / b));
        small.height = Math.max(1, Math.round(H / b));
        const sc = small.getContext("2d");
        if (sc) {
            sc.imageSmoothingEnabled = true;
            sc.imageSmoothingQuality = "high";
            try {
                sc.drawImage(
                    img,
                    sx,
                    sy,
                    sw,
                    sh,
                    0,
                    0,
                    small.width,
                    small.height,
                );
            } catch {
                // Safe fallback
            }
        }

        fc.imageSmoothingEnabled = false;
        try {
            fc.drawImage(small, 0, 0, W, H);
        } catch {
            // Safe fallback
        }
        return full;
    });
};

const tick = (now: number) => {
    const s = sim;
    const canvas = canvasRef.value;
    const img = printRef.value?.querySelector("img") as HTMLImageElement | null;
    if (!canvas || !img || !img.naturalWidth) {
        s.raf = 0;
        return;
    }
    const dt = Math.min(0.05, s.last ? (now - s.last) / 1000 : 0.016);
    s.last = now;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    try {
        build(s, canvas, img, dpr);
    } catch {
        s.raf = 0;
        resolved.value = true;
        return;
    }

    const n = s.levels.length - 1;
    const target = TARGET[props.status] ?? s.p;
    const rate = reduce ? 1e9 : 1 / (n * (props.stageDuration / 1000));
    const step = rate * dt;
    if (target < s.p) s.p = target;
    else if (target - s.p <= step) s.p = target;
    else s.p += step;

    const ctx = canvas.getContext("2d");
    if (ctx && s.levels.length > 0) {
        const L = s.p * n;
        const i = Math.min(n, Math.floor(L + 1e-6));
        const frac = L - i;
        ctx.globalAlpha = 1;
        if (s.levels[i]) {
            ctx.drawImage(s.levels[i], 0, 0);
        }
        if (i < n && frac > 0 && s.levels[i + 1]) {
            const edge = EDGE * dpr;
            const front = frac * (s.h + edge) - edge / 2;
            const top = Math.max(0, Math.floor(front - edge / 2));
            if (top > 0)
                ctx.drawImage(s.levels[i + 1], 0, 0, s.w, top, 0, 0, s.w, top);
            const sh = edge / STRIPS;
            for (let k = 0; k < STRIPS; k += 1) {
                const y = front - edge / 2 + k * sh;
                if (y + sh <= 0 || y >= s.h) continue;
                const t = 1 - (k + 0.5) / STRIPS;
                ctx.globalAlpha = t * t * (3 - 2 * t);
                const y0 = Math.max(0, y);
                const h0 = Math.min(s.h, y + sh) - y0;
                if (h0 > 0)
                    ctx.drawImage(
                        s.levels[i + 1],
                        0,
                        y0,
                        s.w,
                        h0,
                        0,
                        y0,
                        s.w,
                        h0,
                    );
            }
            ctx.globalAlpha = 1;
            if (props.sweep && !reduce && s.glint && front > 0 && front < s.h) {
                ctx.fillStyle = s.glint;
                ctx.globalAlpha = 0.12;
                ctx.fillRect(0, front - 2 * dpr, s.w, 4 * dpr);
                ctx.globalAlpha = 0.3;
                ctx.fillRect(0, front - dpr, s.w, 2 * dpr);
                ctx.globalAlpha = 1;
            }
        }
    }

    const done = s.p >= 1;
    if (done !== s.sent) {
        s.sent = done;
        resolved.value = done;
    }
    const keep =
        (!reduce && ACTIVE.has(props.status)) ||
        Math.abs(target - s.p) > 0.0005;
    s.raf = keep ? requestAnimationFrame(tick) : 0;
    if (!keep) s.last = 0;
};

const wake = () => {
    if (!sim.raf) sim.raf = requestAnimationFrame(tick);
};

let unbindImage: (() => void) | null = null;
const bindImage = () => {
    unbindImage?.();
    unbindImage = null;
    const img = printRef.value?.querySelector("img") as HTMLImageElement | null;
    if (!img) {
        mosaic.value = false;
        return;
    }
    let gone = false;
    const start = () => {
        if (gone) return;
        mosaic.value = true;
        wake();
    };
    if (img.complete && img.naturalWidth) {
        start();
    } else {
        img.addEventListener("load", start, { once: true });
        img.addEventListener(
            "error",
            () => {
                mosaic.value = false;
                resolved.value = true;
            },
            { once: true },
        );
    }
    unbindImage = () => {
        gone = true;
        img.removeEventListener("load", start);
    };
};

let mq: MediaQueryList | null = null;
const syncReduce = () => {
    reduce = !!mq?.matches;
};

onMounted(() => {
    mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    syncReduce();
    mq.addEventListener("change", syncReduce);
    syncChip();
    bindImage();
    wake();
});

onUpdated(bindImage);
watch(() => props.status, bindImage, { flush: "post" });
watch(
    () => [props.status, props.width, props.aspectRatio],
    () => {
        if (props.status === "queued") {
            sim.p = 0;
            resolved.value = false;
        }
        wake();
    },
    { flush: "post" },
);

onUnmounted(() => {
    cancelAnimationFrame(sim.raf);
    clearTimeout(chipTimer);
    unbindImage?.();
    mq?.removeEventListener("change", syncReduce);
});

const rootStyle = computed<CSSProperties>(() => {
    const w =
        typeof props.width === "number" ? `${props.width}px` : props.width;
    return {
        width: w || "100%",
        height: w || "100%",
        aspectRatio: props.aspectRatio || "1 / 1",
        borderRadius: props.radius >= 999 ? "9999px" : `${props.radius}px`,
        backgroundColor: props.background,
        color: props.color,
    };
});

const stageStyle = computed<CSSProperties>(() => ({
    opacity: stage.value.opacity,
    filter:
        mosaic.value && !resolved.value
            ? "none"
            : `blur(${stage.value.blur}px) saturate(${stage.value.sat})`,
    transform: `scale(${stage.value.scale})`,
    transition: `opacity ${props.stageDuration}ms ease, filter ${props.stageDuration}ms ease, transform ${props.stageDuration}ms ease`,
}));
</script>

<template>
    <div
        class="group isolate relative overflow-hidden select-none shrink-0"
        :class="className"
        role="img"
        :aria-label="text[status] ?? status"
        :aria-busy="active || undefined"
        :style="rootStyle"
    >
        <!-- Visual container with stage effects -->
        <div
            class="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden"
            :style="stageStyle"
            aria-hidden="true"
        >
            <!-- Base slotted image: visible underneath, and fully clear once resolved -->
            <div
                ref="printRef"
                class="w-full h-full [&>*]:w-full [&>*]:h-full [&>*]:object-cover rounded-[inherit]"
            >
                <slot />
            </div>

            <!-- Procedural pixelation canvas: active during queued/generating/refining -->
            <canvas
                ref="canvasRef"
                class="absolute inset-0 w-full h-full pointer-events-none rounded-[inherit] transition-opacity duration-300"
                :class="[mosaic && !resolved ? 'opacity-100' : 'opacity-0']"
            />
        </div>

        <!-- Soft glint sweep band overlay -->
        <div
            v-if="sweep && active"
            class="absolute inset-0 pointer-events-none rounded-[inherit] [background:linear-gradient(115deg,transparent_36%,rgba(255,255,255,0.4)_50%,transparent_64%)] [background-size:260%_100%] [animation:refine-frame-sweep_2.2s_linear_infinite]"
            aria-hidden="true"
        />

        <!-- Status Chip at the bottom -->
        <div
            v-if="chip"
            class="absolute items-center gap-1.5 opacity-100 backdrop-blur-[8px] px-3 rounded-full h-[24px] pointer-events-none shadow-md z-10 [background:rgba(24,24,27,0.85)] border border-white/15 text-white text-[11px] font-mono tracking-tight transition-all duration-300"
            :class="[
                radius >= 100
                    ? 'bottom-3 left-1/2 -translate-x-1/2 inline-flex'
                    : 'bottom-2.5 left-2.5 inline-flex',
            ]"
            aria-hidden="true"
        >
            <span
                class="inline-flex items-center justify-center shrink-0"
                :class="[active ? 'animate-spin' : '']"
            >
                <!-- Ready / Complete: Checkmark -->
                <svg
                    v-if="status === 'complete'"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-3.5 h-3.5 text-[#22C55E]"
                >
                    <path d="M3.5 8.5l3 3 6-6" />
                </svg>

                <!-- Error: Alert icon -->
                <svg
                    v-else-if="status === 'error'"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-3.5 h-3.5 text-red-400"
                >
                    <circle cx="8" cy="8" r="6" />
                    <line x1="8" y1="5" x2="8" y2="8" />
                    <circle cx="8" cy="11" r="0.5" fill="currentColor" />
                </svg>

                <!-- Queued / Generating / Refining: Spinner -->
                <svg
                    v-else
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-3 h-3 text-zinc-300"
                >
                    <path d="M14 8A6 6 0 1 0 4 13.5" />
                </svg>
            </span>

            <span :key="status" class="leading-none whitespace-nowrap">
                {{ text[status] ?? status }}
            </span>
        </div>

        <!-- Error Retry Button -->
        <button
            v-if="status === 'error' && hasRetry()"
            type="button"
            class="inline-flex top-1/2 left-1/2 absolute items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium cursor-pointer -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all"
            @click="emit('retry')"
        >
            <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-3 h-3"
            >
                <path d="M2 8a6 6 0 1 1 2 4.5" />
                <path d="M2 13V8h5" />
            </svg>
            <span>{{ retryLabel }}</span>
        </button>

        <span class="sr-only" role="status">{{ text[status] ?? status }}</span>
    </div>
</template>

<style scoped>
@keyframes refine-frame-sweep {
    from {
        background-position: 130% 0;
    }
    to {
        background-position: -130% 0;
    }
}
</style>
