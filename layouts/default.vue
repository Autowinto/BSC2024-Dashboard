<script setup lang="ts">

</script>

<template>
  <div
    id="layout-wrapper" class="flex flex-col h-screen"
  >
    <Topbar />
    <div class="flex flex-grow">
      <div class="w-48">
        <Sidebar />
      </div>
      <div class="flex-grow">
        <div class="p-3 h-full">
          <slot />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
