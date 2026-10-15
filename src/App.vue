<script setup lang="ts">
import { RouterView } from "vue-router";
import LineSidebar from "@/components/LineSidebar.vue";
import Dock from "@/components/Dock.vue";
</script>

<template>
    <div
        class="min-h-screen text-[#121212] flex flex-col font-sans antialiased selection:bg-[#E5E5E5] selection:text-[#121212] pb-20 lg:pb-8"
    >
        <!-- Fixed Left Page Navigation (LineSidebar from Vue Bits) -->
        <LineSidebar />

        <!-- Main Content Shell -->
        <main
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
