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
      <v-btn class="bouton-divinite" color="primary" to="/gods"> Voir plus... </v-btn>
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
      <v-btn class="bouton-divinite" color="primary" to="/heroes"> Voir plus... </v-btn>
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
      <v-btn class="bouton-divinite" color="primary" to="/titans"> Voir plus... </v-btn>
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
      <v-btn class="bouton-divinite" color="primary" to="/monsters"> Voir plus... </v-btn>
    </div>

    <!-- Modale universelle -->
    <v-dialog v-model="dialogOpen" max-width="800">
      <v-card v-if="selectedEntity">
        <v-card-title class="text-h4">{{ selectedEntity.name }}</v-card-title>
        <v-img cover height="300" :src="selectedEntity.image" />

        <v-card-text>
          <!-- Description -->
          <p class="text-body-1 mb-4">{{ selectedEntity.description }}</p>

          <!-- Origine -->
          <div v-if="selectedEntity.attributes?.origin" class="mb-3">
            <strong>Origine :</strong> {{ selectedEntity.attributes.origin }}
          </div>

          <!-- Demeure -->
          <div v-if="selectedEntity.attributes?.abode" class="mb-3">
            <strong>Demeure :</strong> {{ selectedEntity.attributes.abode }}
          </div>

          <!-- Symboles -->
          <div v-if="selectedEntity.attributes?.symbols?.length > 0" class="mb-3">
            <strong>Symboles :</strong>
            <v-chip
              v-for="(symbol, index) in selectedEntity.attributes.symbols"
              :key="index"
              class="ma-1"
              size="small"
            >
              {{ symbol }}
            </v-chip>
          </div>

          <!-- Pouvoirs -->
          <div v-if="selectedEntity.attributes?.powers?.length > 0" class="mb-3">
            <strong>Pouvoirs :</strong>
            <ul>
              <li v-for="(power, index) in selectedEntity.attributes.powers" :key="index">
                {{ power }}
              </li>
            </ul>
          </div>

          <!-- Famille -->
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

          <!-- Histoires -->
          <div v-if="selectedEntity.attributes?.stories?.length > 0" class="mb-3">
            <strong>Histoires célèbres :</strong>
            <ul>
              <li v-for="(story, index) in selectedEntity.attributes.stories" :key="index">
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

<style scoped>
header {
  margin-bottom: 40px;
}

.bouton-menu, .bouton-descendance, .bouton-favori {
  margin-right: 10px;
  margin-top: 20px;
}

h1 {
  margin-bottom: 20px;
}

.bouton-divinite {
  margin-top: -20px;
  margin-bottom: 50px;
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
