<template>
<AppBar/>
<v-main>
    <router-view />
</v-main>
</template>

<script>
import AppBar from "@/components/add-atleta-page/AppBar.vue";

export default {
    name: "AddAtleta",
    components: {AppBar}
}
</script>

<style scoped>

</style>
  