<template>
  <v-container>
    <header>
      <v-btn class="bouton-menu" color="black" to="/">
        Menu
      </v-btn>
      <v-btn class="bouton-descendance" color="primary" to="/Descendance">
        Descendance
      </v-btn>
      <v-btn class="bouton-favori" color="primary" to="/Favori">
        Favori
      </v-btn>
    </header>

    <h1 class="text-h3 mb-6">Menu</h1>
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
            <v-card-title>{{ god.name }}</v-card-title>
            <v-img alt="Image de dieux grec" :src="god.image" />
            <v-card-text>{{ god.description }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                :color="store.isFavorite(god.id, 'god') ? 'white' : 'grey'"
                :icon="store.isFavorite(god.id, 'god') ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="store.toggleFavorite(god.id, 'god')"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn class="bouton-divinite" color="primary" to="/gods">
          Voir plus...
        </v-btn>
      </div>
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
            <v-card-title>{{ hero.name }}</v-card-title>
            <v-card-text>{{ hero.description }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                :color="store.isFavorite(hero.id, 'hero') ? 'white' : 'grey'"
                :icon="store.isFavorite(hero.id, 'hero') ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="store.toggleFavorite(hero.id, 'hero')"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn class="bouton-divinite" color="primary" to="/heroes">
          Voir plus...
        </v-btn>
      </div>
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
            <v-card-title>{{ titan.name }}</v-card-title>
            <v-card-text>{{ titan.description }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                :color="store.isFavorite(titan.id, 'titan') ? 'white' : 'grey'"
                :icon="store.isFavorite(titan.id, 'titan') ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="store.toggleFavorite(titan.id, 'titan')"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn class="bouton-divinite" color="primary" to="/titans">
          Voir plus...
        </v-btn>
      </div>
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
            <v-card-title>{{ monster.name }}</v-card-title>
            <v-card-text>{{ monster.description }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                :color="store.isFavorite(monster.id, 'monster') ? 'white' : 'grey'"
                :icon="store.isFavorite(monster.id, 'monster') ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="store.toggleFavorite(monster.id, 'monster')"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn class="bouton-divinite" color="primary" to="/monsters">
          Voir plus...
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const store = useAppStore()

  // Chargement de toutes les données depuis les JSON
  onMounted(async () => {
    await store.fetchGodsJSON()
    await store.fetchHeroesJSON()
    await store.fetchTitansJSON()
    await store.fetchMonstersJSON()
  })

  // Limitation des vues possibles à 4
  const filteredGods = computed(() => store.gods.slice(0, 4))
  const filteredHeroes = computed(() => store.heroes.slice(0, 4))
  const filteredTitans = computed(() => store.titans.slice(0, 4))
  const filteredMonsters = computed(() => store.monsters.slice(0, 4))
</script>

<style scoped>
header {
  margin-top: 40px;
  margin-bottom: 40px;
}

.bouton-menu, .bouton-descendance, .bouton-favori {
  margin-right: 10px;
}
</style>
