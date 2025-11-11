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
    <v-dialog v-model="dialogOpen" max-width="600">
      <v-card v-if="selectedMonster">
        <v-card-title>{{ selectedMonster.name }}</v-card-title>
        <v-img height="300" :src="selectedMonster.image" />
        <v-card-text>
          <p>{{ selectedMonster.description }}</p>
          <p v-if="selectedMonster.powers"><strong>Pouvoirs :</strong> {{ selectedMonster.powers }}</p>
          <p v-if="selectedMonster.origin"><strong>Origine :</strong> {{ selectedMonster.origin }}</p>
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

<style>
header {
  margin-top: 40px;
  margin-bottom: 40px;
}

.bouton-menu, .bouton-descendance, .bouton-favori {
  margin-right: 10px;
}
</style>
