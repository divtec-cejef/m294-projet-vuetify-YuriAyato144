<template>
  <!-- Barre de recherche dynamique -->
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
  </v-container>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const store = useAppStore()

  // Chargemenr de toutes les données depuis les JSON
  onMounted(async () => {
    await store.fetchGodsJSON()
    await store.fetchHeroesJSON()
    await store.fetchTitansJSON()
    await store.fetchMonstersJSON()
  })

  const filteredGods = computed(() =>
    store.gods.filter(god =>
      god.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )
  // Filtre réactif pour les héros-->
  const filteredHeroes = computed(() =>
    store.heroes.filter(heroe =>
      heroe.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )
  // Filtre réactif pour les titans-->
  const filteredTitans = computed(() =>
    store.titans.filter(titan =>
      titan.name.toLowerCase().includes(nom.value.toLowerCase()),
    ),
  )
  // Filtre réactif pour les monstres-->
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

  .bouton-menu {
    margin-right: 10px;
  }
}
</style>
