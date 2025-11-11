<template>
  <v-container>
    <div class="text-center" />
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

    <v-text-field
      v-model="nom"
      class="recherche"
      label="Recherche"
      placeholder="Chercher une divinité..."
      type="text"
    />

    <h1 class="text-h3 mb-6">Titans :</h1>

    <!-- Liste des Titans -->
    <div v-if="filteredTitans.length > 0">
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

    <div v-else class="text-center py-6">
      Aucun titan trouvé...
    </div>

    <!-- Modale pour afficher les détails -->
    <v-dialog v-model="dialogOpen" max-width="600">
      <v-card v-if="selectedTitan">
        <v-card-title>{{ selectedTitan.name }}</v-card-title>
        <v-img height="300" :src="selectedTitan.image" />
        <v-card-text>
          <p>{{ selectedTitan.description }}</p>
          <p v-if="selectedTitan.powers"><strong>Pouvoirs :</strong> {{ selectedTitan.powers }}</p>
          <p v-if="selectedTitan.origin"><strong>Origine :</strong> {{ selectedTitan.origin }}</p>
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

  const nom = ref('')
  const store = useAppStore()
  const dialogOpen = ref(false)
  const selectedTitan = ref(null)

  // Fonction pour ouvrir la modale avec les détails
  function openDialog (titan) {
    selectedTitan.value = titan
    dialogOpen.value = true
  }

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
}

.bouton-menu, .bouton-descendance, .bouton-favori {
  margin-right: 10px;
}
</style>
