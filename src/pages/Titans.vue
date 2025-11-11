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
    <v-dialog v-model="dialogOpen" max-width="800">
      <v-card v-if="selectedTitan">
        <v-card-title class="text-h4">{{ selectedTitan.name }}</v-card-title>
        <v-img cover height="300" :src="selectedTitan.image" />

        <v-card-text>
          <!-- Description -->
          <p class="text-body-1 mb-4">{{ selectedTitan.description }}</p>

          <!-- Origine -->
          <div v-if="selectedTitan.attributes?.origin" class="mb-3">
            <strong>Origine :</strong> {{ selectedTitan.attributes.origin }}
          </div>

          <!-- Demeure -->
          <div v-if="selectedTitan.attributes?.abode" class="mb-3">
            <strong>Demeure :</strong> {{ selectedTitan.attributes.abode }}
          </div>

          <!-- Symboles -->
          <div v-if="selectedTitan.attributes?.symbols?.length > 0" class="mb-3">
            <strong>Symboles :</strong>
            <v-chip
              v-for="(symbol, index) in selectedTitan.attributes.symbols"
              :key="index"
              class="ma-1"
              size="small"
            >
              {{ symbol }}
            </v-chip>
          </div>

          <!-- Pouvoirs -->
          <div v-if="selectedTitan.attributes?.powers?.length > 0" class="mb-3">
            <strong>Pouvoirs :</strong>
            <ul>
              <li v-for="(power, index) in selectedTitan.attributes.powers" :key="index">
                {{ power }}
              </li>
            </ul>
          </div>

          <!-- Famille -->
          <div v-if="selectedTitan.attributes?.family" class="mb-3">
            <strong>Famille :</strong>
            <div v-if="selectedTitan.attributes.family.parents?.length > 0" class="ml-4">
              Parents : {{ selectedTitan.attributes.family.parents.join(', ') }}
            </div>
            <div v-if="selectedTitan.attributes.family.siblings?.length > 0" class="ml-4">
              Frères et sœurs : {{ selectedTitan.attributes.family.siblings.join(', ') }}
            </div>
            <div v-if="selectedTitan.attributes.family.spouse?.length > 0" class="ml-4">
              Époux/Épouse : {{ selectedTitan.attributes.family.spouse.join(', ') }}
            </div>
          </div>

          <!-- Histoires -->
          <div v-if="selectedTitan.attributes?.stories?.length > 0" class="mb-3">
            <strong>Histoires célèbres :</strong>
            <ul>
              <li v-for="(story, index) in selectedTitan.attributes.stories" :key="index">
                {{ story }}
              </li>
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

<style scoped>
header {
  margin-top: 40px;
  margin-bottom: 40px;
}

.bouton-menu, .bouton-descendance, .bouton-favori {
  margin-right: 10px;
}

.text-body-1 {
  line-height: 1.6;
}

ul {
  padding-left: 20px;
  margin-top: 8px;
}

li {
  margin-bottom: 4px;
}
</style>
