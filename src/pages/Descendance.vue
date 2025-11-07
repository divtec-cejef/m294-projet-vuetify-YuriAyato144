<template>
  <v-container>
    <header>
      <v-btn class="bouton-menu" color="primary" to="/">
        Menu
      </v-btn>
      <v-btn class="bouton-descendance" color="primary" to="/Descendance">
        Descendance
      </v-btn>
      <v-btn class="bouton-favori" color="primary" to="/Favori">
        Favori
      </v-btn>
    </header>
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
          <v-card>
            <v-card-title> {{ god.name }}</v-card-title>
            <v-img alt="Image de dieux grec" :src="god.image" />
            <v-card-text> {{ god.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" />
      <v-btn class="bouton-divinite" color="primary" to="/gods">
        Voir plus...
      </v-btn>
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
          <v-card>
            <v-card-title> {{ hero.name }}</v-card-title>
            <v-card-text> {{ hero.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" />
      <v-btn class="bouton-divinite" color="primary" to="/heroes">
        Voir plus...
      </v-btn>
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
          <v-card>
            <v-card-title> {{ titan.name }}</v-card-title>
            <v-card-text> {{ titan.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" />
      <v-btn class="bouton-divinite" color="primary" to="/titans">
        Voir plus...
      </v-btn>
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
          <v-card>
            <v-card-title> {{ monster.name }}</v-card-title>
            <v-card-text> {{ monster.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" />
      <v-btn class="bouton-divinite" color="primary" to="/monsters">
        Voir plus...
      </v-btn>
    </div>
  </v-container>
</template>

<script>
  import { computed, onMounted } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const store = useAppStore()

  // Chargemenr de toutes les données depuis les JSON
  onMounted(async () => {
    await store.fetchGodsJSON()
    await store.fetchHeroesJSON()
    await store.fetchTitansJSON()
    await store.fetchMonstersJSON()
  })

  // Filtre réactif pour les dieux
  let nom
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
<!--CSS pour les boutons-->
<style>
header {
  margin-top: 40px;
  margin-bottom: 40px;

  .bouton-menu, .bouton-descendance {
    margin-right: 10px;
  }
}
</style>
