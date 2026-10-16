<script setup lang="ts">
import { profile, socials } from "@/data/portfolio";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useStaggerEntrance } from "@/composables/useStaggerEntrance";

const container = ref<HTMLElement | null>(null);
useStaggerEntrance(container);

const currentActivities = [
    {
        label: "Building",
        detail: "Resilient web applications, zero-runtime design token tooling, and keyboard-first user interfaces.",
    },
    {
        label: "Exploring",
        detail: "Local-first software architectures, SQLite compiled to WebAssembly, and sub-50ms interaction latency.",
    },
    {
        label: "Studying",
        detail: "Typography history, optical kerning rules, and quiet, distraction-free interface design.",
    },
    {
        label: "Status",
        detail: profile.status,
    },
];

const principles = [
    {
        title: "Ergonomics over novelty",
        description:
            "Tools should get out of the way. Prioritize keyboard shortcuts, sub-100ms response times, and intuitive layout over decorative excess.",
    },
    {
        title: "Typographic hierarchy",
        description:
            "Clear hierarchy communicates structure before text is read. Restrain font weights and rely on spacing and tonal contrast.",
    },
    {
        title: "Quiet craftsmanship",
        description:
            "Hairline dividers, tactile hover micro-transitions, and calm palette choices yield enduring software that remains enjoyable over time.",
    },
];

const stack = [
    "Vue 3 (Composition API)",
    "TypeScript",
    "Tailwind CSS v4",
    "Vite",
    "Node.js",
    "Git & GitHub",
];
</script>

<template>
    <div ref="container" class="max-w-2xl mx-auto space-y-12">
        <!-- Header -->
        <header data-animate class="space-y-2">
            <h1
                class="text-2xl sm:text-3xl font-semibold tracking-tight text-[#121212]"
            >
                About Me
            </h1>
            <p class="text-xs font-mono text-[#71717A]">
                Background, current focus & values
            </p>
        </header>

        <!-- Bio / Story -->
        <section data-animate
            class="space-y-3.5 text-sm text-[#404040] leading-relaxed text-justify"
        >
            <p>
                I'm {{ profile.name }}, a
                {{ profile.role.toLowerCase() }} currently based in
                {{ profile.location }}.
            </p>
            <p>
                I focus on developing resilient web applications and robust
                design systems. My work lives at the intersection of aesthetic
                discipline and engineering performance—ensuring interfaces feel
                instant, look considered, and scale gracefully without
                superfluous complexity.
            </p>
            <p>
                When away from the editor, I research typography, contribute to
                open source utilities, and write notes on design ergonomics.
            </p>
        </section>

        <!-- What I'm Doing Now -->
        <section data-animate class="space-y-4">
            <div
                class="pb-2.5 border-b border-[#E5E5E5] flex items-center justify-between"
            >
                <h2
                    class="text-xs font-mono uppercase tracking-wider text-[#71717A]"
                >
                    What I'm Doing Now
                </h2>
                <span
                    class="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#71717A]"
                >
                    <span
                        class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                    ></span>
                    Active
                </span>
            </div>

            <div class="space-y-3">
                <div
                    v-for="item in currentActivities"
                    :key="item.label"
                    data-animate
                    class="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 items-baseline"
                >
                    <span class="text-xs font-mono font-medium text-[#121212]">
                        {{ item.label }}
                    </span>
                    <p
                        class="text-xs text-[#404040] leading-relaxed sm:col-span-3 text-justify"
                    >
                        {{ item.detail }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Principles -->
        <section data-animate class="space-y-4">
            <div class="pb-2.5 border-b border-[#E5E5E5]">
                <h2
                    class="text-xs font-mono uppercase tracking-wider text-[#71717A]"
                >
                    Design & Code Philosophy
                </h2>
            </div>

            <div class="space-y-4">
                <div
                    v-for="principle in principles"
                    :key="principle.title"
                    data-animate
                    class="space-y-1"
                >
                    <div class="text-sm font-medium text-[#121212]">
                        {{ principle.title }}
                    </div>
                    <p
                        class="text-xs text-[#404040] leading-relaxed text-justify"
                    >
                        {{ principle.description }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Tooling -->
        <section data-animate class="space-y-3">
            <div class="pb-2.5 border-b border-[#E5E5E5]">
                <h2
                    class="text-xs font-mono uppercase tracking-wider text-[#71717A]"
                >
                    Primary Stack
                </h2>
            </div>

            <div class="flex flex-wrap gap-2">
                <span
                    v-for="tech in stack"
                    :key="tech"
                    data-animate
                    class="px-2.5 py-1 rounded bg-[#F4F4F5] border border-[#E5E5E5] text-xs font-mono text-[#404040]"
                >
                    {{ tech }}
                </span>
            </div>
        </section>

        <!-- Keep in touch -->
        <section data-animate class="space-y-3 pt-6 border-t border-[#E5E5E5]">
            <div
                class="text-xs font-mono uppercase tracking-wider text-[#71717A]"
            >
                Keep in touch
            </div>
            <p class="text-xs text-[#404040] leading-relaxed text-justify">
                Feel free to reach out for collaborations, project inquiries, or
                discussion:
            </p>
            <div class="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                <a
                    v-for="social in socials"
                    :key="social.label"
                    :href="social.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs font-mono text-[#404040] hover:text-[#121212] transition-colors inline-flex items-center gap-1 group"
                >
                    <span
                        class="underline underline-offset-4 decoration-[#E5E5E5] group-hover:decoration-[#121212] transition-colors"
                        >{{ social.label }}</span
                    >
                    <span
                        class="text-[#A1A1AA] group-hover:text-[#121212] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        >&nearr;</span
                    >
                </a>
            </div>
        </section>

        <!-- Return Link -->
        <div data-animate class="pt-4 border-t border-[#E5E5E5]">
            <RouterLink
                to="/"
                class="inline-flex items-center gap-1.5 text-xs font-mono text-[#71717A] hover:text-[#121212] transition-colors"
            >
                &larr; Back to Home
            </RouterLink>
        </div>
    </div>
</template>
