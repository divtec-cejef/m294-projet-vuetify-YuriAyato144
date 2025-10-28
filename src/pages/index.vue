<template>
  <v-text-field
    v-model="nom"
    label="Recherche"
    placeholder="Chercher un dieux..."
    type="text"
    @input="rechercher"
  />
  <v-container>
    <h2>Dieux :</h2>
    <v-row>
      <v-col
        v-for="god in gods"
        :key="god.id"
        class="god-card"
        md="4"
      >
        <p>{{ god.name }}</p>
      </v-col>
      <h2>Héros :</h2>
      <v-col
        v-for="hero in store.heroes"
        :key="hero.id"
        class="hero-card"
        md="4"
      >
        <p>{{ hero.name }}</p>
      </v-col>

      <h2>Titans :</h2>
      <v-col
        v-for="titan in store.titans"
        :key="titan.id"
        class="titan-card"
        md="4"
      >
        <p>{{ titan.name }}</p>
      </v-col>
      <h2>Monstres :</h2>
      <v-col
        v-for="monster in store.monsters"
        :key="monster.id"
        class="monster-card"
        md="4"
      >
        <p>{{ monster.name }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const gods = ref([])
  const store = useAppStore()

  function rechercher () {
    gods.value = store.gods.filter(god =>
      god.name.toLowerCase().includes(nom.value.toLowerCase()) || nom.value === '')
  }

  rechercher()
</script>
