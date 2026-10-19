<script setup lang="ts">
import { education } from "@/data/portfolio";
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
                Education
            </h1>
            <p class="text-xs font-mono text-[#71717A]">
                Academic background, foundation &amp; studies
            </p>
        </header>

        <!-- Education Ledger -->
        <div class="space-y-10">
            <article
                v-for="item in education"
                :key="item.institution"
                data-animate
                class="space-y-4 pb-10 border-b border-[#E5E5E5] last:border-b-0 last:pb-0"
            >
                <div
                    class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                >
                    <div class="space-y-0.5">
                        <div class="flex items-center gap-2 flex-wrap">
                            <h2
                                class="text-base sm:text-[17px] font-semibold text-[#121212] tracking-tight"
                            >
                                {{ item.institution }}
                            </h2>
                        </div>
                        <div
                            v-if="item.degree || item.field || item.strand"
                            class="text-xs font-mono font-medium text-[#27272A]"
                        >
                            <template v-if="item.degree">
                                {{ item.degree }}<span v-if="item.field">
                                    in {{ item.field }}</span
                                >
                            </template>
                            <template v-else-if="item.strand">
                                {{ item.strand }}
                            </template>
                        </div>
                    </div>

                    <div
                        class="text-xs font-mono text-[#71717A] shrink-0 pt-0.5 sm:pt-0"
                    >
                        <span
                            class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#F4F4F5] border border-[#E5E5E5]"
                        >
                            {{ item.period }}
                            <span v-if="item.location" class="text-[#A1A1AA]">
                                &middot; {{ item.location }}
                            </span>
                        </span>
                    </div>
                </div>

                <!-- Degree Overview Narrative -->
                <p
                    v-if="item.description"
                    class="text-[15px] text-[#3F3F46] leading-relaxed max-w-prose"
                >
                    {{ item.description }}
                </p>

                <!-- Highlights & Coursework -->
                <div
                    v-if="item.highlights && item.highlights.length"
                    class="space-y-2.5 pt-1"
                >
                    <div
                        class="text-[11px] font-mono uppercase tracking-wider text-[#71717A] font-medium"
                    >
                        Academic Highlights &amp; Coursework
                    </div>
                    <ul class="space-y-2">
                        <li
                            v-for="h in item.highlights"
                            :key="h"
                            data-animate
                            class="flex items-start gap-2.5 text-[14px] text-[#3F3F46] leading-relaxed"
                        >
                            <span
                                class="w-1.5 h-1.5 rounded-full bg-[#121212] mt-2 shrink-0"
                                aria-hidden="true"
                            ></span>
                            <span>{{ h }}</span>
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
