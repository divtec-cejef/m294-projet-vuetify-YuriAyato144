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

    <h1 class="text-h3 mb-6">Héros :</h1>

    <!-- Liste des Héros -->
    <div v-if="filteredHeroes.length > 0">
      <v-row class="mb-6">
        <v-col v-for="heroe in filteredHeroes" :key="heroe.id" md="3">
          <v-card>
            <v-card-title>{{ heroe.name }}</v-card-title>
            <v-card-text>{{ heroe.description }}</v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="primary" @click="openDialog(heroe)">Voir les détails</v-btn>
              <v-btn
                :color="store.isFavorite(heroe.id, 'heroe') ? 'white' : 'grey'"
                :icon="store.isFavorite(heroe.id, 'heroe') ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="store.toggleFavorite(heroe.id, 'heroe')"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="text-center py-6">
      Aucun héro trouvé...
    </div>

    <!-- Modale pour afficher les détails -->
    <v-dialog v-model="dialogOpen" max-width="600">
      <v-card v-if="selectedHeroe">
        <v-card-title>{{ selectedHeroe.name }}</v-card-title>
        <v-img height="300" :src="selectedHeroe.image" />
        <v-card-text>
          <p>{{ selectedHeroe.description }}</p>
          <p v-if="selectedHeroe.powers"><strong>Pouvoirs :</strong> {{ selectedHeroe.powers }}</p>
          <p v-if="selectedHeroe.origin"><strong>Origine :</strong> {{ selectedHeroe.origin }}</p>
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
  const selectedHeroe = ref(null)

  // Fonction pour ouvrir la modale avec les détails
  function openDialog (heroe) {
    selectedHeroe.value = heroe
    dialogOpen.value = true
  }

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
}

.bouton-menu, .bouton-descendance, .bouton-favori {
  margin-right: 10px;
}
</style>
