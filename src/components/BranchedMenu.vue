<script setup lang="ts">
import { ref, computed } from "vue";

export interface BranchedSubItem {
    value: string;
    label: string;
    slug: string;
}

export interface BranchedMenuItem {
    label: string;
    children: BranchedSubItem[];
}

const props = withDefaults(
    defineProps<{
        items: BranchedMenuItem[];
        defaultOpen?: number[];
        activeSlug?: string;
        lineColor?: string;
        accentColor?: string;
        rowHeight?: number;
        radius?: number;
        trunk?: number;
        indent?: number;
    }>(),
    {
        defaultOpen: () => [],
        activeSlug: "",
        lineColor: "#E5E5E5",
        accentColor: "#121212",
        rowHeight: 34,
        radius: 8,
        trunk: 14,
        indent: 36,
    },
);

const emit = defineEmits<{
    (e: "selectProject", slug: string): void;
}>();

const openIndices = ref<Set<number>>(new Set(props.defaultOpen));

const toggleSection = (index: number) => {
    if (openIndices.value.has(index)) {
        openIndices.value.delete(index);
    } else {
        openIndices.value.add(index);
    }
};

const r = computed(() => Math.min(props.radius, props.rowHeight / 2 - 2));
const endX = computed(() => props.indent - 6);
const rowY = (k: number) => k * props.rowHeight + props.rowHeight / 2;

const getBranchPath = (k: number) => {
    const y = rowY(k);
    return `M ${props.trunk} 0 L ${props.trunk} ${y - r.value} A ${r.value} ${r.value} 0 0 0 ${props.trunk + r.value} ${y} H ${endX.value}`;
};

const getTrunkHeight = (count: number) => {
    return count > 0 ? (count - 1) * props.rowHeight + props.rowHeight / 2 : 0;
};
</script>

<template>
    <div class="space-y-4 font-mono text-xs select-none">
        <!-- Clean Header -->
        <div
            class="text-[11px] uppercase tracking-wider text-[#A1A1AA] flex items-center justify-between"
        >
            <span>Project Explorer</span>
        </div>

        <div class="space-y-2">
            <div
                v-for="(section, sIdx) in items"
                :key="section.label"
                class="space-y-1"
            >
                <!-- Category Root Header -->
                <button
                    @click="toggleSection(sIdx)"
                    type="button"
                    class="flex items-center gap-2 w-full text-left py-1 text-xs font-semibold text-[#121212] hover:text-[#404040] transition-colors cursor-pointer group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-3.5 h-3.5 transition-transform duration-200 text-[#71717A]"
                        :class="[openIndices.has(sIdx) ? 'rotate-90' : '']"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <span class="font-sans text-xs tracking-tight">{{
                        section.label
                    }}</span>
                    <span class="text-[10px] text-[#A1A1AA] font-mono ml-auto">
                        {{ section.children.length }}
                    </span>
                </button>

                <!-- Branching Children Tree -->
                <div
                    v-if="openIndices.has(sIdx)"
                    class="relative pl-9"
                    :style="{
                        minHeight: `${section.children.length * rowHeight}px`,
                    }"
                >
                    <!-- SVG Branching Trunk and Arms -->
                    <svg
                        class="absolute left-0 top-0 pointer-events-none"
                        :width="indent"
                        :height="section.children.length * rowHeight"
                        fill="none"
                    >
                        <!-- Vertical Trunk Line -->
                        <line
                            :x1="trunk"
                            y1="0"
                            :x2="trunk"
                            :y2="getTrunkHeight(section.children.length)"
                            :stroke="lineColor"
                            stroke-width="1.5"
                        />

                        <!-- Curved Branch Paths to Each Child -->
                        <path
                            v-for="(_, cIdx) in section.children"
                            :key="cIdx"
                            :d="getBranchPath(cIdx)"
                            :stroke="
                                props.activeSlug === section.children[cIdx].slug
                                    ? accentColor
                                    : lineColor
                            "
                            :stroke-width="
                                props.activeSlug === section.children[cIdx].slug
                                    ? 1.8
                                    : 1.5
                            "
                            stroke-linecap="round"
                            class="transition-colors duration-200"
                        />
                    </svg>

                    <!-- Branch Item Labels -->
                    <div
                        v-for="child in section.children"
                        :key="child.slug"
                        class="flex items-center"
                        :style="{ height: `${rowHeight}px` }"
                    >
                        <button
                            @click="emit('selectProject', child.slug)"
                            type="button"
                            class="group flex items-center justify-between w-full text-left transition-colors cursor-pointer"
                            :class="[
                                props.activeSlug === child.slug
                                    ? 'text-[#121212] font-semibold'
                                    : 'text-[#71717A] hover:text-[#121212]',
                            ]"
                        >
                            <span class="truncate font-sans text-xs">
                                {{ child.label }}
                            </span>

                            <span
                                class="w-1.5 h-1.5 rounded-full transition-all duration-200 ml-2"
                                :class="[
                                    props.activeSlug === child.slug
                                        ? 'bg-[#121212] scale-100'
                                        : 'bg-transparent group-hover:bg-[#D4D4D8]',
                                ]"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
