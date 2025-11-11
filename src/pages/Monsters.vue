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
      placeholder="Chercher un monstre..."
      type="text"
    />

    <h1 class="text-h3 mb-6">Monstres :</h1>

    <!-- Liste des Monstres -->
    <div v-if="filteredMonsters.length > 0">
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

    <div v-else class="text-center py-6">
      Aucun monstre trouvé...
    </div>

    <!-- Modale pour afficher les détails -->
    <v-dialog v-model="dialogOpen" max-width="800">
      <v-card v-if="selectedMonster">
        <v-card-title class="text-h4">{{ selectedMonster.name }}</v-card-title>
        <v-img cover height="300" :src="selectedMonster.image" />

        <v-card-text>
          <!-- Description -->
          <p class="text-body-1 mb-4">{{ selectedMonster.description }}</p>

          <!-- Origine -->
          <div v-if="selectedMonster.attributes?.origin" class="mb-3">
            <strong>Origine :</strong> {{ selectedMonster.attributes.origin }}
          </div>

          <!-- Demeure -->
          <div v-if="selectedMonster.attributes?.abode" class="mb-3">
            <strong>Demeure :</strong> {{ selectedMonster.attributes.abode }}
          </div>

          <!-- Symboles -->
          <div v-if="selectedMonster.attributes?.symbols?.length > 0" class="mb-3">
            <strong>Symboles :</strong>
            <v-chip
              v-for="(symbol, index) in selectedMonster.attributes.symbols"
              :key="index"
              class="ma-1"
              size="small"
            >
              {{ symbol }}
            </v-chip>
          </div>

          <!-- Pouvoirs -->
          <div v-if="selectedMonster.attributes?.powers?.length > 0" class="mb-3">
            <strong>Pouvoirs :</strong>
            <ul>
              <li v-for="(power, index) in selectedMonster.attributes.powers" :key="index">
                {{ power }}
              </li>
            </ul>
          </div>

          <!-- Famille -->
          <div v-if="selectedMonster.attributes?.family" class="mb-3">
            <strong>Famille :</strong>
            <div v-if="selectedMonster.attributes.family.parents?.length > 0" class="ml-4">
              Parents : {{ selectedMonster.attributes.family.parents.join(', ') }}
            </div>
            <div v-if="selectedMonster.attributes.family.siblings?.length > 0" class="ml-4">
              Frères et sœurs : {{ selectedMonster.attributes.family.siblings.join(', ') }}
            </div>
            <div v-if="selectedMonster.attributes.family.spouse?.length > 0" class="ml-4">
              Époux/Épouse : {{ selectedMonster.attributes.family.spouse.join(', ') }}
            </div>
          </div>

          <!-- Histoires -->
          <div v-if="selectedMonster.attributes?.stories?.length > 0" class="mb-3">
            <strong>Histoires célèbres :</strong>
            <ul>
              <li v-for="(story, index) in selectedMonster.attributes.stories" :key="index">
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
  const selectedMonster = ref(null)

  // Fonction pour ouvrir la modale avec les détails
  function openDialog (monster) {
    selectedMonster.value = monster
    dialogOpen.value = true
  }

  // Charger les monstres si ce n'est pas déjà fait
  onMounted(async () => {
    if (store.monsters.length === 0) {
      await store.fetchMonstersJSON()
    }
  })

  // Filtre réactif
  const filteredMonsters = computed(() =>
    store.monsters.filter(monster =>
      monster.name.toLowerCase().includes(nom.value.toLowerCase()),
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
