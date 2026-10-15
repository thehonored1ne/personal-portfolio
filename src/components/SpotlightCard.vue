<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
    defineProps<{
        spotlightColor?: string;
        class?: string;
    }>(),
    {
        spotlightColor: "rgba(18, 18, 18, 0.04)",
    },
);

const cardRef = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);
const isHovered = ref(false);

const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.value) return;
    const rect = cardRef.value.getBoundingClientRect();
    mouseX.value = e.clientX - rect.left;
    mouseY.value = e.clientY - rect.top;
};

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};
</script>

<template>
    <div
        ref="cardRef"
        @mousemove="handleMouseMove"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        :class="[
            'relative overflow-hidden rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] transition-all duration-200',
            props.class,
        ]"
    >
        <!-- Dynamic Cursor Spotlight Effect with soft ambient warmth -->
        <div
            class="pointer-events-none absolute -inset-px transition-opacity duration-300 z-1"
            :style="{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(420px circle at ${mouseX}px ${mouseY}px, ${props.spotlightColor}, transparent 80%)`,
            }"
        />

        <div class="relative z-10">
            <slot />
        </div>
    </div>
</template>
