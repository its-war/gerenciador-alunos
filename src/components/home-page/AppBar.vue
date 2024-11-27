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
        <v-col class="d-flex justify-center" style="flex: 60%;">
          <h3>Pagina principal</h3>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-icon>mdi-home</v-icon>
        </v-col>
      </v-row>

      <!-- Botões principais -->
      <v-row justify="center">
        <v-btn @click="goToAddResponsavel"
          class="mb-6 button-custom"
          style="width: 70%; height: 70px; font-size: 18px;"
          outlined
        >Registro de Turma</v-btn>

        <v-btn
          class="mb-6 button-custom"
          style="width: 70%; height: 70px; font-size: 18px;"
          outlined
        >Gerenciador de Turmas</v-btn>

        <v-btn @click="goToAddAtleta"
          class="mb-6 button-custom"
          style="width: 70%; height: 70px; font-size: 18px;"
          outlined
        >
          Cadastro de Alunos
        </v-btn>


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
        style="height: 7.5%;"
      >
        <v-btn @click="goHome">
          <span>Inicio</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn @click="toggleManagePanel">
          <span>Gerenciar</span>
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>

        <v-btn @click="toggleAddPanel">
          <span>Adicionar</span>
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-btn>
          <span>Opções</span>
          <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-btn>
          <span>Perfil</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>

      </v-bottom-navigation>


        <!-- Área de clique fora -->
      <div v-if="showManagePanel || showAddPanel" class="overlay" @click="closePanels"></div>

      <!-- Painel de Gerenciamento -->
      <div v-if="showManagePanel" class="manage-panel">
        <v-btn @click="manageStudents">Gerenciar Alunos</v-btn>
        <v-btn @click="manageClasses">Gerenciar Turmas</v-btn>
      </div>

      <!-- Painel de Adição -->
      <div v-if="showAddPanel" class="add-panel">
        <v-btn @click="addStudent">Adicionar Aluno</v-btn>
        <v-btn @click="addClass">Adicionar Turma</v-btn>
      </div>

    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showManagePanel: false,
      showAddPanel: false
    };
  },
  methods: {
    goBack() {
      // voltar à página anterior
    },
    goHome() {
      // ir à página inicial
    },
    toggleManagePanel() {
      this.showManagePanel = !this.showManagePanel;
      // Garante que apenas um painel estará aberto por vez
      if (this.showManagePanel) this.showAddPanel = false;
    },
    toggleAddPanel() {
      this.showAddPanel = !this.showAddPanel;
      // Garante que apenas um painel estará aberto por vez
      if (this.showAddPanel) this.showManagePanel = false;
    },
    closePanels() {
      // Fecha qualquer painel que estiver aberto
      this.showManagePanel = false;
      this.showAddPanel = false;
    },
    manageStudents() {
      console.log("Gerenciar Alunos clicado");
    },
    manageClasses() {
      console.log("Gerenciar Turmas clicado");
    },
    addStudent() {
      console.log("Adicionar Aluno clicado");
    },
    addClass() {
      console.log("Adicionar Turma clicado");
    },
    goToAddAtleta() {
      this.$router.push({ name: "AddAtleta" });
    },
    goToAddResponsavel() {
      this.$router.push({ name: "AddResponsavel" });
    },
  },
};
</script>

<style scoped>
.v-container {
  padding-top: 20px;
  min-height: 10vh;
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
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);

  .v-btn{
    min-width: 20% !important;
    max-width: 20% !important;
    padding: 0%;
  }
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 10; 
}

.manage-panel, .add-panel {
  position: fixed;
  bottom: 7.5%;
  left: 0;
  width: 100%;
  height: 10vh;
  background-color: rgba(33,33,33,255);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 20;

  .v-btn{
    background-color: rgba(69,69,69,255);
  }
}
</style>
