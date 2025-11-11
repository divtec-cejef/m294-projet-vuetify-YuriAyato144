<template>
  <v-dialog v-model="isOpen" max-width="600">
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="attrs" v-on="on" />
    </template>

    <v-card>
      <v-card-title>{{ god.name }}</v-card-title>
      <v-img alt="Image de dieu" height="300" :src="god.image" />
      <v-card-text>
        <p>{{ god.description }}</p>
        <p><strong>Pouvoirs :</strong> {{ god.powers }}</p>
        <p><strong>Origine :</strong> {{ god.origin }}</p>
        <!-- ajoute d'autres champs si besoin -->
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="isOpen = false">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { defineProps, ref } from 'vue'

  const props = defineProps({
    god: {
      type: Object,
      required: true,
    },
  })

  const isOpen = ref(false)
</script>
