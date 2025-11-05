<template>
  <v-text-field
    v-model="nom"
    class="mb-4"
    label="Recherche"
    placeholder="Chercher une divinité, héros, titan ou monstre..."
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
          <v-card>
            <v-card-title> {{ god.name }} </v-card-title>
            <v-card-text> {{ god.description }} </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- Lien vers la page complète -->
      <div class="text-center" />
      <v-btn color="primary" to="/gods">
        Voir tous les dieux
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
            <v-card-title> {{ hero.name }} </v-card-title>
            <v-card-text> {{ hero.description }} </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" />
      <v-btn color="primary" to="/heroes">
        Voir tous les héros
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
            <v-card-title> {{ titan.name }} </v-card-title>
            <v-card-text> {{ titan.description }} </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" />
      <v-btn color="primary" to="/titans">
        Voir tous les titans
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
            <v-card-title> {{ monster.name }} </v-card-title>
            <v-card-text> {{ monster.description }} </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center" />
      <v-btn color="primary" to="/monsters">
        Voir tous les monstres
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const store = useAppStore()

  // Charger toutes les données depuis les JSON
  onMounted(async () => {
    await store.fetchGodsJSON()
    await store.fetchHeroesJSON()
    await store.fetchTitansJSON()
    await store.fetchMonstersJSON()
  })

  // Filtrage + limite de 4 par catégorie
  const filteredGods = computed(() =>
    store.gods
      .filter(god =>
        god.name.toLowerCase().includes(nom.value.toLowerCase()),
      )
      .slice(0, 4),
  )

  const filteredHeroes = computed(() =>
    store.heroes
      .filter(hero =>
        hero.name.toLowerCase().includes(nom.value.toLowerCase()),
      )
      .slice(0, 4),
  )

  const filteredTitans = computed(() =>
    store.titans
      .filter(titan =>
        titan.name.toLowerCase().includes(nom.value.toLowerCase()),
      )
      .slice(0, 4),
  )

  const filteredMonsters = computed(() =>
    store.monsters
      .filter(monster =>
        monster.name.toLowerCase().includes(nom.value.toLowerCase()),
      )
      .slice(0, 4),
  )

  // Fonction rechercher (optionnelle, les computed sont déjà réactifs)
  function rechercher () {}
</script>
