<script setup lang="ts">
import { useRoute, RouterLink } from "vue-router";

interface NavItem {
    index: string;
    label: string;
    href: string;
}

const items: NavItem[] = [
    { index: "01", label: "Home", href: "/" },
    { index: "02", label: "About", href: "/about" },
    { index: "03", label: "Experience", href: "/experience" },
    { index: "04", label: "Education", href: "/education" },
    { index: "05", label: "Certifications", href: "/certifications" },
    { index: "06", label: "Contact", href: "/contact" },
];

const route = useRoute();
</script>

<template>
    <aside
        class="fixed left-6 xl:left-12 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-4"
        aria-label="Main Page Navigation"
    >
        <nav class="space-y-4 font-mono text-[13px]">
            <div v-for="item in items" :key="item.href" class="group">
                <RouterLink
                    :to="item.href"
                    class="flex items-center gap-3.5 py-1 transition-all duration-200"
                    :class="[
                        route.path === item.href
                            ? 'text-[#121212] font-bold'
                            : 'text-[#71717A] hover:text-[#121212] font-normal',
                    ]"
                >
                    <!-- Expanding Line Marker with Crisp Contrast -->
                    <span
                        class="h-[1.5px] rounded-full transition-all duration-300"
                        :class="[
                            route.path === item.href
                                ? 'w-10 bg-[#121212]'
                                : 'w-5 bg-[#A1A1AA] group-hover:w-8 group-hover:bg-[#121212]',
                        ]"
                    />

                    <!-- Zero-Padded Index -->
                    <span
                        class="text-[11px] tracking-tight transition-colors"
                        :class="[
                            route.path === item.href
                                ? 'text-[#121212] font-semibold'
                                : 'text-[#71717A] group-hover:text-[#121212]',
                        ]"
                    >
                        {{ item.index }}
                    </span>

                    <!-- Text Label -->
                    <span
                        class="font-sans text-[13px] tracking-tight"
                        :class="[
                            route.path === item.href
                                ? 'font-bold text-[#121212]'
                                : 'font-normal',
                        ]"
                    >
                        {{ item.label }}
                    </span>
                </RouterLink>
            </div>
        </nav>
    </aside>
</template>
