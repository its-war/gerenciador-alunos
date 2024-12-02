<template>
  <v-app>
    <v-container>
      <!-- Cabeçalho com o título e ícone da página -->
      <v-row class="mb-6 d-flex align-center">
        <v-col class="d-flex justify-start">
          <v-btn icon @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <h3>Pagina principal</h3>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-icon>mdi-home</v-icon>
        </v-col>
      </v-row>

      <!-- Botões principais -->
      <!-- Botões principais com altura maior e largura reduzida -->
      <v-row justify="center">
        <v-btn
          class="mb-6 button-custom"
          style="width: 70%; height: 70px; font-size: 18px;"
          outlined
        >Registro de Turma</v-btn>

        <v-btn
          class="mb-6 button-custom"
          style="width: 70%; height: 70px; font-size: 18px;"
          outlined
        >Gerenciador de Turmas</v-btn>

        <v-btn
          class="mb-6 button-custom"
          style="width: 70%; height: 70px; font-size: 18px;"
          outlined
        >Cadastro de Alunos</v-btn>

        <v-btn
          class="mb-6 button-custom"
          style="width: 70%; height: 70px; font-size: 18px;"
          outlined
        >Gerenciador de Alunos</v-btn>
      </v-row>

      <!-- Rodapé com ícones de navegação -->
      <v-bottom-navigation
        fixed
        grow
      >
        <v-btn @click="goHome">
          <span>Inicio</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn>
          <span>Gerenciador</span>
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>

        <v-btn>
          <span>Adicionar</span>
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn>
          <span>Configurações</span>
          <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-btn>
          <span>Perfil</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>

      </v-bottom-navigation>
    </v-container>
  </v-app>
</template>

<script>
export default {
  methods: {
    goBack() {
      // Lógica para voltar à página anterior
    },
    goHome() {
      // Lógica para ir à página inicial
    },
  },
};
</script>

<style scoped>
/* Estilos para ajustar a aparência no mobile */
.v-container {
  padding-top: 20px;
  min-height: 100vh;
}
a

h3 {
  margin: 0;
}

.v-btn {
  text-transform: none;
}

.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  width: 100%;

  .v-btn{
    min-width: 20% !important;
    max-width: 20% !important;
  }
}

</style>
