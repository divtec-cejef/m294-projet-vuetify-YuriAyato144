<template>
  <!-- Barre de recherche dynamique -->
  <v-container>
    <header>
      <v-btn class="bouton-menu" color="primary" to="/">
        Menu
      </v-btn>
      <v-btn class="bouton-descendance" color="black" to="/Descendance">
        Descendance
      </v-btn>
      <v-btn class="bouton-favori" color="primary" to="/Favori">
        Favori
      </v-btn>
    </header>
    <v-text-field
      v-model="nom"
      class="recherche"
      label="Recherche"
      placeholder="Chercher une divinité..."
      type="text"
    />

    <h1 class="text-h3 mb-6">Descendance</h1>
    <!-- Dieux -->
    <div v-if="filteredGods.length > 0">
      <h1 class="mt-4">Dieux :</h1>
      <v-row class="mb-6">
        <v-col
          v-for="god in filteredGods"
          :key="god.id"
          class="god-card mb-2"
          md="3"
        >
          <v-card>
            <v-card-title> {{ god.name }}</v-card-title>
            <v-card-text> {{ god.attributes.origin }}</v-card-text>
            <v-img alt="Image de dieux grec" :src="god.image" />
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" />
    </div>

    <!-- Héros -->
    <div v-if="filteredHeroes.length > 0">
      <h1 class="mt-4">Héros :</h1>
      <v-row class="mb-6">
        <v-col
          v-for="hero in filteredHeroes"
          :key="hero.id"
          class="hero-card mb-2"
          md="3"
        >
          <v-card>
            <v-card-title> {{ hero.name }}</v-card-title>
            <v-card-text> {{ hero.attributes.origin }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" />
    </div>

    <!-- Titans -->
    <div v-if="filteredTitans.length > 0">
      <h1 class="mt-4">Titans :</h1>
      <v-row class="mb-6">
        <v-col
          v-for="titan in filteredTitans"
          :key="titan.id"
          class="titan-card mb-2"
          md="3"
        >
          <v-card>
            <v-card-title> {{ titan.name }}</v-card-title>
            <v-card-text> {{ titan.attributes.origin }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" />
    </div>

    <!-- Monstres -->
    <div v-if="filteredMonsters.length > 0">
      <h1 class="mt-4">Monstres :</h1>
      <v-row class="mb-6">
        <v-col
          v-for="monster in filteredMonsters"
          :key="monster.id"
          class="monster-card mb-2"
          md="3"
        >
          <v-card>
            <v-card-title> {{ monster.name }}</v-card-title>
            <v-card-text> {{ monster.attributes.origin }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" />
    </div>
  </v-container>
</template>

<script setup>

  import { computed, onMounted } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const store = useAppStore()

  // Chargemenr de toutes les données depuis les JSON
  onMounted(async () => {
    await store.fetchGodsJSON()
    await store.fetchHeroesJSON()
    await store.fetchTitansJSON()
    await store.fetchMonstersJSON()
  })
  // Filtre réactif pour les dieux
  const filteredGods = computed(() =>
    store.gods.filter(god =>
      god.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )
  // Filtre réactif pour les héros
  const filteredHeroes = computed(() =>
    store.heroes.filter(heroe =>
      heroe.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )
  // Filtre réactif pour les titans
  const filteredTitans = computed(() =>
    store.titans.filter(titan =>
      titan.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )
  // Filtre réactif pour les monstres
  const filteredMonsters = computed(() =>
    store.monsters.filter(monster =>
      monster.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )

</script>

<style>
header {
  margin-bottom: 40px;
}
.bouton-menu, .bouton-descendance, .bouton-favori {
    margin-right: 10px;
    margin-top: 20px;
  }
.recherche {
    margin-top: 40px;
  }
h1{
  margin-bottom: 20px;
}
</style>
