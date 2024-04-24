<script setup lang="ts">

</script>

<template>
  <div id="layout-wrapper" class="flex flex-col h-screen bg-gray-200">
    <Topbar class="bg-white" />
    <div class="flex flex-grow">
      <div class="w-48">
        <Sidebar class="bg-white" />
      </div>
      <div class="flex-grow">
        <div class="p-3">
          <slot />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
