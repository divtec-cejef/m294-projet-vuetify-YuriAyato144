<template>
  <v-dialog v-model="isOpen" max-width="600">
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="attrs" v-on="on" />
    </template>

    <v-card>
      <v-card-title>{{ monster.name }}</v-card-title>
      <v-img alt="Image de monstre" height="300" :src="monster.image" />
      <v-card-text>
        <p>{{ monster.description }}</p>
        <p v-if="monster.powers"><strong>Pouvoirs :</strong> {{ monster.powers }}</p>
        <p v-if="monster.origin"><strong>Origine :</strong> {{ monster.origin }}</p>
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
    monster: { type: Object, required: true },
  })

  const isOpen = ref(false)
</script>
