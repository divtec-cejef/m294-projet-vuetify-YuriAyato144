<template>
  <!-- Barre de recherche dynamique -->
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
      <v-text-field
        v-model="nom"
        class="recherche"
        label="Recherche"
        placeholder="Chercher une divinité..."
        type="text"
      />
    </header>

    <!-- Héros -->
    <div v-if="filteredHeroes.length > 0">
      <h2 class="mt-4">Héros :</h2>
      <v-row class="mb-6">
        <v-col
          v-for="heroes in filteredHeroes"
          :key="heroes.id"
          class="heroe-card mb-2"
          md="3"
        >
          <v-card>
            <v-card-title>{{ heroes.name }}</v-card-title>
            <v-card-text> {{ heroes.description }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                :color="store.isFavorite(heroes.id, 'hero') ? 'white' : 'grey'"
                :icon="store.isFavorite(heroes.id, 'hero') ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="store.toggleFavorite(heroes.id, 'hero')"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="text-center py-6">
      Aucun héro trouvé...
    </div>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const store = useAppStore()

  // Charger les héros si ce n'est pas déjà fait
  onMounted(async () => {
    if (store.heroes.length === 0) {
      await store.fetchHeroesJSON()
    }
  })

  // Filtre réactif
  const filteredHeroes = computed(() =>
    store.heroes.filter(heroe =>
      heroe.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )
</script>

<style>
header {
  margin-top: 40px;
  margin-bottom: 40px;

  .bouton-menu {
    margin-right: 10px;
  }
}
</style>
