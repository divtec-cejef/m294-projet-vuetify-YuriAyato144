<template>
  <v-text-field
    v-model="nom"
    class="mb-4"
    label="Recherche"
    placeholder="Chercher une divinité, héros, titan ou monstre..."
    type="text"
    @input="rechercher"
  />
  <v-container>
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
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>

</script>
<style scoped lang="sass">

</style>
