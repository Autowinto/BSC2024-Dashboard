<script setup lang="ts">
useHead({
  title: 'Login',
})
</script>

<template>
  <div class="flex min-h-screen min-w-screen place-items-center place-content-center bg-gradient-to-tr from-green-500 to-blue-500">
    <UCard>
      <template #header>
        <p class="text-2xl text-center">
          Power Usage Dashboard
        </p>
      </template>
      <div class=" flex flex-col space-y-2">
        <UFormGroup>
          <UInput class="pb-2" placeholder="Username" />
          <UInput class="pb-2" placeholder="Password" />
          <UButton to="/" class="w-full">
            Sign In
          </UButton>
        </UFormGroup>
        <UDivider class="pb-12" />
        <div>
          <UButton to="/" class="w-full" variant="outline" color="white">
            <Icon name="logos:google-icon" />
            Sign in with Google
          </UButton>
        </div>
        <div>
          <UButton to="/" class="w-full" variant="outline" color="white">
            <Icon name="logos:github-icon" />
            Sign in with GitHub
          </UButton>
        </div>
        <div>
          <UButton to="/" class="w-full" variant="outline" color="white">
            <Icon name="logos:microsoft-icon" />
            Sign in with Microsoft
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
