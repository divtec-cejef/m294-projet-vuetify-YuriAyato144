<template>
  <h1>Accueil</h1>
  <div>
    <p>Dieux :</p>
    <div v-for="god in store.gods" :key="god.id">
      <h2>{{ god.name }}</h2>
    </div>
  </div>
</template>

<script setup>
  import { useAppStore } from '@/stores/app.js'

  const store = useAppStore()

</script>
