<template>
  <v-dialog v-model="isOpen" max-width="600">
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="attrs" v-on="on" />
    </template>

    <v-card>
      <v-card-title>{{ titan.name }}</v-card-title>
      <v-img alt="Image de titan" height="300" :src="titan.image" />
      <v-card-text>
        <p>{{ titan.description }}</p>
        <p v-if="titan.powers"><strong>Pouvoirs :</strong> {{ titan.powers }}</p>
        <p v-if="titan.origin"><strong>Origine :</strong> {{ titan.origin }}</p>
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
    titan: { type: Object, required: true },
  })

  const isOpen = ref(false)
</script>
