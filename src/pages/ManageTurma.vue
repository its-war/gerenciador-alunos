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
          <h3>Gerenciar Turma</h3>
        </v-col>
        <v-col class="d-flex justify-end">

        </v-col>
      </v-row>

      <!-- Seletor de Turmas -->
      <v-row>
        <v-col cols="12" md="6">
          <v-select label="Selecione a Turma" v-model="selectedTurma" :items="turmas.map((turma) => turma.nome)"
            outlined dense style="min-width: 100%;"></v-select>
        </v-col>
      </v-row>

      <!-- Exibição das Informações da Turma -->
      <v-row v-if="turmaSelecionada" class="mt-6">
        <v-col cols="12">
          <v-card class="pa-6 turma-card">
            <v-card-text>
              <p class="card"><strong>Turno:</strong> {{ turmaSelecionada.turno }}</p>
              <p class="card"><strong>Horário:</strong> {{ turmaSelecionada.horario }}</p>
              <p class="card">
                <strong>Número de Alunos:</strong> {{ turmaSelecionada.numeroAlunos }}
              </p>
              <p class="card"><strong>Professor:</strong> {{ turmaSelecionada.professor }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Mensagem de "Nenhuma turma selecionada" -->
      <v-row v-else class="mt-6">
        <v-col>
          <p>Selecione uma turma para ver suas informações.</p>
        </v-col>
      </v-row>

      <!-- Rodapé com ícones de navegação -->
      <v-bottom-navigation fixed grow style="height: 7.5%; position: fixed;">
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

        <v-btn @click="goToConfigs">
          <span>Opções</span>
          <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-btn @click="goToPerfil">
          <span>Perfil</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>

      </v-bottom-navigation>


      <!-- Área de clique fora -->
      <div v-if="showManagePanel || showAddPanel" class="overlay" @click="closePanels"></div>

      <!-- Painel de Gerenciamento -->
      <div v-if="showManagePanel" class="manage-panel">
        <v-btn @click="goToManageAtleta">Gerenciar Alunos</v-btn>
        <v-btn @click="goToManageTurma">Gerenciar Turmas</v-btn>
      </div>

      <!-- Painel de Adição -->
      <div v-if="showAddPanel" class="add-panel">
        <v-btn @click="goToAddAtleta">Adicionar Aluno</v-btn>
        <v-btn @click="goToAddTurma">Adicionar Turma</v-btn>
      </div>

    </v-container>
  </v-app>
</template>

<script>
import FirebaseCRUD from '@/plugins/FirebaseCRUD';

export default {
  data() {
    return {
      showManagePanel: false,
      showAddPanel: false,
      // Lista de turmas com suas informações
      turmas: [],

      // Nome da turma selecionada
      selectedTurma: null,

      firebase: new FirebaseCRUD('turmas'),
    };
  },
  computed: {
    // Retorna a turma selecionada com base no nome
    turmaSelecionada() {
      return this.turmas.find((turma) => turma.nome === this.selectedTurma);
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push({ name: "Home" });
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
    goToAddResponsavel() {
      this.$router.push({ name: "AddResponsavel" });
    },
    goToAddAtleta() {
      this.$router.push({ name: "AddAtleta" });
    },
    goToAddTurma() {
      this.$router.push({ name: "AddTurma" });
    },
    goToManageAtleta() {
      this.$router.push({ name: "ManageAtleta" });
    },
    goToManageTurma() {
      this.$router.push({ name: "ManageTurma" });
    },
    goToConfigs() {
      this.$router.push({ name: "Configs" });
    },
    goToPerfil() {
      this.$router.push({ name: "Perfil" });
    }
  },
  async created() {
    this.turmas = await this.firebase.getAll();
  }
};
</script>

<style scoped>
.turma-card {
  max-width: 100%;
  height: 60vh;
  font-size: 18px;
  background-color: rgba(33, 33, 33, 0.9);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .card {
    font-size: 3vh;
    margin-bottom: 10%;
  }
}

/* Ajustes no título */
h3 {
  margin: 0;
  font-size: 24px;
}

/* Centraliza o select */
.v-select {
  max-width: 300px;
}

#app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.v-app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.v-container {
  flex: 1;
  overflow-y: auto;
}

.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);

  .v-btn {
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

.manage-panel,
.add-panel {
  position: fixed;
  bottom: 7.5%;
  left: 0;
  width: 100%;
  height: 10vh;
  background-color: rgba(33, 33, 33, 255);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 20;

  .v-btn {
    width: 40%;
    text-transform: none;
    font-size: 85% !important;
    background-color: rgba(69, 69, 69, 255);
  }
}
</style>