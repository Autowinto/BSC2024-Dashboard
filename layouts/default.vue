<script setup lang="ts">

</script>

<template>
  <div id="layout-wrapper" class="h-screen flex-col flex">
    <Topbar />
    <Sidebar>
      <slot />
    </Sidebar>
    <Footer />
  </div>
</template>
