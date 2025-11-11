<template>
  <v-container>
    <header>
      <v-btn class="bouton-menu" color="black" to="/">Menu</v-btn>
      <v-btn class="bouton-descendance" color="primary" to="/Descendance">Descendance</v-btn>
      <v-btn class="bouton-favori" color="primary" to="/Favori">Favori</v-btn>
    </header>

    <h1 class="text-h3 mb-6">Menu</h1>

    <!-- Dieux -->
    <div v-if="filteredGods.length > 0">
      <h2 class="mt-4">Dieux :</h2>
      <v-row class="mb-6">
        <v-col v-for="god in filteredGods" :key="god.id" md="3">
          <v-card>
            <v-card-title>{{ god.name }}</v-card-title>
            <v-img height="200" :src="god.image" />
            <v-card-text>{{ god.description }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="primary" @click="openDialog(god)">Voir les détails</v-btn>
              <v-btn
                :color="store.isFavorite(god.id, 'god') ? 'white' : 'grey'"
                :icon="store.isFavorite(god.id, 'god') ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="store.toggleFavorite(god.id, 'god')"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Héros -->
    <div v-if="filteredHeroes.length > 0">
      <h2 class="mt-4">Héros :</h2>
      <v-row class="mb-6">
        <v-col v-for="hero in filteredHeroes" :key="hero.id" md="3">
          <v-card>
            <v-card-title>{{ hero.name }}</v-card-title>
            <v-card-text>{{ hero.description }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="primary" @click="openDialog(hero)">Voir les détails</v-btn>
              <v-btn
                :color="store.isFavorite(hero.id, 'hero') ? 'white' : 'grey'"
                :icon="store.isFavorite(hero.id, 'hero') ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="store.toggleFavorite(hero.id, 'hero')"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Titans -->
    <div v-if="filteredTitans.length > 0">
      <h2 class="mt-4">Titans :</h2>
      <v-row class="mb-6">
        <v-col v-for="titan in filteredTitans" :key="titan.id" md="3">
          <v-card>
            <v-card-title>{{ titan.name }}</v-card-title>
            <v-card-text>{{ titan.description }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="primary" @click="openDialog(titan)">Voir les détails</v-btn>
              <v-btn
                :color="store.isFavorite(titan.id, 'titan') ? 'white' : 'grey'"
                :icon="store.isFavorite(titan.id, 'titan') ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="store.toggleFavorite(titan.id, 'titan')"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Monstres -->
    <div v-if="filteredMonsters.length > 0">
      <h2 class="mt-4">Monstres :</h2>
      <v-row class="mb-6">
        <v-col v-for="monster in filteredMonsters" :key="monster.id" md="3">
          <v-card>
            <v-card-title>{{ monster.name }}</v-card-title>
            <v-card-text>{{ monster.description }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="primary" @click="openDialog(monster)">Voir les détails</v-btn>
              <v-btn
                :color="store.isFavorite(monster.id, 'monster') ? 'white' : 'grey'"
                :icon="store.isFavorite(monster.id, 'monster') ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="store.toggleFavorite(monster.id, 'monster')"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Modale universelle -->
    <v-dialog v-model="dialogOpen" max-width="600">
      <v-card v-if="selectedEntity">
        <v-card-title>{{ selectedEntity.name }}</v-card-title>
        <v-img height="300" :src="selectedEntity.image" />
        <v-card-text>
          <p>{{ selectedEntity.description }}</p>
          <p v-if="selectedEntity.powers"><strong>Pouvoirs :</strong> {{ selectedEntity.powers }}</p>
          <p v-if="selectedEntity.origin"><strong>Origine :</strong> {{ selectedEntity.origin }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialogOpen = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const store = useAppStore()
  const dialogOpen = ref(false)
  const selectedEntity = ref(null)

  function openDialog (entity) {
    selectedEntity.value = entity
    dialogOpen.value = true
  }

  onMounted(async () => {
    await store.fetchGodsJSON()
    await store.fetchHeroesJSON()
    await store.fetchTitansJSON()
    await store.fetchMonstersJSON()
  })

  const filteredGods = computed(() => store.gods.slice(0, 4))
  const filteredHeroes = computed(() => store.heroes.slice(0, 4))
  const filteredTitans = computed(() => store.titans.slice(0, 4))
  const filteredMonsters = computed(() => store.monsters.slice(0, 4))
</script>
