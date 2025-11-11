<template>
  <v-container>
    <!-- Header navigation -->
    <header>
      <v-btn class="bouton-menu" color="primary" to="/">
        Menu
      </v-btn>
      <v-btn class="bouton-descendance" color="primary" to="/Descendance">
        Descendance
      </v-btn>
      <v-btn class="bouton-favori" color="black" to="/Favori">
        Favori
      </v-btn>
    </header>

    <h1 class="text-h3 mb-6">Mes Favoris</h1>

    <!-- Message si aucun favori -->
    <div v-if="favoriteItems.length === 0" class="text-center pa-8">
      <v-icon color="grey" size="80">mdi-heart-outline</v-icon>
      <p class="text-h5 mt-4 text-grey">Aucun favori pour le moment</p>
      <p class="text-body-1 text-grey">
        Cliquez sur le cœur des personnages pour les ajouter à vos favoris
      </p>
    </div>

    <!-- Liste des favoris groupés par type -->
    <div v-else>
      <!-- Dieux favoris -->
      <div v-if="favoriteGods.length > 0">
        <h2 class="mt-4 mb-3">Dieux favoris</h2>
        <v-row class="mb-6">
          <v-col
            v-for="god in favoriteGods"
            :key="god.id"
            md="3"
          >
            <v-card>
              <v-card-title class="cursor-pointer" @click="openDialog(god)">{{ god.name }}</v-card-title>
              <v-card-text>{{ god.description }}</v-card-text>
              <v-card-actions class="justify-end">
                <!-- Ouvre la modale avec les détails de l'entité -->
                <v-btn color="primary" @click="openDialog(god)">Voir les détails</v-btn>
                <v-btn
                  color="white"
                  icon="mdi-heart"
                  @click="store.toggleFavorite(god.id, 'god')"
                />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Héros favoris -->
      <div v-if="favoriteHeroes.length > 0">
        <h2 class="mt-4 mb-3">Héros favoris</h2>
        <v-row class="mb-6">
          <v-col
            v-for="hero in favoriteHeroes"
            :key="hero.id"
            md="3"
          >
            <v-card>
              <v-card-title class="cursor-pointer" @click="openDialog(hero)">{{ hero.name }}</v-card-title>
              <v-card-text>{{ hero.description }}</v-card-text>
              <v-card-actions class="justify-end">
                <!-- Ouvre la modale avec les détails de l'entité -->
                <v-btn color="primary" @click="openDialog(hero)">Voir les détails</v-btn>
                <v-btn
                  color="white"
                  icon="mdi-heart"
                  @click="store.toggleFavorite(hero.id, 'hero')"
                />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Titans favoris -->
      <div v-if="favoriteTitans.length > 0">
        <h2 class="mt-4 mb-3">Titans favoris</h2>
        <v-row class="mb-6">
          <v-col
            v-for="titan in favoriteTitans"
            :key="titan.id"
            md="3"
          >
            <v-card>
              <v-card-title class="cursor-pointer" @click="openDialog(titan)">{{ titan.name }}</v-card-title>
              <v-card-text>{{ titan.description }}</v-card-text>
              <v-card-actions class="justify-end">
                <!-- Ouvre la modale avec les détails de l'entité -->
                <v-btn color="primary" @click="openDialog(titan)">Voir les détails</v-btn>
                <v-btn
                  color="white"
                  icon="mdi-heart"
                  @click="store.toggleFavorite(titan.id, 'titan')"
                />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Monstres favoris -->
      <div v-if="favoriteMonsters.length > 0">
        <h2 class="mt-4 mb-3">Monstres favoris</h2>
        <v-row class="mb-6">
          <v-col
            v-for="monster in favoriteMonsters"
            :key="monster.id"
            md="3"
          >
            <v-card>
              <v-card-title class="cursor-pointer" @click="openDialog(monster)">{{ monster.name }}</v-card-title>
              <v-card-text>{{ monster.description }}</v-card-text>
              <v-card-actions class="justify-end">
                <!-- Ouvre la modale avec les détails de l'entité -->
                <v-btn color="primary" @click="openDialog(monster)">Voir les détails</v-btn>
                <v-btn
                  color="white"
                  icon="mdi-heart"
                  @click="store.toggleFavorite(monster.id, 'monster')"
                />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Bouton pour tout effacer -->
      <div class="text-center mt-6">
        <v-btn
          color="error"
          variant="outlined"
          @click="clearAllFavorites"
        >
          Effacer tous les favoris
        </v-btn>
      </div>
    </div>

    <!-- Modale pour voir les détails d'une entité -->
    <v-dialog v-model="dialogOpen" max-width="800">
      <v-card v-if="selectedEntity">
        <v-card-title class="text-h4">{{ selectedEntity.name }}</v-card-title>
        <v-img v-if="selectedEntity.image" height="300" :src="selectedEntity.image" />
        <v-card-text>
          <p>{{ selectedEntity.description }}</p>
          <div v-if="selectedEntity.attributes?.origin">
            <strong>Origine :</strong> {{ selectedEntity.attributes.origin }}
          </div>
          <div v-if="selectedEntity.attributes?.powers?.length">
            <strong>Pouvoirs :</strong>
            <ul>
              <li v-for="(power, i) in selectedEntity.attributes.powers" :key="i">{{ power }}</li>
            </ul>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="dialogOpen = false">Fermer</v-btn>
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

  // Chargement des données
  onMounted(async () => {
    await store.fetchGodsJSON()
    await store.fetchHeroesJSON()
    await store.fetchTitansJSON()
    await store.fetchMonstersJSON()
  })

  // Fonction pour ouvrir la modale
  function openDialog (entity) {
    selectedEntity.value = entity
    dialogOpen.value = true
  }

  // Récupérer tous les favoris
  const favoriteItems = computed(() => store.getFavorites)

  // Filtrer par type
  const favoriteGods = computed(() =>
    favoriteItems.value.filter(item => item.type === 'god'),
  )
  const favoriteHeroes = computed(() =>
    favoriteItems.value.filter(item => item.type === 'hero'),
  )
  const favoriteTitans = computed(() =>
    favoriteItems.value.filter(item => item.type === 'titan'),
  )
  const favoriteMonsters = computed(() =>
    favoriteItems.value.filter(item => item.type === 'monster'),
  )

  // Fonction pour tout effacer dynamiquement
  function clearAllFavorites () {
    if (confirm('Voulez-vous vraiment effacer tous vos favoris ?')) {
      store.favorites = []
      localStorage.setItem('favorites', JSON.stringify([]))
    }
  }
</script>

<style scoped>
header {
  margin-top: 40px;
  margin-bottom: 40px;
}
.bouton-menu, .bouton-descendance, .bouton-favori {
  margin-right: 10px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
