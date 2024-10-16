<template>
  <AppBar/>

  <v-main>
    <router-view />
  </v-main>
</template>

<script>
import AppBar from "@/components/home-page/AppBar.vue";

export default {
  name: "HomePage",
  components: {AppBar}
}
</script>

<style scoped>

</style>
