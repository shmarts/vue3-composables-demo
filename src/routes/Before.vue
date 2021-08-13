<script>
export default {
  data() {
    return {
      count: 1,
      previousCount: 0,
    }
  },
  computed: {
    doubledCount() {
      return this.count * 2
    },
  },
  watch: {
    count(val, oldVal) {
      this.previousCount = oldVal
    },
  },
  methods: {
    increaseCount() {
      this.count++
    },
  },
}
</script>

<template>
  <div>
    <h1 class="text-lg font-medium">Count</h1>
    <p class="mt-2 text-sm">Count is {{ count }}</p>
    <p class="mt-2 text-sm">Count doubled is {{ doubledCount }}</p>
    <p class="mt-2 text-sm">Count's previous value was {{ previousCount }}</p>
    <button class="mt-6 w-full btn btn-primary" @click="increaseCount">Increase count</button>
  </div>
</template>
