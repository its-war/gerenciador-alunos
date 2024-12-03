<script>
import FirebaseCRUD from "@/plugins/FirebaseCRUD";
export default {
  name: "AtletaResponsavel",
  props: {
    idResponsavel: String,
  },
  data: () => ({
    carregado: false,
    responsavel: null,
    firebase: new FirebaseCRUD('responsaveis'),
    loading: false,
  }),
  methods: {
    async carregarResponsavel() {
      this.loading = true;
      this.responsavel = await this.firebase.get(this.idResponsavel);
      this.loading = false;
      this.carregado = true;
    }
  }
}
</script>

<template>
  <v-btn class="text-none" color="success" size="x-small" v-if="!carregado" :loading="loading" @click="carregarResponsavel">Ver Responsável</v-btn>
  <p v-else>
    <strong v-if="responsavel">Responsável:</strong>
    {{ responsavel ? responsavel.nome : '' }}
  </p>
</template>

<style scoped>

</style>
