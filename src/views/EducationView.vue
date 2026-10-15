<script setup lang="ts">
import { education } from '@/data/portfolio'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="animate-fade-in max-w-2xl mx-auto space-y-12">
    <!-- Header -->
    <header class="space-y-2">
      <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight text-[#121212]">
        Education
      </h1>
      <p class="text-xs font-mono text-[#71717A]">
        Academic background, foundation & studies
      </p>
    </header>

    <!-- Education Ledger -->
    <div class="space-y-10">
      <article
        v-for="item in education"
        :key="item.institution"
        class="space-y-4 pb-8 border-b border-[#E5E5E5] last:border-b-0"
      >
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h2 class="text-base font-semibold text-[#121212]">
              {{ item.institution }}
            </h2>
            <div class="text-xs font-mono text-[#404040]">
              {{ item.degree }} in {{ item.field }}
            </div>
          </div>

          <div class="text-xs font-mono text-[#71717A] flex-shrink-0">
            <span>{{ item.period }}</span>
            <span v-if="item.location" class="ml-1 text-[#A1A1AA]">({{ item.location }})</span>
          </div>
        </div>

        <!-- Highlights & Coursework -->
        <div v-if="item.highlights && item.highlights.length" class="space-y-2">
          <ul class="space-y-1.5">
            <li
              v-for="h in item.highlights"
              :key="h"
              class="flex items-start gap-2.5 text-xs text-[#404040] leading-relaxed"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-[#121212] mt-1.5 flex-shrink-0" />
              <span>{{ h }}</span>
            </li>
          </ul>
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
