<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { projects } from "@/data/portfolio";
import AccordionGallery, {
    type AccordionGalleryItem,
} from "@/components/AccordionGallery.vue";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const project = computed(() => {
    return projects.find((p) => p.slug === slug.value);
});

const galleryItems = computed<AccordionGalleryItem[]>(() => {
    if (!project.value?.images || !project.value.images.length) return [];
    return project.value.images.map((img) => ({
        image: img.url,
        label: img.caption,
        alt: img.caption,
    }));
});
</script>

<template>
    <div v-if="project" class="animate-fade-in max-w-3xl mx-auto space-y-12">
        <!-- Breadcrumb & Back Navigation -->
        <div>
            <RouterLink
                to="/"
                class="inline-flex items-center gap-2 text-xs font-mono text-[#71717A] hover:text-[#121212] transition-colors group"
            >
                <span
                    class="transition-transform duration-150 group-hover:-translate-x-1"
                    >&larr;</span
                >
                <span>Back to all projects</span>
            </RouterLink>
        </div>

        <!-- Case Study Header -->
        <header class="space-y-4 pb-8 border-b border-[#E5E5E5]">
            <div
                class="flex flex-wrap items-center gap-3 text-xs font-mono text-[#71717A]"
            >
                <span
                    class="px-2 py-0.5 rounded bg-[#F4F4F5] border border-[#E5E5E5]"
                    >{{ project.category }}</span
                >
                <span>&middot;</span>
                <span>{{ project.year }}</span>
                <span>&middot;</span>
                <span>{{ project.role }}</span>
            </div>

            <div class="space-y-2">
                <h1
                    class="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121212]"
                >
                    {{ project.title }}
                </h1>
                <p
                    class="text-base sm:text-lg text-[#404040] leading-relaxed max-w-2xl"
                >
                    {{ project.tagline }}
                </p>
            </div>

            <!-- Action Buttons for Clients -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
                <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#121212] hover:bg-[#262626] text-[#FAFAFA] text-xs font-medium transition-all shadow-xs group"
                >
                    <span>Visit Live Product</span>
                    <span
                        class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        >&nearr;</span
                    >
                </a>

                <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E5E5E5] hover:border-[#D4D4D8] text-[#121212] text-xs font-medium transition-colors"
                >
                    <span>Source Code</span>
                    <span class="text-[#71717A]">&nearr;</span>
                </a>
            </div>
        </header>

        <!-- Overview & Contributor Ledger Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- Left Column: Story & Highlights -->
            <div class="lg:col-span-8 space-y-8">
                <section class="space-y-3">
                    <h2
                        class="text-xs font-mono uppercase tracking-wider text-[#71717A]"
                    >
                        Overview
                    </h2>
                    <p class="text-sm text-[#404040] leading-relaxed">
                        {{ project.description }}
                    </p>
                </section>

                <!-- Key Engineering Highlights -->
                <section class="space-y-4">
                    <h2
                        class="text-xs font-mono uppercase tracking-wider text-[#71717A]"
                    >
                        Key Engineering Highlights
                    </h2>
                    <ul class="space-y-2.5">
                        <li
                            v-for="highlight in project.highlights"
                            :key="highlight"
                            class="flex items-start gap-3 text-xs sm:text-sm text-[#404040] leading-relaxed"
                        >
                            <span
                                class="w-1.5 h-1.5 rounded-full bg-[#121212] mt-2 shrink-0"
                            />
                            <span>{{ highlight }}</span>
                        </li>
                    </ul>
                </section>
            </div>

            <!-- Right Column: Project Metadata & Contributors -->
            <div
                class="lg:col-span-4 space-y-8 lg:pl-6 lg:border-l lg:border-[#E5E5E5]"
            >
                <!-- Team & Contributors -->
                <section
                    v-if="project.team && project.team.length"
                    class="space-y-3"
                >
                    <h2
                        class="text-xs font-mono uppercase tracking-wider text-[#71717A]"
                    >
                        Team & Contributors
                    </h2>
                    <div class="space-y-2.5">
                        <div
                            v-for="member in project.team"
                            :key="member.name"
                            class="text-xs"
                        >
                            <div class="font-medium text-[#121212]">
                                {{ member.name }}
                            </div>
                            <div class="text-[11px] font-mono text-[#71717A]">
                                {{ member.role }}
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Tech Stack Tags -->
                <section class="space-y-3">
                    <h2
                        class="text-xs font-mono uppercase tracking-wider text-[#71717A]"
                    >
                        Technologies Used
                    </h2>
                    <div class="flex flex-wrap gap-1.5">
                        <span
                            v-for="tag in project.tags"
                            :key="tag"
                            class="px-2 py-0.5 rounded bg-[#F4F4F5] border border-[#E5E5E5] text-[11px] font-mono text-[#404040]"
                        >
                            {{ tag }}
                        </span>
                    </div>
                </section>
            </div>
        </div>

        <!-- Interface Showcase (Vue-Bits Accordion Gallery) -->
        <section
            v-if="galleryItems.length"
            class="space-y-4 pt-8 border-t border-[#E5E5E5]"
        >
            <div class="flex items-center justify-between">
                <h2
                    class="text-xs sm:text-[13px] font-mono uppercase tracking-wider text-[#121212] font-bold"
                >
                    Interface Showcase
                </h2>
                <span class="text-[11px] font-mono text-[#A1A1AA]">
                    Hover panel to expand
                </span>
            </div>

            <div
                class="w-full overflow-hidden rounded-2xl border border-[#E5E5E5] bg-[#0A0A0A] p-2 shadow-xs"
            >
                <AccordionGallery
                    :items="galleryItems"
                    :height="440"
                    :radius="14"
                    :gap="10"
                    :expandRatio="0.54"
                    trigger="hover"
                    :showLabels="true"
                    :grayscale="true"
                    accentColor="#FFFFFF"
                    textColor="#FFFFFF"
                    overlayColor="#000000"
                />
            </div>
        </section>

        <!-- Bottom Navigation Footer -->
        <div
            class="pt-8 border-t border-[#E5E5E5] flex items-center justify-between"
        >
            <RouterLink
                to="/"
                class="text-xs font-mono text-[#71717A] hover:text-[#121212] transition-colors"
            >
                &larr; Return to Home
            </RouterLink>

            <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-mono text-[#121212] hover:underline"
            >
                Launch {{ project.title }} &nearr;
            </a>
        </div>
    </div>

    <!-- 404 Fallback -->
    <div v-else class="text-center py-20 space-y-4 max-w-md mx-auto">
        <h1 class="text-xl font-semibold text-[#121212]">Project Not Found</h1>
        <p class="text-xs text-[#71717A]">
            The project you requested does not exist or has been archived.
        </p>
        <RouterLink
            to="/"
            class="inline-block text-xs font-mono text-[#121212] underline"
        >
            Return to Home
        </RouterLink>
    </div>
</template>
