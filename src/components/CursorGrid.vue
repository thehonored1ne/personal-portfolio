<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(
    defineProps<{
        cellSize?: number;
        glowColor?: string;
        radius?: number;
        maxGlow?: number;
    }>(),
    {
        cellSize: 36,
        glowColor: "rgba(18, 18, 18, 0.09)",
        radius: 130,
        maxGlow: 0.8,
    },
);

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number | null = null;

// Exact mouse coordinates
let mouseX = -1000;
let mouseY = -1000;

const updateCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.value;
    if (!canvas) {
        mouseX = clientX;
        mouseY = clientY;
        return;
    }
    const rect = canvas.getBoundingClientRect();
    mouseX = clientX - rect.left;
    mouseY = clientY - rect.top;
};

const handleMouseMove = (e: MouseEvent) => {
    updateCoords(e.clientX, e.clientY);
};

const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
    }
};

const handleMouseLeave = () => {
    mouseX = -1000;
    mouseY = -1000;
};

const resizeCanvas = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
};

const draw = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);

    const size = props.cellSize;
    const cols = Math.ceil(width / size);
    const rows = Math.ceil(height / size);

    // Direct, zero-lag illumination exactly under the cursor
    if (mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
        const mouseCol = Math.floor(mouseX / size);
        const mouseRow = Math.floor(mouseY / size);
        const cellRange = Math.ceil(props.radius / size);

        for (let c = mouseCol - cellRange; c <= mouseCol + cellRange; c++) {
            for (let r = mouseRow - cellRange; r <= mouseRow + cellRange; r++) {
                if (c < 0 || c >= cols || r < 0 || r >= rows) continue;

                const cellCenterX = c * size + size / 2;
                const cellCenterY = r * size + size / 2;
                const dist = Math.hypot(
                    cellCenterX - mouseX,
                    cellCenterY - mouseY,
                );

                if (dist < props.radius) {
                    const intensity =
                        Math.pow(1 - dist / props.radius, 1.8) * props.maxGlow;

                    // Fills the cell lightly under the cursor
                    ctx.fillStyle = `rgba(18, 18, 18, ${(intensity * 0.05).toFixed(3)})`;
                    ctx.fillRect(c * size, r * size, size, size);

                    // Soft outline of only the active illuminated cells
                    ctx.strokeStyle = `rgba(18, 18, 18, ${(intensity * 0.14).toFixed(3)})`;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(
                        c * size + 0.5,
                        r * size + 0.5,
                        size - 1,
                        size - 1,
                    );
                }
            }
        }
    }

    animationFrameId = requestAnimationFrame(draw);
};

onMounted(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(draw);
});

onUnmounted(() => {
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("mouseleave", handleMouseLeave);
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
});
</script>

<template>
    <Teleport to="body">
        <canvas
            ref="canvasRef"
            class="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        />
    </Teleport>
</template>
