<template>
  <div class="p-4">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Username</span>
      </label>
      <input type="text" placeholder="username" class="input input-bordered" />
    </div>

    <button class="mt-4 btn btn-primary">DaisyUI {{ color }} Button</button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
const color = ref('reddd')
</script>
