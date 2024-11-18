<template>
<AddBar/>
<v-main>
    <router-view />
</v-main>
</template>

<script>
import AddBar from "@/components/add-atleta-page/AddBar.vue";

export default {
    name: "AddAtleta",
    components: {AddBar}
}
</script>

<style scoped>

</style>
  