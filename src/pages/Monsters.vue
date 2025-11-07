<template>
  <!-- Barre de recherche dynamique avec les boutons -->
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

    <!-- Monstres -->
    <div v-if="filteredMonsters.length > 0">
      <h2 class="mt-4">Monstres :</h2>
      <v-row class="mb-6">
        <v-col
          v-for="monsters in filteredMonsters"
          :key="monsters.id"
          class="monster-card mb-2"
          md="3"
        >
          <v-card>
            <v-card-title>{{ monsters.name }}</v-card-title>
            <v-card-text> {{ monsters.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="text-center py-6">
      Aucun monstre trouvé...
    </div>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const store = useAppStore()

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
  text-align: center;
}
  .bouton-menu {
    margin-right: 10px;
  }

</style>
