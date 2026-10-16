<template>
    <div class="max-w-2xl mx-auto min-h-[55vh] flex flex-col justify-center gap-6">
        <div class="space-y-3">
            <p class="text-xs font-mono uppercase tracking-wider text-[#71717A]">
                Error 404
            </p>
            <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121212]">
                Page not found
            </h1>
            <p class="max-w-md text-sm text-[#52525B] leading-relaxed">
                The page you’re looking for doesn’t exist or may have moved.
            </p>
        </div>

        <RouterLink
            to="/"
            class="inline-flex w-fit items-center gap-1.5 text-xs font-mono text-[#71717A] hover:text-[#121212] transition-colors"
        >
            &larr; Back to Home
        </RouterLink>
    </div>
</template>
