<script setup lang="ts">
import { profile, socials } from "@/data/portfolio";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useStaggerEntrance } from "@/composables/useStaggerEntrance";
import CircularGallery from "@/components/CircularGallery.vue";
import Img1 from "@/assets/aboutme_images/img1.jpg";
import Img2 from "@/assets/aboutme_images/img2.jpg";
import Img3 from "@/assets/aboutme_images/img3.jpg";
import Img4 from "@/assets/aboutme_images/img4.jpg";
import Img5 from "@/assets/aboutme_images/img5.jpg";
import Img6 from "@/assets/aboutme_images/img6.jpg";
import Img7 from "@/assets/aboutme_images/img7.jpg";
import Img8 from "@/assets/aboutme_images/avatar.webp";

const container = ref<HTMLElement | null>(null);
useStaggerEntrance(container);

const currentActivities = [
    {
        label: "Building",
        detail: "Web Applications, Open Source AI Tools, Web Systems, Npm Package.",
    },
    {
        label: "Exploring",
        detail: "AI Engineering, Open Source Tools, Agentic Development",
    },
    {
        label: "Studying",
        detail: "UIUX design princples, Typography, Agent Orchestration",
    },
    {
        label: "Status",
        detail: profile.status,
    },
];

const principles = [
    {
        title: "Clean Architecture First",
        description:
            "I structure projects with clear separation of concerns to keep codebases scalable, maintainable, and easy to extend.",
    },
    {
        title: "Function Over Friction",
        description:
            "I prioritize fast load times, intuitive navigation, and smooth user interactions over unnecessary visual clutter.",
    },
    {
        title: "Data-Driven Precision",
        description:
            "I design systems and workflows around structured data models to ensure accuracy, reliable performance, and smooth API integration.",
    },
    {
        title: "Purposeful Craftsmanship",
        description:
            "I write readable, self-documenting code and build interfaces designed to solve practical real-world problems.",
    },
];

const stack = [
    "HTML",
    "Javascript",
    "Tailwind CSS v4",
    "PHP",
    "Laravel",
    "Git & GitHub",
    "MySql",
    "Css",
    "Antigravity",
    "Zed",
];

const aboutGalleryItems = [
    { image: Img1, text: "Sysarc Defended!" },
    { image: Img2, text: "Kunyari Stolen" },
    { image: Img3, text: "Museum Shot" },
    { image: Img4, text: "Capstone Defended1" },
    { image: Img5, text: "Cloud 9 Antipolo" },
    { image: Img6, text: "CCS NC2 Passer" },
    { image: Img7, text: "Kabado sa panel" },
    { image: Img8, text: "Portrait" },
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

        <section data-animate class="-mx-2 sm:-mx-6 space-y-3">
            <div class="h-[280px] sm:h-[360px] w-full">
                <CircularGallery
                    :items="aboutGalleryItems"
                    :bend="2"
                    text-color="#121212"
                    :border-radius="0.08"
                    font="600 18px Geist Mono"
                    :scroll-speed="2"
                    :scroll-ease="0.06"
                />
            </div>
        </section>

        <!-- Bio / Story -->
        <section
            data-animate
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
