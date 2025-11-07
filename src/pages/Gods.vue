<template>
  <v-text-field
    v-model="nom"
    class="mb-4"
    label="Recherche"
    placeholder="Chercher une divinité..."
    type="text"
  />
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

    <!-- Dieux -->
    <div v-if="filteredGods.length > 0">
      <h2 class="mt-4">Dieux :</h2>
      <v-row class="mb-6">
        <v-col
          v-for="god in filteredGods"
          :key="god.id"
          class="god-card mb-2"
          md="3"
        >
          <v-card>
            <v-card-title>{{ god.name }}</v-card-title>
<!--            <v-img alt="Image de dieux grec" :src="god.image" />-->
            <v-card-text> {{ god.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="text-center py-6">
      Aucun dieu trouvé...
    </div>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const store = useAppStore()

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

<style>
header {
  margin-top: 40px;
  margin-bottom: 40px;

  .bouton-menu, .bouton-descendance {
    margin-right: 10px;
  }
}
</style>
