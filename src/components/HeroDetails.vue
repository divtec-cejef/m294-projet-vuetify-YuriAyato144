<template>
  <v-dialog v-model="isOpen" max-width="600">
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="attrs" v-on="on" />
    </template>

    <v-card>
      <v-card-title>{{ hero.name }}</v-card-title>
      <v-img alt="Image de héros" height="300" :src="hero.image" />
      <v-card-text>
        <p>{{ hero.description }}</p>
        <p v-if="hero.powers"><strong>Pouvoirs :</strong> {{ hero.powers }}</p>
        <p v-if="hero.origin"><strong>Origine :</strong> {{ hero.origin }}</p>
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
    hero: { type: Object, required: true },
  })

  const isOpen = ref(false)
</script>
