<template>
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
    </header>
  </v-container>
</template>

<script setup>

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
