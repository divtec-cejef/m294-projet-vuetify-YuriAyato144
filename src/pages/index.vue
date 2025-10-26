<template>
  <h1>Accueil</h1>
  <div>
    <h2>Dieux :</h2>
    <div v-for="god in store.gods" :key="god.id" class="god-card">
      <p>{{ god.name }}</p>
    </div>
  </div>
  <div>
    <h2>Héros :</h2>
    <div v-for="heroe in store.heroes" :key="heroe.id" class="hero-card">
      <p>{{ heroe.name }}</p>
    </div>
  </div>
  <div>
    <h2>Titans :</h2>
    <div v-for="titan in store.titans" :key="titan.id" class="titan-card">
      <p>{{ titan.name }}</p>
    </div>
  </div>
</template>

<script setup>
  import { useAppStore } from '@/stores/app.js'

  const store = useAppStore()

  // Fonction pour gérer les URLs relatives ou absolues
  function getFullImageUrl (imagePath) {
    if (!imagePath) return '' // si pas d'image
    return imagePath.startsWith('http') ? imagePath : `https://thegreekmythapi.vercel.app${imagePath}`
  }
</script>
