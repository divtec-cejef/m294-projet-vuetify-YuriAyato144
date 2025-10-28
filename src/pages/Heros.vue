<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="nom"
          label="Recherche"
          placeholder="Chercher un héro..."
          type="text"
          @input="rechercher"
        />
        <a href="Heros.vue">Héros</a>
      </v-col>
    </v-row>
    <v-row>
      <h2>Héros :</h2>
      <v-col
        v-for="hero in heroes"
        :key="hero.id"
        class="hero-card"
      >
        <p>{{ hero.name }}</p>
      </v-col>
    </v-row>
    <h2>Titans :</h2>
    <v-col
      v-for="titan in store.titans"
      :key="titan.id"
      class="titan-card"
    >
      <p>{{ titan.name }}</p>
    </v-col>

    <h2>Monstres :</h2>
    <v-col
      v-for="monster in store.monsters"
      :key="monster.id"
      class="monster-card"
    >
      <p>{{ monster.name }}</p>
    </v-col>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const heroes = ref([])
  const store = useAppStore()

  function rechercher () {
    heroes.value = store.heroes.filter(heroe =>
      heroe.name.toLowerCase().includes(nom.value.toLowerCase()) || nom.value === '')
  }

  // Exécution initiale
  rechercher()
</script>
