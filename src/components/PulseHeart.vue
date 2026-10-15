<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import confetti from "canvas-confetti";

const likes = ref(0);
const hasLiked = ref(false);
const isAnimating = ref(false);

const STORAGE_KEY_LIKES = "dion_portfolio_likes_v3";
const STORAGE_KEY_USER_LIKED = "dion_portfolio_user_liked_v3";

const heartTitle = computed(() =>
    hasLiked.value ? "Unlike" : "Heart Dion's portfolio",
);

// Optional custom counter endpoint (e.g. self-hosted worker or backend)
// Set VITE_COUNTER_API_URL in .env if an adblocker-safe backend endpoint is available
const REMOTE_ENDPOINT = import.meta.env.VITE_COUNTER_API_URL || "";

const syncRemoteLikes = async (action: "get" | "up") => {
    if (!REMOTE_ENDPOINT) return;
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const url = action === "up" ? `${REMOTE_ENDPOINT}/up` : REMOTE_ENDPOINT;
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
            const data = await res.json();
            const remoteCount = data.count ?? data.value;
            if (typeof remoteCount === "number") {
                likes.value = Math.max(likes.value, remoteCount);
                localStorage.setItem(STORAGE_KEY_LIKES, likes.value.toString());
            }
        }
    } catch {
        // Silently fall back to local persistence on network block, offline, or CORS
    }
};

onMounted(() => {
    // Purge any legacy placeholder keys
    localStorage.removeItem("portfolio_heart_likes");
    localStorage.removeItem("portfolio_user_liked");
    localStorage.removeItem("dion_heart_likes");
    localStorage.removeItem("dion_v1_likes");
    localStorage.removeItem("dion_v1_user_liked");
    localStorage.removeItem("dion_portfolio_likes_v2");
    localStorage.removeItem("dion_portfolio_user_liked_v2");

    const savedLiked = localStorage.getItem(STORAGE_KEY_USER_LIKED);
    const savedLikes = localStorage.getItem(STORAGE_KEY_LIKES);

    if (savedLiked === "true") {
        hasLiked.value = true;
    }

    if (savedLikes) {
        const parsed = parseInt(savedLikes, 10);
        if (!isNaN(parsed) && parsed >= 0) {
            likes.value = parsed;
        }
    } else {
        likes.value = hasLiked.value ? 1 : 0;
        localStorage.setItem(STORAGE_KEY_LIKES, likes.value.toString());
    }

    // Attempt remote sync only if an explicit endpoint is provided
    syncRemoteLikes("get");
});

const handleHeartClick = (event: MouseEvent) => {
    if (isAnimating.value) return;

    isAnimating.value = true;
    if (!hasLiked.value) {
        hasLiked.value = true;
        likes.value += 1;
        localStorage.setItem(STORAGE_KEY_USER_LIKED, "true");
        localStorage.setItem(STORAGE_KEY_LIKES, likes.value.toString());
        syncRemoteLikes("up");

        // Tactile micro confetti celebration
        const rect = (
            event.currentTarget as HTMLElement
        ).getBoundingClientRect();
        confetti({
            particleCount: 16,
            spread: 45,
            origin: {
                x: (rect.left + rect.width / 2) / window.innerWidth,
                y: (rect.top + rect.height / 2) / window.innerHeight,
            },
            colors: ["#E11D48", "#FB7185", "#E5E5E5"],
            ticks: 50,
            gravity: 1.2,
            scalar: 0.6,
        });
    } else {
        likes.value = Math.max(0, likes.value - 1);
        hasLiked.value = false;
        localStorage.removeItem(STORAGE_KEY_USER_LIKED);
        localStorage.setItem(STORAGE_KEY_LIKES, likes.value.toString());
    }

    setTimeout(() => {
        isAnimating.value = false;
    }, 400);
};
</script>

<template>
    <button
        @click="handleHeartClick"
        type="button"
        :title="heartTitle"
        class="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer select-none text-xs font-mono border border-transparent hover:border-[#E5E5E5] hover:bg-white"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            :class="[
                'w-4 h-4 transition-all duration-300',
                hasLiked
                    ? 'fill-[#E11D48] text-[#E11D48] scale-110'
                    : 'fill-transparent text-[#A1A1AA] group-hover:text-[#E11D48]',
                isAnimating ? 'scale-125' : '',
            ]"
            stroke="currentColor"
            stroke-width="1.8"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
        </svg>
        <span
            :class="[
                'text-[11px] transition-colors',
                hasLiked
                    ? 'text-[#E11D48] font-medium'
                    : 'text-[#71717A] group-hover:text-[#121212]',
            ]"
        >
            {{ likes }}
        </span>
    </button>
</template>
