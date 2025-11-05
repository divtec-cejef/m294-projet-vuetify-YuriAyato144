<template>
  <v-text-field
    v-model="nom"
    class="mb-4"
    label="Recherche"
    placeholder="Chercher un héro..."
    type="text"
  />
  <v-container>

    <div class="text-center" />
    <v-btn color="primary" to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <!-- Héros -->
    <div v-if="filteredHeroes.length > 0">
      <h2 class="mt-4">Héros :</h2>
      <v-row class="mb-6">
        <v-col
          v-for="heroes in filteredHeroes"
          :key="heroes.id"
          class="heroe-card mb-2"
          md="3"
        >
          <v-card>
            <v-card-title>{{ heroes.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="text-center py-6">
      Aucun héro trouvé...
    </div>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const store = useAppStore()

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

<style scoped lang="sass">
</style>
