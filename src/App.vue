<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen px-4 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
    <!-- <div class="flex items-center w-full max-w-lg shadow-2xl rounded-2xl">
      <router-view class="w-full p-6 bg-white border-2 border-purple-600 shadow-lg border-3 rounded-2xl" />
    </div> -->
    <div class="w-full max-w-lg bg-white border mockup-window border-base-300">
      <div class="flex justify-center p-6 border-t border-base-300">
        <router-view class="w-full"></router-view>
      </div>
    </div>
  </div>
</template>
