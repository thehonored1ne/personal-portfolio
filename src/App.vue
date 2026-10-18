<script setup lang="ts">
import { RouterView } from "vue-router";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import LineSidebar from "@/components/LineSidebar.vue";
import Dock from "@/components/Dock.vue";

const router = useRouter();
const route = useRoute();
const isNavigatingByScroll = ref(false);
const pageRoutes = ["home", "about", "experience", "education", "certifications", "contact"];
let touchStartY = 0;
let touchStartedInScrollableElement = false;
let bottomBoundaryArmed = false;
let topBoundaryArmed = false;
let pageResizeObserver: ResizeObserver | undefined;
const mainContent = ref<HTMLElement | null>(null);

const isAtTop = () => window.scrollY <= 0;
const isAtBottom = () =>
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

const handleScroll = () => {
    topBoundaryArmed = isAtTop();
    bottomBoundaryArmed = isAtBottom();
};

const isInsideScrollableElement = (target: EventTarget | null, deltaY = 0) => {
    let element = target instanceof HTMLElement ? target : null;

    while (element && element !== document.body) {
        const styles = window.getComputedStyle(element);
        const canScroll =
            (styles.overflowY === "auto" || styles.overflowY === "scroll") &&
            element.scrollHeight > element.clientHeight;

        if (canScroll) {
            const canScrollDown = element.scrollTop + element.clientHeight < element.scrollHeight;
            const canScrollUp = element.scrollTop > 0;

            if (
                deltaY === 0 ||
                (deltaY > 0 && canScrollDown) ||
                (deltaY < 0 && canScrollUp)
            ) {
                return true;
            }
        }
        element = element.parentElement;
    }

    return false;
};

const navigateAtBoundary = (direction: "next" | "previous") => {
    if (isNavigatingByScroll.value) return;

    const currentIndex = pageRoutes.indexOf(String(route.name));
    if (currentIndex === -1) return;

    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0 || nextIndex >= pageRoutes.length) return;

    isNavigatingByScroll.value = true;
    // Automatic scroll navigation should not create history entries that the
    // browser may later mark as skippable because they had no click gesture.
    router.replace({ name: pageRoutes[nextIndex] });
};

const handleWheel = (event: WheelEvent) => {
    if (Math.abs(event.deltaY) < 12) return;
    // Nested scroll areas own the gesture completely. Their wheel events must
    // never bubble into the page-level route navigation handler.
    if (isInsideScrollableElement(event.target)) return;
    if (event.deltaY > 0 && bottomBoundaryArmed) {
        bottomBoundaryArmed = false;
        navigateAtBoundary("next");
    }
    if (event.deltaY < 0 && topBoundaryArmed) {
        topBoundaryArmed = false;
        navigateAtBoundary("previous");
    }
};

const handleTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0]?.clientY ?? 0;
    touchStartedInScrollableElement = isInsideScrollableElement(event.target);
};

const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartedInScrollableElement) return;
    const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
    const distance = touchStartY - touchEndY;
    if (Math.abs(distance) < 55) return;
    if (distance > 0 && bottomBoundaryArmed) {
        bottomBoundaryArmed = false;
        navigateAtBoundary("next");
    }
    if (distance < 0 && topBoundaryArmed) {
        topBoundaryArmed = false;
        navigateAtBoundary("previous");
    }
};

onMounted(() => {
    handleScroll();
    if (mainContent.value) {
        pageResizeObserver = new ResizeObserver(() => handleScroll());
        pageResizeObserver.observe(mainContent.value);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
});

watch(
    () => route.fullPath,
    async () => {
        // Reset route-specific boundary state before measuring the new page.
        topBoundaryArmed = false;
        bottomBoundaryArmed = false;
        await nextTick();
        handleScroll();
        isNavigatingByScroll.value = false;
    },
);

onBeforeUnmount(() => {
    pageResizeObserver?.disconnect();
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchend", handleTouchEnd);
});
</script>

<template>
    <div
        class="min-h-screen text-[#121212] flex flex-col font-sans antialiased selection:bg-[#E5E5E5] selection:text-[#121212] pb-20 lg:pb-8"
    >
        <!-- Fixed Left Page Navigation (LineSidebar from Vue Bits) -->
        <LineSidebar />

        <!-- Main Content Shell -->
        <main
            ref="mainContent"
            class="flex-1 max-w-5xl w-full mx-auto px-6 sm:px-12 py-8 sm:py-14"
        >
            <RouterView />
        </main>

        <!-- Floating Dock for Mobile Navigation -->
        <Dock />

        <!-- Ultra-Slim Minimal Footer -->
        <footer class="border-t border-[#E5E5E5] py-2.5 text-xs text-[#71717A]">
            <div
                class="max-w-5xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-1 font-mono text-[11px]"
            >
                <span>Design and Developed by Dion Areglo</span>
                <span class="text-[#A1A1AA]"
                    >version 1.0.0 &middot; &copy; 2026</span
                >
            </div>
        </footer>
    </div>
</template>
