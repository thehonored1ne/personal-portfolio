<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from "vue";
import { RouterLink } from "vue-router";
import confetti from "canvas-confetti";

type Step = "name" | "email" | "message" | "sending" | "sent";
type Mode = "cli" | "classic";

const currentMode = ref<Mode>("cli");
const currentStep = ref<Step>("name");
const terminalInput = ref("");
const terminalInputRef = ref<HTMLInputElement | null>(null);
const terminalBodyRef = ref<HTMLElement | null>(null);

interface TerminalLog {
    type: "cmd" | "info" | "success" | "warn" | "dim";
    text: string;
    sub?: string;
}

const form = ref({
    name: "",
    email: "",
    message: "",
    _gotcha: "", // Honeypot bot trap field
});

const isClassicSubmitted = ref(false);
const isClassicSending = ref(false);
const lastSubmissionTime = ref<number>(0);
const pageLoadTime = ref<number>(Date.now());

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

const sendToGoogleSheet = async (data: {
    name: string;
    email: string;
    message: string;
    _gotcha?: string;
}) => {
    // 1. Honeypot check: If bot filled the hidden input, pretend success and drop request
    if (data._gotcha && data._gotcha.trim() !== "") {
        console.warn("Honeypot triggered. Dropping automated submission.");
        return true;
    }

    // 2. Client-side speed trap: Humans take at least 1.5s to type and submit
    const elapsed = Date.now() - pageLoadTime.value;
    if (elapsed < 1200) {
        console.warn("Subhuman speed detected. Dropping submission.");
        return true;
    }

    // 3. Client cooldown: Prevent double submits within 15 seconds
    const now = Date.now();
    if (now - lastSubmissionTime.value < 15000) {
        console.warn("Rapid repeated submission throttled.");
        return true;
    }
    lastSubmissionTime.value = now;

    if (!GOOGLE_SCRIPT_URL) {
        console.warn(
            "VITE_GOOGLE_SCRIPT_URL is not set in .env. Simulating submission.",
        );
        return true;
    }

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(data),
        });
        return true;
    } catch (err) {
        console.error("Failed to send message to Google Sheets:", err);
        return false;
    }
};

const terminalLogs = ref<TerminalLog[]>([
    { type: "cmd", text: "$ contact-dion --start" },
    {
        type: "info",
        text: "Hello! Let's get in touch. Follow the 3 quick steps below:",
    },
]);

const focusTerminalInput = () => {
    nextTick(() => {
        terminalInputRef.value?.focus();
    });
};

const scrollToBottom = () => {
    nextTick(() => {
        if (terminalBodyRef.value) {
            terminalBodyRef.value.scrollTop =
                terminalBodyRef.value.scrollHeight;
        }
    });
};

const currentStepPrompt = computed(() => {
    switch (currentStep.value) {
        case "name":
            return {
                stepNumber: "Step 1 of 3",
                question: "What's your name?",
                prefix: "Name",
                placeholder: "e.g. Alex Mercer",
            };
        case "email":
            return {
                stepNumber: "Step 2 of 3",
                question: "What is your email address?",
                prefix: "Email",
                placeholder: "e.g. alex@company.com",
            };
        case "message":
            return {
                stepNumber: "Step 3 of 3",
                question: "What would you like to discuss or collaborate on?",
                prefix: "Message",
                placeholder: "Type your message or project inquiry...",
            };
        default:
            return null;
    }
});

const statusText = computed(() => {
    if (currentStep.value === "sent") return "Message sent";
    return currentStepPrompt.value?.stepNumber || "Ready";
});

const getLogClass = (type: TerminalLog["type"]): string => {
    switch (type) {
        case "cmd":
            return "text-[#38BDF8] font-bold";
        case "info":
            return "text-[#D4D4D8]";
        case "dim":
            return "text-[#71717A]";
        case "success":
            return "text-[#22C55E] font-medium";
        case "warn":
            return "text-[#FBBF24] font-medium";
        default:
            return "";
    }
};

const setCliMode = () => {
    currentMode.value = "cli";
    focusTerminalInput();
};

const setClassicMode = () => {
    currentMode.value = "classic";
};

const handleTerminalSubmit = async () => {
    const value = terminalInput.value.trim();

    if (currentStep.value === "name") {
        if (!value) {
            terminalLogs.value.push({
                type: "warn",
                text: "[!] Please enter your name so I know who I am speaking with.",
            });
            scrollToBottom();
            return;
        }
        form.value.name = value;
        terminalLogs.value.push({
            type: "success",
            text: `Name confirmed: ${value}`,
        });
        currentStep.value = "email";
        terminalInput.value = "";
        scrollToBottom();
        focusTerminalInput();
        return;
    }

    if (currentStep.value === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
            terminalLogs.value.push({
                type: "warn",
                text: "[!] Please enter a valid email address so I can reply back to you.",
            });
            scrollToBottom();
            return;
        }
        form.value.email = value;
        terminalLogs.value.push({
            type: "success",
            text: `Email confirmed: ${value}`,
        });
        currentStep.value = "message";
        terminalInput.value = "";
        scrollToBottom();
        focusTerminalInput();
        return;
    }

    if (currentStep.value === "message") {
        if (!value || value.length < 5) {
            terminalLogs.value.push({
                type: "warn",
                text: "[!] Please write a brief message (at least 5 characters) before sending.",
            });
            scrollToBottom();
            return;
        }
        form.value.message = value;
        terminalLogs.value.push({
            type: "success",
            text: "Message captured",
        });
        terminalInput.value = "";
        currentStep.value = "sending";
        scrollToBottom();

        terminalLogs.value.push({
            type: "info",
            text: "Delivering message to Dion...",
        });
        scrollToBottom();

        await sendToGoogleSheet({
            name: form.value.name,
            email: form.value.email,
            message: form.value.message,
            _gotcha: form.value._gotcha,
        });

        currentStep.value = "sent";
        scrollToBottom();

        // Celebration confetti
        confetti({
            particleCount: 28,
            spread: 55,
            origin: { y: 0.6 },
            colors: ["#22C55E", "#10B981", "#F59E0B", "#E5E5E5"],
        });
    }
};

const handleRestartRunner = () => {
    form.value = { name: "", email: "", message: "", _gotcha: "" };
    terminalLogs.value = [
        { type: "cmd", text: "$ contact-dion --start" },
        {
            type: "info",
            text: "Hello! Let's get in touch. Follow the 3 quick steps below:",
        },
    ];
    currentStep.value = "name";
    terminalInput.value = "";
    focusTerminalInput();
};

const handleClassicSubmit = async () => {
    if (!form.value.name || !form.value.email || !form.value.message) return;
    isClassicSending.value = true;

    await sendToGoogleSheet({
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        _gotcha: form.value._gotcha,
    });

    isClassicSending.value = false;
    isClassicSubmitted.value = true;

    confetti({
        particleCount: 28,
        spread: 55,
        origin: { y: 0.6 },
        colors: ["#22C55E", "#10B981", "#F59E0B", "#E5E5E5"],
    });
};

onMounted(() => {
    pageLoadTime.value = Date.now();
    focusTerminalInput();
});
</script>

<template>
    <div class="animate-fade-in max-w-2xl mx-auto space-y-10">
        <!-- Header -->
        <header class="space-y-2">
            <div class="flex items-center justify-between">
                <h1
                    class="text-2xl sm:text-3xl font-semibold tracking-tight text-[#121212]"
                >
                    Contact
                </h1>

                <!-- Mode Toggle (Interactive Terminal vs Standard Form) -->
                <div
                    class="flex items-center p-0.5 rounded-lg bg-[#F4F4F5] border border-[#E5E5E5] text-[11px] font-mono"
                >
                    <button
                        type="button"
                        @click="setCliMode"
                        class="px-2.5 py-1 rounded-md transition-all cursor-pointer"
                        :class="
                            currentMode === 'cli'
                                ? 'bg-white text-[#121212] font-semibold shadow-2xs'
                                : 'text-[#71717A] hover:text-[#121212]'
                        "
                    >
                        Terminal
                    </button>
                    <button
                        type="button"
                        @click="setClassicMode"
                        class="px-2.5 py-1 rounded-md transition-all cursor-pointer"
                        :class="
                            currentMode === 'classic'
                                ? 'bg-white text-[#121212] font-semibold shadow-2xs'
                                : 'text-[#71717A] hover:text-[#121212]'
                        "
                    >
                        Classic Form
                    </button>
                </div>
            </div>

            <p class="text-xs font-mono text-[#71717A]">
                Available for engineering roles, technical advisory &amp;
                bespoke projects.
            </p>
        </header>

        <!-- Mode 1: Interactive Terminal Runner (Default) -->
        <section v-if="currentMode === 'cli'" class="space-y-4">
            <div
                class="rounded-xl border border-[#27272A] bg-[#09090B] overflow-hidden shadow-md font-mono text-xs"
            >
                <!-- Terminal Top Bar -->
                <div
                    class="px-4 py-3 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between select-none"
                >
                    <div class="flex items-center gap-2">
                        <span
                            class="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block"
                        ></span>
                        <span
                            class="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block"
                        ></span>
                        <span
                            class="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block"
                        ></span>
                        <span class="ml-2 text-[11px] text-[#A1A1AA]"
                            >contact-runner.sh</span
                        >
                    </div>

                    <button
                        type="button"
                        @click="handleRestartRunner"
                        class="text-[11px] text-[#71717A] hover:text-[#F4F4F5] transition-colors cursor-pointer"
                        title="Reset session"
                    >
                        Reset
                    </button>
                </div>

                <!-- Terminal Body Stream -->
                <div
                    ref="terminalBodyRef"
                    class="p-4 sm:p-5 max-h-96 overflow-y-auto space-y-3 font-mono leading-relaxed select-text"
                >
                    <div
                        v-for="(log, idx) in terminalLogs"
                        :key="idx"
                        class="space-y-0.5"
                    >
                        <div :class="getLogClass(log.type)">
                            {{ log.text }}
                        </div>
                        <div
                            v-if="log.sub"
                            class="text-[11px] text-[#71717A] pl-2"
                        >
                            {{ log.sub }}
                        </div>
                    </div>

                    <!-- Interactive Step Prompt -->
                    <div
                        v-if="
                            currentStepPrompt &&
                            currentStep !== 'sending' &&
                            currentStep !== 'sent'
                        "
                        class="pt-3 border-t border-[#27272A] space-y-2"
                    >
                        <div class="text-[#A1A1AA] flex items-center gap-2">
                            <span class="text-[#38BDF8]">&gt;</span>
                            <span>{{ currentStepPrompt.question }}</span>
                        </div>

                        <form
                            @submit.prevent="handleTerminalSubmit"
                            class="flex items-center gap-2 pt-1"
                        >
                            <span
                                class="text-[#22C55E] font-semibold text-xs sm:text-sm"
                            >
                                {{ currentStepPrompt.prefix }} &gt;
                            </span>
                            <input
                                ref="terminalInputRef"
                                v-model="terminalInput"
                                type="text"
                                :placeholder="currentStepPrompt.placeholder"
                                class="flex-1 bg-transparent text-[#F4F4F5] placeholder-[#52525B] focus:outline-hidden text-xs sm:text-[13px] font-mono caret-[#22C55E]"
                                autofocus
                            />
                            <button
                                type="submit"
                                class="px-2.5 py-1 rounded bg-[#27272A] hover:bg-[#3F3F46] text-[#E4E4E7] text-[11px] font-mono transition-colors cursor-pointer shrink-0"
                            >
                                Next &rarr;
                            </button>
                        </form>
                    </div>

                    <!-- Sending State -->
                    <div
                        v-if="currentStep === 'sending'"
                        class="py-2 text-[#FBBF24] flex items-center gap-2"
                    >
                        <span class="inline-block animate-pulse">&gt;</span>
                        <span>Sending your message to Dion...</span>
                    </div>

                    <!-- Sent Summary & Confirmation Card -->
                    <div
                        v-if="currentStep === 'sent'"
                        class="pt-3 border-t border-[#27272A] space-y-3 text-xs"
                    >
                        <div
                            class="text-[#22C55E] font-semibold text-sm flex items-center gap-1.5"
                        >
                            <span>[OK]</span>
                            <span>Message Delivered Successfully</span>
                        </div>

                        <div
                            class="p-3 rounded-lg bg-[#18181B] border border-[#27272A] space-y-1 text-[#A1A1AA] text-xs"
                        >
                            <div>
                                <span class="text-[#71717A]">From:</span>
                                <span class="text-[#F4F4F5] ml-1.5">{{
                                    form.name
                                }}</span>
                            </div>
                            <div>
                                <span class="text-[#71717A]">Email:</span>
                                <span class="text-[#F4F4F5] ml-1.5">{{
                                    form.email
                                }}</span>
                            </div>
                            <div class="pt-1">
                                <span class="text-[#71717A]">Message:</span>
                                <span class="text-[#E4E4E7] ml-1.5"
                                    >&ldquo;{{ form.message }}&rdquo;</span
                                >
                            </div>
                        </div>

                        <div class="text-[#10B981]">
                            Thanks for reaching out! I have received your
                            message and will reply to {{ form.email }} shortly.
                        </div>

                        <div class="pt-2 flex items-center gap-3">
                            <button
                                type="button"
                                @click="handleRestartRunner"
                                class="px-3 py-1.5 rounded bg-[#27272A] hover:bg-[#3F3F46] text-[#E4E4E7] text-xs font-mono transition-all cursor-pointer inline-flex items-center gap-1.5"
                            >
                                <span>&larr;</span>
                                <span>Send another message</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Terminal Status Bar -->
                <div
                    class="px-4 py-1.5 bg-[#18181B] border-t border-[#27272A] flex items-center justify-between text-[11px] text-[#71717A]"
                >
                    <div class="flex items-center gap-2">
                        <span
                            class="w-2 h-2 rounded-full bg-[#22C55E] inline-block"
                        ></span>
                        <span class="text-[#A1A1AA]">online</span>
                    </div>
                    <div>
                        {{ statusText }}
                    </div>
                </div>
            </div>
        </section>

        <!-- Mode 2: Standard Form (Fallback) -->
        <section v-else class="space-y-6">
            <div class="pb-2 border-b border-[#E5E5E5]">
                <h2
                    class="text-xs font-mono uppercase tracking-wider text-[#71717A]"
                >
                    Send an Inquiry
                </h2>
            </div>

            <div
                v-if="isClassicSubmitted"
                class="p-6 rounded-xl border border-[#E5E5E5] bg-white text-center space-y-2"
            >
                <div class="text-sm font-semibold text-[#121212]">
                    Message Received
                </div>
                <p class="text-xs text-[#404040]">
                    Thank you for reaching out, {{ form.name }}. I will review
                    your message and reply via {{ form.email }} shortly.
                </p>
                <div class="pt-2">
                    <button
                        type="button"
                        @click="
                            () => {
                                isClassicSubmitted = false;
                                form = {
                                    name: '',
                                    email: '',
                                    message: '',
                                    _gotcha: '',
                                };
                            }
                        "
                        class="text-xs font-mono text-[#121212] underline cursor-pointer"
                    >
                        Send another message
                    </button>
                </div>
            </div>

            <form
                v-else
                @submit.prevent="handleClassicSubmit"
                class="space-y-5"
            >
                <!-- Hidden Honeypot Input (Invisible to humans, irresistible to spam bots) -->
                <div
                    class="opacity-0 absolute -left-[9999px] top-0 -z-10 pointer-events-none select-none h-0 w-0 overflow-hidden"
                    aria-hidden="true"
                >
                    <label for="_gotcha_hp">Leave this field blank</label>
                    <input
                        id="_gotcha_hp"
                        v-model="form._gotcha"
                        type="text"
                        name="_gotcha"
                        tabindex="-1"
                        autocomplete="off"
                    />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Name -->
                    <div class="space-y-1.5">
                        <label class="block text-xs font-mono text-[#71717A]"
                            >Your Name</label
                        >
                        <input
                            v-model="form.name"
                            type="text"
                            required
                            placeholder="Jane Doe"
                            class="w-full px-3.5 py-2 rounded-lg bg-white border border-[#E5E5E5] focus:border-[#121212] focus:outline-hidden text-xs text-[#121212] transition-colors"
                        />
                    </div>

                    <!-- Email -->
                    <div class="space-y-1.5">
                        <label class="block text-xs font-mono text-[#71717A]"
                            >Email Address</label
                        >
                        <input
                            v-model="form.email"
                            type="email"
                            required
                            placeholder="jane@company.com"
                            class="w-full px-3.5 py-2 rounded-lg bg-white border border-[#E5E5E5] focus:border-[#121212] focus:outline-hidden text-xs text-[#121212] transition-colors"
                        />
                    </div>
                </div>

                <!-- Message -->
                <div class="space-y-1.5">
                    <label class="block text-xs font-mono text-[#71717A]"
                        >Message / Project Details</label
                    >
                    <textarea
                        v-model="form.message"
                        rows="5"
                        required
                        placeholder="Tell me about your goals, timelines, or requirements..."
                        class="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E5E5] focus:border-[#121212] focus:outline-hidden text-xs text-[#121212] transition-colors resize-none leading-relaxed"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    :disabled="isClassicSending"
                    class="px-5 py-2.5 rounded-lg bg-[#121212] hover:bg-[#262626] text-[#FAFAFA] text-xs font-medium transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                    <span>{{
                        isClassicSending ? "Sending..." : "Send Message"
                    }}</span>
                    <span>&nearr;</span>
                </button>
            </form>
        </section>

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
