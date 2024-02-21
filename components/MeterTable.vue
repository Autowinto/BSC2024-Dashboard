<script setup lang="ts">
const people = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member',
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin',
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member',
}]

const columns = [{
  key: 'name',
  label: 'Name',
}, {
  key: 'title',
  label: 'Title',
}, {
  key: 'email',
  label: 'Email',
}, {
  key: 'role',
  label: 'Role',
}]
</script>

<template>
  <div>
    <UCard>
      <UTable :rows="people" :columns="columns" />
    </UCard>
  </div>
</template>
