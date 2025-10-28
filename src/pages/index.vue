<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="nom"
          label="Recherche"
          placeholder="Chercher un dieux..."
          type="text"
          @input="rechercher"
        />
        <a href="Heros.vue">Héros</a>
      </v-col>
    </v-row>
    <v-row>
      <h2>Dieux :</h2>
      <v-col
        v-for="god in gods"
        :key="god.id"
        class="god-card"
      >
        <p>{{ god.name }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const nom = ref('')
  const gods = ref([])
  const store = useAppStore()

  function rechercher () {
    gods.value = store.gods.filter(god =>
      god.name.toLowerCase().includes(nom.value.toLowerCase()) || nom.value === '')
  }

  rechercher()
</script>
