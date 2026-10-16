<script setup lang="ts">
import { experience } from "@/data/portfolio";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useStaggerEntrance } from "@/composables/useStaggerEntrance";

const container = ref<HTMLElement | null>(null);
useStaggerEntrance(container);
</script>

<template>
    <div ref="container" class="max-w-2xl mx-auto space-y-12 pb-8">
        <!-- Header -->
        <header data-animate class="space-y-2 pb-2.5 border-b border-[#E5E5E5]">
            <h1
                class="text-2xl sm:text-3xl font-semibold tracking-tight text-[#121212]"
            >
                Experience
            </h1>
            <p class="text-xs font-mono text-[#71717A]">
                Career timeline &amp; technical contributions
            </p>
        </header>

        <!-- Experience Ledger -->
        <div class="space-y-10">
            <article
                v-for="job in experience"
                :key="job.company"
                data-animate
                class="space-y-4 pb-10 border-b border-[#E5E5E5] last:border-b-0 last:pb-0"
            >
                <!-- Company Header & Timeline Period -->
                <div
                    class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                >
                    <div class="space-y-0.5">
                        <h2
                            class="text-base sm:text-[17px] font-semibold text-[#121212] tracking-tight"
                        >
                            <a
                                v-if="job.href"
                                :href="job.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="hover:text-black transition-colors inline-flex items-center gap-1.5 group"
                            >
                                <span
                                    class="underline underline-offset-4 decoration-[#E5E5E5] group-hover:decoration-[#121212] transition-colors"
                                >
                                    {{ job.company }}
                                </span>
                                <span
                                    class="text-[#A1A1AA] group-hover:text-[#121212] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-xs"
                                    aria-hidden="true"
                                >
                                    &nearr;
                                </span>
                            </a>
                            <span v-else>{{ job.company }}</span>
                        </h2>
                        <div
                            class="text-xs font-mono font-medium text-[#27272A]"
                        >
                            {{ job.role }}
                        </div>
                    </div>

                    <div
                        class="text-xs font-mono text-[#71717A] shrink-0 pt-0.5 sm:pt-0"
                    >
                        <span
                            class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#F4F4F5] border border-[#E5E5E5]"
                        >
                            {{ job.period }}
                            <span v-if="job.location" class="text-[#A1A1AA]">
                                &middot; {{ job.location }}
                            </span>
                        </span>
                    </div>
                </div>

                <!-- Role Overview / Narrative -->
                <p
                    v-if="job.description"
                    class="text-xs sm:text-sm text-[#3F3F46] leading-relaxed text-justify"
                >
                    {{ job.description }}
                </p>

                <!-- Key Achievements -->
                <div
                    v-if="job.achievements && job.achievements.length"
                    class="space-y-2.5 pt-1"
                >
                    <div
                        class="text-[11px] font-mono uppercase tracking-wider text-[#71717A] font-medium"
                    >
                        Key Accomplishments
                    </div>
                    <ul class="space-y-2">
                        <li
                            v-for="item in job.achievements"
                            :key="item"
                            data-animate
                            class="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#3F3F46] leading-relaxed text-justify"
                        >
                            <span
                                class="w-1.5 h-1.5 rounded-full bg-[#121212] mt-2 shrink-0"
                                aria-hidden="true"
                            ></span>
                            <span>{{ item }}</span>
                        </li>
                    </ul>
                </div>
            </article>
        </div>

        <!-- Return Link -->
        <div data-animate class="pt-6 border-t border-[#E5E5E5]">
            <RouterLink
                to="/"
                class="inline-flex items-center gap-1.5 text-xs font-mono text-[#71717A] hover:text-[#121212] transition-colors"
            >
                &larr; Back to Home
            </RouterLink>
        </div>
    </div>
</template>
