<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { certifications, type CertificationItem } from "@/data/portfolio";
import { RouterLink } from "vue-router";
import { Eye, ExternalLink, X, ShieldCheck } from "@lucide/vue";
import { useStaggerEntrance } from "@/composables/useStaggerEntrance";
import tesdaLogo from "@/assets/certifications/tesda-logo.png";

const activeCert = ref<CertificationItem | null>(null);
const container = ref<HTMLElement | null>(null);
useStaggerEntrance(container);

const openCertModal = (cert: CertificationItem) => {
    activeCert.value = cert;
};

const closeCertModal = () => {
    activeCert.value = null;
};

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && activeCert.value) {
        closeCertModal();
    }
};

onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
});

// Helper for Issuer Brand Logo SVGs
const getIssuerLogo = (issuer: string) => {
    const norm = issuer.toLowerCase();
    if (norm.includes("meta")) return "meta";
    if (norm.includes("typescript")) return "typescript";
    if (norm.includes("amazon") || norm.includes("aws")) return "aws";
    return "default";
};
</script>

<template>
    <div ref="container" class="max-w-2xl mx-auto space-y-10">
        <!-- Header -->
        <header data-animate class="space-y-2">
            <h1
                class="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]"
            >
                Certifications
            </h1>
            <p class="text-xs font-mono text-[#71717A]">
                Verified credentials, professional licenses &amp; technical
                accreditations
            </p>
        </header>

        <!-- Certifications List with Issuer Badges -->
        <div class="space-y-6">
            <article
                v-for="cert in certifications"
                :key="cert.credentialId || cert.title"
                data-animate
                class="p-5 sm:p-6 rounded-2xl border border-[#E5E5E5] bg-white space-y-4 hover:border-[#121212] transition-all shadow-2xs group"
            >
                <!-- Header with Issuer Badge & Title -->
                <div class="flex items-start justify-between gap-4">
                    <div class="flex items-start gap-3.5 min-w-0">
                        <!-- Issuer Official Icon Badge -->
                        <div
                            class="w-12 h-12 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] flex items-center justify-center shrink-0 p-1.5 group-hover:border-[#121212] transition-colors"
                        >
                            <img
                                v-if="cert.issuer.includes('TESDA')"
                                :src="tesdaLogo"
                                alt="TESDA"
                                class="w-full h-full object-contain scale-125"
                            />

                            <!-- Meta Logo -->
                            <svg
                                v-else-if="getIssuerLogo(cert.issuer) === 'meta'"
                                viewBox="0 0 24 24"
                                class="w-6 h-6"
                                fill="#0064E0"
                                aria-label="Meta"
                            >
                                <path
                                    d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                                />
                            </svg>

                            <!-- TypeScript Logo -->
                            <svg
                                v-else-if="
                                    getIssuerLogo(cert.issuer) === 'typescript'
                                "
                                viewBox="0 0 24 24"
                                class="w-6 h-6"
                                aria-label="TypeScript"
                            >
                                <rect
                                    width="24"
                                    height="24"
                                    rx="4"
                                    fill="#3178C6"
                                />
                                <path
                                    d="M11.75 14.5h-1.5V9H7V7.5h8V9h-3.25v5.5zm4 0h1.7c.9 0 1.6-.2 2.1-.6.5-.4.8-1 .8-1.7 0-.5-.1-.9-.4-1.3-.3-.3-.7-.6-1.3-.7l-.9-.2c-.5-.1-.8-.2-1-.4-.2-.1-.3-.3-.3-.6 0-.3.1-.5.3-.7.2-.2.5-.3 1-.3.4 0 .7.1.9.3.2.2.3.5.3.8h1.6c0-.6-.3-1.2-.7-1.6-.5-.4-1.1-.6-1.9-.6-.8 0-1.4.2-1.9.6-.5.4-.7.9-.7 1.6 0 .5.1.9.4 1.2.3.3.7.5 1.3.7l1 .2c.5.1.8.2 1 .4.2.2.3.4.3.7 0 .3-.1.5-.4.7-.3.2-.6.3-1.1.3-.5 0-.9-.1-1.2-.4-.3-.3-.5-.7-.5-1.2h-1.7c0 .8.3 1.4.8 1.9.5.5 1.2.7 2.1.7z"
                                    fill="#FFFFFF"
                                />
                            </svg>

                            <!-- AWS Logo -->
                            <svg
                                v-else-if="getIssuerLogo(cert.issuer) === 'aws'"
                                viewBox="0 0 128 128"
                                class="w-7 h-7"
                                aria-label="Amazon Web Services"
                            >
                                <path
                                    fill="#f90"
                                    d="M108.59 26.148c-1.852 0-3.622.211-5.305.715-1.684.504-3.117 1.223-4.379 2.188a10.829 10.829 0 0 0-3.031 3.453c-.757 1.348-1.137 2.906-1.137 4.676 0 2.187.716 4.25 2.106 6.105 1.386 1.895 3.66 3.324 6.734 4.293l6.106 1.895c2.062.675 3.496 1.391 4.254 2.191.757.801 1.136 1.765 1.136 2.945 0 1.726-.758 3.074-2.191 4.086-1.433 1-3.66 1.516-6.687 1.516-2.527 0-4.97-.461-7.324-1.429a24.237 24.237 0 0 1-6.44-3.957l-4.125 5.515c2.316 2.02 4.968 3.535 7.957 4.547 2.988 1 5.976 1.516 8.964 1.516 4.547 0 8.043-.926 10.485-2.777 2.441-1.852 3.66-4.422 3.66-7.703 0-2.316-.715-4.336-2.148-6.063-1.434-1.726-3.746-3.156-6.945-4.293l-6.106-2.188c-1.726-.633-2.906-1.305-3.535-2.02-.633-.715-.949-1.558-.949-2.527 0-1.262.589-2.316 1.769-3.156 1.176-.844 2.777-1.266 4.8-1.266 2.02 0 4.04.422 6.063 1.266a18.35 18.35 0 0 1 5.22 3.453l4.207-5.011c-2.062-1.852-4.422-3.282-7.07-4.293-2.653-1.012-5.387-1.516-8.211-1.516zM61.94 28.082L47.043 83.25h8.922l4.293-17.172h17.929l4.293 17.172h9.176L76.758 28.082H61.94zm7.406 13.972l6.567 26.68h-13.133l6.566-26.68zm-45.54 0L12.59 83.25h8.836l3.789-16.16h17.93l3.789 16.16h8.836L44.55 42.054H23.805zm6.567 11.278l6.398 27.27H23.973l6.399-27.27zm64.445 44.82c-15.067 11.11-36.96 17.004-55.8 17.004-26.434 0-50.219-9.851-68.219-26.398-.55-.5-1.3-.352-1.7.25-.4.598-.2 1.45.352 1.95 18.7 17.1 43.4 27.3 70.8 27.3 19.5 0 42.4-6.3 58.1-18.1.75-.55.85-1.5.25-2.2-.6-.7-1.45-.75-2.2-.25l-2.583 2.044zM116.5 98.6c-2.3-2.95-15.1-1.4-20.9-.7-1.05.15-1.2 1.05-.25 1.7 6.15 4.2 13.05 4.5 18.75 3.3.65-.15.95-.75.75-1.3-.2-.55-.85-1.7-1.35-3l3 0z"
                                />
                            </svg>

                            <!-- Fallback Generic Shield -->
                            <ShieldCheck
                                v-else
                                class="w-5 h-5 text-[#121212]"
                            />
                        </div>

                        <!-- Title & Subtitle -->
                        <div class="space-y-0.5 min-w-0">
                            <h2
                                class="text-base sm:text-lg font-bold text-[#121212] tracking-tight group-hover:text-black"
                            >
                                {{ cert.title }}
                            </h2>
                            <div class="text-xs font-mono text-[#52525B]">
                                Issued by
                                <span class="font-semibold text-[#121212]">
                                    {{ cert.issuer }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Year -->
                    <div class="text-xs font-mono text-[#A1A1AA] shrink-0 pt-1">
                        {{ cert.issueDate }}
                    </div>
                </div>

                <!-- Description -->
                <p
                    v-if="cert.description"
                    class="text-xs sm:text-[13px] text-[#404040] leading-relaxed"
                >
                    {{ cert.description }}
                </p>

                <!-- Skill Tags separated by | (Consistent with Project Cards) -->
                <div
                    v-if="cert.skills && cert.skills.length"
                    class="flex flex-wrap items-center gap-x-2 text-[11px] font-mono text-[#71717A] pt-1"
                >
                    <template v-for="(skill, idx) in cert.skills" :key="skill">
                        <span class="hover:text-[#121212] transition-colors">
                            {{ skill }}
                        </span>
                        <span
                            v-if="idx < cert.skills.length - 1"
                            class="text-[#D4D4D8] select-none"
                            aria-hidden="true"
                            >|</span
                        >
                    </template>
                </div>

                <!-- Credential ID, Verification Status & Actions -->
                <div
                    class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F4F4F5] text-xs font-mono"
                >
                    <div class="flex items-center gap-3">
                        <div
                            v-if="cert.credentialId"
                            class="text-[11px] text-[#71717A]"
                        >
                            ID:
                            <span class="text-[#121212] font-semibold">
                                {{ cert.credentialId }}
                            </span>
                        </div>

                        <!-- Verified Status Badge -->
                        <div
                            class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-200/60"
                        >
                            <span
                                class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                            />
                            <span>Verified</span>
                        </div>
                    </div>

                    <!-- Actions: Lightbox Modal Trigger & Verification Link -->
                    <div class="flex items-center gap-2">
                        <button
                            v-if="cert.image"
                            type="button"
                            @click="openCertModal(cert)"
                            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-[#121212] bg-[#F4F4F5] border border-[#E5E5E5] hover:bg-white hover:border-[#121212] transition-all cursor-pointer shadow-2xs"
                        >
                            <Eye class="w-3.5 h-3.5 text-[#71717A]" />
                            <span>View Certificate</span>
                        </button>

                        <a
                            v-if="cert.credentialUrl"
                            :href="cert.credentialUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-[#404040] hover:text-[#121212] transition-colors underline underline-offset-4 decoration-[#E5E5E5] hover:decoration-[#121212]"
                        >
                            <span>Verify</span>
                            <ExternalLink class="w-3 h-3 text-[#A1A1AA]" />
                        </a>
                    </div>
                </div>
            </article>
        </div>

        <!-- Return Link -->
        <div data-animate class="pt-4 border-t border-[#E5E5E5]">
            <RouterLink
                to="/"
                class="inline-flex items-center gap-1.5 text-xs font-mono text-[#71717A] hover:text-[#121212] transition-colors"
            >
                &larr; Back to Home
            </RouterLink>
        </div>

        <!-- Interactive Lightbox Modal (Full Certificate Preview) -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="activeCert"
                    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm select-none"
                    @click.self="closeCertModal"
                >
                    <div
                        class="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#E5E5E5] flex flex-col max-h-[90vh] animate-scale-in"
                    >
                        <!-- Modal Header -->
                        <div
                            class="flex items-center justify-between px-5 py-3.5 border-b border-[#E5E5E5] bg-[#FAFAFA]"
                        >
                            <div>
                                <h3
                                    class="text-sm font-semibold text-[#121212] tracking-tight"
                                >
                                    {{ activeCert.title }}
                                </h3>
                                <p class="text-[11px] font-mono text-[#71717A]">
                                    Issued by {{ activeCert.issuer }} &middot;
                                    {{ activeCert.issueDate }}
                                </p>
                            </div>

                            <button
                                type="button"
                                @click="closeCertModal"
                                class="p-1 rounded-lg text-[#71717A] hover:text-[#121212] hover:bg-[#F4F4F5] transition-colors cursor-pointer"
                                aria-label="Close certificate preview"
                            >
                                <X class="w-5 h-5" />
                            </button>
                        </div>

                        <!-- Modal Certificate Document View -->
                        <div
                            class="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-[#F4F4F5]/60"
                        >
                            <div
                                class="relative rounded-xl overflow-hidden shadow-md border border-[#E5E5E5] bg-white w-full max-h-[60vh] flex items-center justify-center"
                            >
                                <img
                                    v-if="activeCert.image"
                                    :src="activeCert.image"
                                    :alt="activeCert.title"
                                    class="w-full h-auto object-contain max-h-[55vh]"
                                    loading="eager"
                                />
                            </div>
                        </div>

                        <!-- Modal Footer -->
                        <div
                            class="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-[#E5E5E5] bg-white text-xs font-mono"
                        >
                            <span
                                v-if="activeCert.credentialId"
                                class="text-[11px] text-[#71717A]"
                            >
                                ID:
                                <span class="text-[#121212] font-medium">{{
                                    activeCert.credentialId
                                }}</span>
                            </span>

                            <div class="flex items-center gap-3">
                                <a
                                    v-if="activeCert.credentialUrl"
                                    :href="activeCert.credentialUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121212] text-white hover:bg-[#262626] transition-all text-xs font-medium shadow-xs"
                                >
                                    <span
                                        >Verify on {{ activeCert.issuer }}</span
                                    >
                                    <ExternalLink class="w-3.5 h-3.5" />
                                </a>

                                <button
                                    type="button"
                                    @click="closeCertModal"
                                    class="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-[#121212] hover:bg-[#F4F4F5] transition-colors text-xs font-medium cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
