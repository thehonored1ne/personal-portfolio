<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    text: string
    speed?: number
    maxIterations?: number
    characters?: string
    class?: string
  }>(),
  {
    // Increased speed interval from 35ms to 75ms and iterations to 18 for a deliberate, noticeable animation
    speed: 75,
    maxIterations: 18,
    characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  }
)

const displayText = ref('')
const isComplete = ref(false)

const decrypt = () => {
  let iteration = 0
  const originalText = props.text
  const length = originalText.length

  const interval = setInterval(() => {
    displayText.value = originalText
      .split('')
      .map((char, index) => {
        if (char === ' ') return ' '
        if (index < iteration) {
          return originalText[index]
        }
        return props.characters[Math.floor(Math.random() * props.characters.length)]
      })
      .join('')

    iteration += 1 / (props.maxIterations / length)

    if (iteration >= length) {
      displayText.value = originalText
      isComplete.value = true
      clearInterval(interval)
    }
  }, props.speed)
}

onMounted(() => {
  // Brief 200ms initial pause before decrypting so user sees the scramble
  setTimeout(() => {
    decrypt()
  }, 200)
})
</script>

<template>
  <span :class="props.class" class="font-sans inline-block">
    {{ displayText || text }}
  </span>
</template>
