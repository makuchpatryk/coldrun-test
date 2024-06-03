<template>
  <section class="m-auto">
    <nav class="p-3 text-center">
      <router-link
        class="p-2 text-[color:rgb(var(--surface-700))] hover:text-[color:rgb(var(--surface-900))] font-semibold"
        to="/"
        >Home</router-link
      >
      |
      <router-link
        class="p-2 text-[color:rgb(var(--surface-700))] hover:text-[color:rgb(var(--surface-900))] font-semibold"
        to="/trucks"
        >Trucks</router-link
      >
    </nav>
    <main class="p-3">
      <router-view />
    </main>
    <Toast data-cy="toast" />
  </section>
</template>
<script setup lang="ts">
import Toast from "primevue/toast";
</script>

<style scoped></style>
