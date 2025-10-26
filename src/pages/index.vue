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
    <div v-for="hero in store.heroes" :key="hero.id" class="hero-card">
      <p>{{ hero.name }}</p>
    </div>
  </div>
  <div>
    <h2>Titans :</h2>
    <div v-for="titan in store.titans" :key="titan.id" class="titan-card">
      <p>{{ titan.name }}</p>
    </div>
  </div>
  <div>
    <h2>Monstres :</h2>
    <div v-for="monster in store.monsters" :key="monster.id" class="monster-card">
      <p>{{ monster.name }}</p>
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
