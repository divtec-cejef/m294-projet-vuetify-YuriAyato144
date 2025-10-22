<template>
  <v-app>
    <v-btn @click="logData">Charger les ressources</v-btn>
    <router-view />
  </v-app>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

  // Charger les ressources au montage
  onMounted(() => {
    store.init()
    console.log('App mounted, store initialized')
  })

  function logData () {
    console.log(store.gods)
  }
</script>
