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

    <h1 class="text-h3 mb-6">Dieux :</h1>

    <!-- Liste des Dieux -->
    <div v-if="filteredGods.length > 0">
      <v-row class="mb-6">
        <v-col v-for="god in filteredGods" :key="god.id" md="3">
          <v-card>
            <v-card-title>{{ god.name }}</v-card-title>
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

    <div v-else class="text-center py-6">
      Aucun dieu trouvé...
    </div>

    <!-- Modale pour afficher les détails -->
    <v-dialog v-model="dialogOpen" max-width="800">
      <v-card v-if="selectedGod">
        <v-card-title class="text-h4">{{ selectedGod.name }}</v-card-title>
        <v-img cover height="300" :src="selectedGod.image" />

        <v-card-text>
          <!-- Description -->
          <p class="text-body-1 mb-4">{{ selectedGod.description }}</p>

          <!-- Origine -->
          <div v-if="selectedGod.attributes?.origin" class="mb-3">
            <strong>Origine :</strong> {{ selectedGod.attributes.origin }}
          </div>

          <!-- Demeure -->
          <div v-if="selectedGod.attributes?.abode" class="mb-3">
            <strong>Demeure :</strong> {{ selectedGod.attributes.abode }}
          </div>

          <!-- Symboles -->
          <div v-if="selectedGod.attributes?.symbols?.length > 0" class="mb-3">
            <strong>Symboles :</strong>
            <v-chip
              v-for="(symbol, index) in selectedGod.attributes.symbols"
              :key="index"
              class="ma-1"
              size="small"
            >
              {{ symbol }}
            </v-chip>
          </div>

          <!-- Pouvoirs -->
          <div v-if="selectedGod.attributes?.powers?.length > 0" class="mb-3">
            <strong>Pouvoirs :</strong>
            <ul>
              <li v-for="(power, index) in selectedGod.attributes.powers" :key="index">
                {{ power }}
              </li>
            </ul>
          </div>

          <!-- Famille -->
          <div v-if="selectedGod.attributes?.family" class="mb-3">
            <strong>Famille :</strong>
            <div v-if="selectedGod.attributes.family.parents?.length > 0" class="ml-4">
              Parents : {{ selectedGod.attributes.family.parents.join(', ') }}
            </div>
            <div v-if="selectedGod.attributes.family.siblings?.length > 0" class="ml-4">
              Frères et sœurs : {{ selectedGod.attributes.family.siblings.join(', ') }}
            </div>
            <div v-if="selectedGod.attributes.family.spouse?.length > 0" class="ml-4">
              Époux/Épouse : {{ selectedGod.attributes.family.spouse.join(', ') }}
            </div>
          </div>

          <!-- Histoires -->
          <div v-if="selectedGod.attributes?.stories?.length > 0" class="mb-3">
            <strong>Histoires célèbres :</strong>
            <ul>
              <li v-for="(story, index) in selectedGod.attributes.stories" :key="index">
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
  const selectedGod = ref(null)

  // Fonction pour ouvrir la modale avec les détails
  function openDialog (god) {
    selectedGod.value = god
    dialogOpen.value = true
  }

  // Charger les dieux si ce n'est pas déjà fait
  onMounted(async () => {
    if (store.gods.length === 0) {
      await store.fetchGodsJSON()
    }
  })

  // Filtre réactif
  const filteredGods = computed(() =>
    store.gods.filter(god =>
      god.name.toLowerCase().includes(nom.value.toLowerCase()),
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
