<script lang="ts" setup>
import useMousePosition from '../composables/useMousePosition'

const count = ref(1)
const previousCount = ref(0)

const doubledCount = computed(() => count.value * 2)

watch(count, (val, oldVal) => {
  previousCount.value = oldVal
})

const { x, y } = useMousePosition()

const increaseCount = () => {
  count.value++
}
</script>

<template>
  <div>
    <h1 class="text-lg font-medium">Count</h1>
    <p class="mt-2 text-sm">Count is {{ count }}</p>
    <p class="mt-2 text-sm">Count doubled is {{ doubledCount }}</p>
    <p class="mt-2 text-sm">Count's previous value was {{ previousCount }}</p>
    <button class="mt-6 w-full btn btn-primary" @click="increaseCount">Increase count</button>
    <div class="mt-6">Mouse position {{ x }}, {{ y }}</div>
  </div>
</template>
