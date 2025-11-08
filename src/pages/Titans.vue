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

    <!-- Titans -->
    <div v-if="filteredTitans.length > 0">
      <h2 class="mt-4">Titans :</h2>
      <v-row class="mb-6">
        <v-col
          v-for="titans in filteredTitans"
          :key="titans.id"
          class="titan-card mb-2"
          md="3"
        >
          <v-card>
            <v-card-title>{{ titans.name }}</v-card-title>
            <v-card-text> {{ titans.description }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                :color="store.isFavorite(titan.id, 'titan') ? 'red' : 'grey'"
                :icon="store.isFavorite(titan.id, 'titan') ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="store.toggleFavorite(titan.id, 'titan')"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="text-center py-6">
      Aucun titan trouvé...
    </div>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const store = useAppStore()

  // Charger les titans si ce n'est pas déjà fait
  onMounted(async () => {
    if (store.titans.length === 0) {
      await store.fetchTitansJSON()
    }
  })

  // Filtre réactif
  const filteredTitans = computed(() =>
    store.titans.filter(titan =>
      titan.name.toLowerCase().includes(nom.value.toLowerCase()),
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
