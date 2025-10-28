<template>
  <v-text-field
    v-model="nom"
    class="mb-4"
    label="Recherche"
    placeholder="Chercher un nom..."
    type="text"
    @input="rechercher"
  />
  <v-container>
    <!-- Dieux -->
    <div v-if="filteredGods.length > 0">
      <h2 class="mt-4">Dieux :</h2>
      <v-row class="mb-6">
        <v-col
          v-for="god in filteredGods"
          :key="god.id"
          class="god-card mb-2"
          md="3"
        >
          <p>{{ god.name }}</p>
        </v-col>
      </v-row>
    </div>

    <!-- Héros -->
    <div v-if="filteredHeroes.length > 0">
      <h2 class="mt-4">Héros :</h2>
      <v-row class="mb-6">
        <v-col
          v-for="hero in filteredHeroes"
          :key="hero.id"
          class="hero-card mb-2"
          md="3"
        >
          <p>{{ hero.name }}</p>
        </v-col>
      </v-row>
    </div>

    <!-- Titans -->
    <div v-if="filteredTitans.length > 0">
      <h2 class="mt-4">Titans :</h2>
      <v-row class="mb-6">
        <v-col
          v-for="titan in filteredTitans"
          :key="titan.id"
          class="titan-card mb-2"
          md="3"
        >
          <p>{{ titan.name }}</p>
        </v-col>
      </v-row>
    </div>

    <!-- Monstres -->
    <div v-if="filteredMonsters.length > 0">
      <h2 class="mt-4">Monstres :</h2>
      <v-row class="mb-6">
        <v-col
          v-for="monster in filteredMonsters"
          :key="monster.id"
          class="monster-card mb-2"
          md="3"
        >
          <p>{{ monster.name }}</p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const store = useAppStore()

  // filtres par catégorie
  const filteredGods = computed(() =>
    store.gods.filter(god =>
      god.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )

  const filteredHeroes = computed(() =>
    store.heroes.filter(hero =>
      hero.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )

  const filteredTitans = computed(() =>
    store.titans.filter(titan =>
      titan.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )

  const filteredMonsters = computed(() =>
    store.monsters.filter(monster =>
      monster.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )
</script>
