<script lang="ts" setup>
import type { User } from '../types'

defineProps<{
  user: User
}>()
</script>

<template>
  <div
    class="
      p-2
      flex
      w-full
      items-center
      space-x-2
      rounded-lg
      border border-gray-300
      hover:bg-purple-100 hover:border-purple-500
    "
  >
    <img :src="user.avatar" class="rounded-full h-8 w-8" />
    <p class="font-medium">{{ user.name }}</p>
  </div>
</template>
