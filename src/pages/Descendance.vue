<template>
  <!-- Conteneur principal de la page Descendance -->
  <v-container>
    <!-- Header avec navigation principale -->
    <header>
      <v-btn class="bouton-menu" color="primary" to="/">
        Menu
      </v-btn>
      <v-btn class="bouton-descendance" color="black" to="/Descendance">
        Descendance
      </v-btn>
      <v-btn class="bouton-favori" color="primary" to="/Favori">
        Favori
      </v-btn>
    </header>

    <!-- Champ de recherche dynamique pour filtrer les entités -->
    <v-text-field
      v-model="nom"
      class="recherche"
      label="Recherche"
      placeholder="Chercher une divinité, héros, titan ou monstre..."
      type="text"
    />

    <!-- Titre principal de la page -->
    <h1 class="text-h3 mb-6">Descendance</h1>

    <!-- Section Dieux -->
    <div v-if="filteredGods.length > 0">
      <h2 class="mt-4">Dieux :</h2>
      <v-row class="mb-6">
        <v-col v-for="god in filteredGods" :key="god.id" md="3">
          <v-card>
            <v-card-title>{{ god.name }}</v-card-title>
            <v-card-text>{{ god.attributes.origin }}</v-card-text>
            <v-card-actions class="justify-end">
              <!-- Ouvre la modale avec les détails de l'entité -->
              <v-btn color="primary" @click="openDialog(god)">Voir les détails</v-btn>
              <!-- Bouton favoris : change selon si l'entité est dans les favoris -->
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

    <!-- Section Héros -->
    <div v-if="filteredHeroes.length > 0">
      <h2 class="mt-4">Héros :</h2>
      <v-row class="mb-6">
        <v-col v-for="hero in filteredHeroes" :key="hero.id" md="3">
          <v-card>
            <v-card-title>{{ hero.name }}</v-card-title>
            <v-card-text>{{ hero.attributes.origin }}</v-card-text>
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
    <div v-else class="text-center py-6">
      Aucun héros trouvé...
    </div>

    <!-- Section Titans -->
    <div v-if="filteredTitans.length > 0">
      <h2 class="mt-4">Titans :</h2>
      <v-row class="mb-6">
        <v-col v-for="titan in filteredTitans" :key="titan.id" md="3">
          <v-card>
            <v-card-title>{{ titan.name }}</v-card-title>
            <v-card-text>{{ titan.attributes.origin }}</v-card-text>
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

    <!-- Section Monstres -->
    <div v-if="filteredMonsters.length > 0">
      <h2 class="mt-4">Monstres :</h2>
      <v-row class="mb-6">
        <v-col v-for="monster in filteredMonsters" :key="monster.id" md="3">
          <v-card>
            <v-card-title>{{ monster.name }}</v-card-title>
            <v-card-text>{{ monster.attributes.origin }}</v-card-text>
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

    <!-- Modale pour afficher les détails d'une entité -->
    <v-dialog v-model="dialogOpen" max-width="800">
      <v-card v-if="selectedEntity">
        <v-card-title class="text-h4">{{ selectedEntity.name }}</v-card-title>
        <v-img cover height="300" :src="selectedEntity.image" />

        <v-card-text>
          <!-- Description générale -->
          <p class="text-body-1 mb-4">{{ selectedEntity.description }}</p>

          <!-- Attributs conditionnels -->
          <div v-if="selectedEntity.attributes?.origin" class="mb-3">
            <strong>Origine :</strong> {{ selectedEntity.attributes.origin }}
          </div>
          <div v-if="selectedEntity.attributes?.abode" class="mb-3">
            <strong>Demeure :</strong> {{ selectedEntity.attributes.abode }}
          </div>
          <div v-if="selectedEntity.attributes?.symbols?.length > 0" class="mb-3">
            <strong>Symboles :</strong>
            <v-chip v-for="(symbol, index) in selectedEntity.attributes.symbols" :key="index" class="ma-1" size="small">
              {{ symbol }}
            </v-chip>
          </div>
          <div v-if="selectedEntity.attributes?.powers?.length > 0" class="mb-3">
            <strong>Pouvoirs :</strong>
            <ul>
              <li v-for="(power, index) in selectedEntity.attributes.powers" :key="index">{{ power }}</li>
            </ul>
          </div>
          <div v-if="selectedEntity.attributes?.family" class="mb-3">
            <strong>Famille :</strong>
            <div v-if="selectedEntity.attributes.family.parents?.length > 0" class="ml-4">
              Parents : {{ selectedEntity.attributes.family.parents.join(', ') }}
            </div>
            <div v-if="selectedEntity.attributes.family.siblings?.length > 0" class="ml-4">
              Frères et sœurs : {{ selectedEntity.attributes.family.siblings.join(', ') }}
            </div>
            <div v-if="selectedEntity.attributes.family.spouse?.length > 0" class="ml-4">
              Époux/Épouse : {{ selectedEntity.attributes.family.spouse.join(', ') }}
            </div>
          </div>
          <div v-if="selectedEntity.attributes?.stories?.length > 0" class="mb-3">
            <strong>Histoires célèbres :</strong>
            <ul>
              <li v-for="(story, index) in selectedEntity.attributes.stories" :key="index">{{ story }}</li>
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

  /*
     Variables réactives
  */
  const nom = ref('') // Texte de recherche
  const store = useAppStore() // Accès au store Pinia pour les données et favoris
  const dialogOpen = ref(false) // Etat de la modale
  const selectedEntity = ref(null) // Entité actuellement sélectionnée

  /*
   Fonction pour ouvrir la modale
  */
  function openDialog (entity) {
    selectedEntity.value = entity
    dialogOpen.value = true
  }

  /*
   Chargement des données au montage
  */
  onMounted(async () => {
    await store.fetchGodsJSON()
    await store.fetchHeroesJSON()
    await store.fetchTitansJSON()
    await store.fetchMonstersJSON()
  })

  /*
   Filtrage dynamique selon la recherche
  */
  const filteredGods = computed(() =>
    store.gods.filter(god => god.name.toLowerCase().includes(nom.value.toLowerCase())),
  )
  const filteredHeroes = computed(() =>
    store.heroes.filter(hero => hero.name.toLowerCase().includes(nom.value.toLowerCase())),
  )
  const filteredTitans = computed(() =>
    store.titans.filter(titan => titan.name.toLowerCase().includes(nom.value.toLowerCase())),
  )
  const filteredMonsters = computed(() =>
    store.monsters.filter(monster => monster.name.toLowerCase().includes(nom.value.toLowerCase())),
  )
</script>

<style scoped>
header {
  margin-bottom: 40px;
}
.bouton-menu, .bouton-descendance, .bouton-favori {
  margin-right: 10px;
  margin-top: 20px;
}
.recherche {
  margin-top: 20px;
  margin-bottom: 30px;
}
h1, h2 {
  margin-bottom: 20px;
}
</style>
