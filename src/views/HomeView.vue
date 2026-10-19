<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import { profile, projects, socials } from "@/data/portfolio";
import DecryptedText from "@/components/DecryptedText.vue";
import PulseHeart from "@/components/PulseHeart.vue";
import SpotlightCard from "@/components/SpotlightCard.vue";
import RefineFrame, {
    type RefineFrameStatus,
} from "@/components/RefineFrame.vue";
import LogoLoop from "@/components/LogoLoop.vue";
import CursorGrid from "@/components/CursorGrid.vue";

// RefineFrame avatar progression sequence: queued -> generating -> refining -> complete
const avatarStatus = ref<RefineFrameStatus>("queued");
let timer1: ReturnType<typeof setTimeout> | undefined;
let timer2: ReturnType<typeof setTimeout> | undefined;
let timer3: ReturnType<typeof setTimeout> | undefined;

const runRefineCycle = () => {
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);

    avatarStatus.value = "queued";

    // Stage 1: Queued -> Generating after 450ms
    timer1 = setTimeout(() => {
        avatarStatus.value = "generating";

        // Stage 2: Generating -> Refining after 650ms
        timer2 = setTimeout(() => {
            avatarStatus.value = "refining";

            // Stage 3: Refining -> Ready (Complete) after 800ms
            timer3 = setTimeout(() => {
                avatarStatus.value = "complete";
            }, 800);
        }, 650);
    }, 450);
};

onMounted(() => {
    runRefineCycle();
});

onUnmounted(() => {
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);
});

// Category filtering for Projects
const selectedCategory = ref("All");

const categories = computed(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
});

const filteredProjects = computed(() => {
    if (selectedCategory.value === "All") {
        return projects;
    }
    return projects.filter((p) => p.category === selectedCategory.value);
});
</script>

<template>
    <div class="relative animate-fade-in w-full overflow-hidden space-y-5">
        <!-- Interactive Background Cursor Grid -->
        <CursorGrid :cellSize="36" />

        <!-- Full-Width Spanning Cover Banner -->
        <div
            class="relative w-full h-36 sm:h-44 md:h-48 rounded-2xl border border-[#E5E5E5] bg-[#18181B] overflow-hidden shadow-2xs"
        >
            <img
                :src="profile.banner"
                alt="Dion Areglo profile cover banner"
                class="w-full h-full object-cover block"
                loading="eager"
            />
        </div>

        <!-- Main Two-Column Layout Grid with Overlapping Avatar -->
        <div
            class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full px-1 sm:px-2"
        >
            <!-- Left Column: Overlapping Circular Avatar + Identity + Bio + CV + Connect + Tech Stack Logo Loop -->
            <aside
                class="lg:col-span-5 lg:sticky lg:top-8 space-y-5 -mt-18 sm:-mt-22 lg:-mt-24"
            >
                <!-- Circular Avatar & Identity Lockup -->
                <div class="space-y-3.5">
                    <!-- Overlapping Circular Avatar mathematically centered inside the left column -->
                    <div class="w-full flex justify-center">
                        <div
                            @click="runRefineCycle"
                            class="inline-flex items-center justify-center p-1.5 rounded-full bg-white border border-[#E5E5E5] shadow-md cursor-pointer group hover:border-[#121212] transition-colors w-40 h-40 sm:w-48 sm:h-48 shrink-0 z-20"
                            title="Click to replay avatar refinement"
                        >
                            <RefineFrame
                                :status="avatarStatus"
                                aspectRatio="1 / 1"
                                width="100%"
                                :radius="9999"
                                :stageDuration="380"
                                sweep
                                showStatus
                                :hideAfter="1400"
                                retryLabel="Retry"
                                @retry="runRefineCycle"
                            >
                                <img
                                    :src="profile.avatar"
                                    :alt="profile.name"
                                    draggable="false"
                                    class="w-full h-full object-cover rounded-full"
                                    loading="eager"
                                />
                            </RefineFrame>
                        </div>
                    </div>

                    <!-- Name & Role Identity below the avatar in the clean white body area -->
                    <div class="space-y-1 pt-0.5 text-center">
                        <div class="flex items-center justify-center gap-2">
                            <h1
                                class="text-2xl sm:text-3xl font-semibold tracking-tight text-[#121212]"
                            >
                                <DecryptedText
                                    :text="profile.name"
                                    :speed="70"
                                    :maxIterations="16"
                                />
                            </h1>
                            <PulseHeart />
                        </div>
                        <p
                            class="text-xs sm:text-sm font-medium text-[#404040]"
                        >
                            {{ profile.role }}
                        </p>
                        <p class="text-xs font-mono text-[#71717A]">
                            {{ profile.location }}
                        </p>
                    </div>
                </div>

                <!-- Bio Paragraph -->
                <p
                    class="text-[15px] text-[#404040] leading-relaxed max-w-sm mx-auto"
                >
                    {{ profile.bio }}
                </p>

                <!-- Download CV Action -->
                <div class="pt-0.5 flex justify-center">
                    <a
                        href="/dion-areglo-cv.pdf"
                        download="Dion-Areglo-CV.pdf"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-[#121212] bg-[#F4F4F5] border border-[#E5E5E5] hover:border-[#121212] hover:bg-white transition-all shadow-2xs group cursor-pointer"
                        title="Download Dion Areglo's CV"
                    >
                        <span>Download CV</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#121212] transition-transform duration-150 group-hover:translate-y-0.5"
                        >
                            <path
                                d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z"
                            />
                            <path
                                d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"
                            />
                        </svg>
                    </a>
                </div>

                <!-- Social Connections -->
                <div class="pt-4 border-t border-[#E5E5E5] space-y-2.5">
                    <h3
                        class="text-xs font-mono uppercase tracking-wider text-[#121212] font-bold"
                    >
                        Connect with me
                    </h3>
                    <div class="flex flex-wrap gap-x-5 gap-y-2">
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
                            >
                                {{ social.label }}
                            </span>
                            <span
                                class="text-[#A1A1AA] group-hover:text-[#121212] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            >
                                &nearr;
                            </span>
                        </a>
                    </div>
                </div>

                <!-- Tech Stack & Tooling Continuous Logo Loop -->
                <div class="pt-4 border-t border-[#E5E5E5] space-y-2.5">
                    <h3
                        class="text-xs font-mono uppercase tracking-wider text-[#121212] font-bold"
                    >
                        Stack &amp; Tooling
                    </h3>

                    <div class="w-full overflow-hidden py-0.5">
                        <LogoLoop :speed="22" fadeOut />
                    </div>
                </div>
            </aside>

            <!-- Right Column: Projects with In-Place Category Filter -->
            <div class="lg:col-span-7 space-y-4 min-w-0 pt-2 sm:pt-3">
                <!-- Projects Section -->
                <section class="space-y-3.5">
                    <!-- Section Title (High Contrast & Bold) -->
                    <div
                        class="flex items-center justify-between pb-2.5 border-b border-[#E5E5E5]"
                    >
                        <h2
                            class="text-xs sm:text-[13px] font-mono uppercase tracking-wider text-[#121212] font-bold"
                        >
                            Projects
                        </h2>

                        <span
                            v-if="selectedCategory !== 'All'"
                            class="text-[11px] font-mono text-[#121212] font-medium underline underline-offset-4 cursor-pointer hover:opacity-70 transition-opacity"
                            @click="selectedCategory = 'All'"
                        >
                            Clear filter
                        </span>
                    </div>

                    <!-- In-Place Category Filter Pills (Counts Removed) -->
                    <div class="flex flex-wrap items-center gap-1.5">
                        <button
                            v-for="cat in categories"
                            :key="cat"
                            type="button"
                            @click="selectedCategory = cat"
                            class="px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer"
                            :class="[
                                selectedCategory === cat
                                    ? 'bg-[#121212] text-white shadow-2xs font-medium'
                                    : 'bg-[#F4F4F5] text-[#71717A] hover:bg-white hover:text-[#121212] border border-[#E5E5E5]',
                            ]"
                        >
                            {{ cat }}
                        </button>
                    </div>

                    <!-- Clean Scrollable Container with Reduced Height to prevent whole-page scrolling -->
                    <div
                        class="max-h-[340px] sm:max-h-[380px] lg:max-h-[400px] overflow-y-auto space-y-3 no-scrollbar pt-1 pr-0.5"
                    >
                        <SpotlightCard
                            v-for="project in filteredProjects"
                            :key="project.slug"
                            class="group hover:border-[#D4D4D8] hover:shadow-xs transition-all"
                        >
                            <RouterLink
                                :to="'/project/' + project.slug"
                                class="block p-4 sm:p-5"
                            >
                                <!-- Header Group: Title + Year on row 1, Category subtitle on row 2 -->
                                <div class="space-y-1 mb-2.5">
                                    <div
                                        class="flex items-baseline justify-between gap-4"
                                    >
                                        <h3
                                            class="text-lg sm:text-[19px] font-bold text-[#121212] group-hover:text-black tracking-tight truncate transition-colors"
                                        >
                                            {{ project.title }}
                                        </h3>
                                        <span
                                            class="text-xs font-mono text-[#A1A1AA] shrink-0"
                                        >
                                            {{ project.year }}
                                        </span>
                                    </div>
                                    <p
                                        class="text-[11px] font-mono uppercase tracking-wider text-[#71717A] font-medium"
                                    >
                                        {{ project.category }}
                                    </p>
                                </div>

                                <!-- Body: Description / Tagline -->
                                <p
                                    class="text-xs sm:text-[13px] text-[#404040] leading-relaxed mb-3.5"
                                >
                                    {{ project.tagline }}
                                </p>

                                <!-- Footer Group: Tech Stack with pipe divider | and CTA Link -->
                                <div
                                    class="flex items-center justify-between gap-4 pt-2.5 border-t border-[#F4F4F5]"
                                >
                                    <!-- Tech Stack separated by | -->
                                    <div
                                        class="flex flex-wrap items-center gap-x-2 text-[11px] font-mono text-[#71717A] min-w-0"
                                    >
                                        <template
                                            v-for="(tag, idx) in project.tags"
                                            :key="tag"
                                        >
                                            <span
                                                class="hover:text-[#121212] transition-colors"
                                            >
                                                {{ tag }}
                                            </span>
                                            <span
                                                v-if="
                                                    idx <
                                                    project.tags.length - 1
                                                "
                                                class="text-[#D4D4D8] select-none"
                                                aria-hidden="true"
                                                >|</span
                                            >
                                        </template>
                                    </div>

                                    <span
                                        class="text-xs font-mono text-[#121212] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 font-semibold shrink-0"
                                    >
                                        Learn more &rarr;
                                    </span>
                                </div>
                            </RouterLink>
                        </SpotlightCard>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
