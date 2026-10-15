<script setup lang="ts">
import { experience } from "@/data/portfolio";
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="animate-fade-in max-w-2xl mx-auto space-y-12">
        <!-- Header -->
        <header class="space-y-2">
            <h1
                class="text-2xl sm:text-3xl font-semibold tracking-tight text-[#121212]"
            >
                Experience
            </h1>
            <p class="text-xs font-mono text-[#71717A]">
                Career timeline & technical contributions
            </p>
        </header>

        <!-- Experience Ledger -->
        <div class="space-y-10">
            <article
                v-for="job in experience"
                :key="job.company"
                class="space-y-4 pb-8 border-b border-[#E5E5E5] last:border-b-0"
            >
                <div
                    class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                >
                    <div>
                        <h2 class="text-base font-semibold text-[#121212]">
                            <a
                                v-if="job.href"
                                :href="job.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="hover:text-black transition-colors inline-flex items-center gap-1 group"
                            >
                                <span>{{ job.company }}</span>
                                <span
                                    class="text-[#A1A1AA] group-hover:text-[#121212] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-xs"
                                    >&nearr;</span
                                >
                            </a>
                            <span v-else>{{ job.company }}</span>
                        </h2>
                        <div class="text-xs font-mono text-[#404040]">
                            {{ job.role }}
                        </div>
                    </div>

                    <div class="text-xs font-mono text-[#71717A] shrink-0">
                        <span>{{ job.period }}</span>
                        <span v-if="job.location" class="ml-1 text-[#A1A1AA]"
                            >({{ job.location }})</span
                        >
                    </div>
                </div>

                <p
                    v-if="job.description"
                    class="text-xs sm:text-sm text-[#404040] leading-relaxed"
                >
                    {{ job.description }}
                </p>

                <!-- Key Achievements -->
                <div
                    v-if="job.achievements && job.achievements.length"
                    class="space-y-2"
                >
                    <div
                        class="text-[11px] font-mono uppercase tracking-wider text-[#71717A]"
                    >
                        Key Accomplishments
                    </div>
                    <ul class="space-y-1.5">
                        <li
                            v-for="item in job.achievements"
                            :key="item"
                            class="flex items-start gap-2.5 text-xs text-[#404040] leading-relaxed"
                        >
                            <span
                                class="w-1.5 h-1.5 rounded-full bg-[#121212] mt-1.5 shrink-0"
                            ></span>
                            <span>{{ item }}</span>
                        </li>
                    </ul>
                </div>

                <!-- Tech Stack Tags -->
                <div
                    v-if="job.technologies && job.technologies.length"
                    class="flex flex-wrap gap-1.5 pt-1"
                >
                    <span
                        v-for="tech in job.technologies"
                        :key="tech"
                        class="px-2 py-0.5 rounded text-[10px] font-mono text-[#71717A] bg-[#F4F4F5] border border-[#E5E5E5]"
                    >
                        {{ tech }}
                    </span>
                </div>
            </article>
        </div>

        <!-- Return Link -->
        <div class="pt-4 border-t border-[#E5E5E5]">
            <RouterLink
                to="/"
                class="inline-flex items-center gap-1.5 text-xs font-mono text-[#71717A] hover:text-[#121212] transition-colors"
            >
                &larr; Back to Home
            </RouterLink>
        </div>
    </div>
</template>
