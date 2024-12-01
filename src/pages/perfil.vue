<template>
  <v-app>
    <v-container>
      <!-- Cabeçalho com título e ícone de configurações -->
      <v-row class="mb-6 d-flex align-center">
        <v-col class="d-flex justify-start">
          <v-btn icon @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <h3>Usuário</h3>
        </v-col>
        <v-col class="d-flex justify-end">
        </v-col>
      </v-row>

      <!-- Foto do Usuário -->
      <v-row class="d-flex justify-center">
        <v-avatar size="120">
          <v-img
            :src="user.photo"
            alt="Foto do Usuário"
            contain
          ></v-img>
        </v-avatar>
      </v-row>

      <!-- Caixa de Dados do Usuário -->
      <v-row class="mt-6">
        <v-col cols="12">
          <v-card class="pa-4">
            <p><strong>Nome:</strong> {{ user.name }}</p>
            <p><strong>Data de Nascimento:</strong> {{ user.birthDate }}</p>
            <p><strong>CPF:</strong> {{ formatCPF(user.cpf) }}</p>
            <p><strong>Telefone:</strong> {{ user.phone }}</p>
            <p><strong>Endereço:</strong> {{ user.address }}</p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Botão para Modificar Dados -->
      <v-row class="mt-4">
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="primary" @click="modifyData">
            Alterar Dados
          </v-btn>
        </v-col>
      </v-row>

      <!-- Rodapé com ícones de navegação -->
      <v-bottom-navigation
        fixed
        grow
        style="height: 7.5%; position: fixed;"
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
export default {
  data() {
    return {
      showManagePanel: false,
        showAddPanel: false,
      // Dados do usuário
      user: {
        photo: "https://via.placeholder.com/120",
        name: "João Silva",
        birthDate: "15/05/1990",
        cpf: "12345678901",
        phone: "(88) 98765-4321",
        address: "Rua das Flores, 123",
      },
    };
  },
  methods: {
    // Formata o CPF (apenas para exibição)
    formatCPF(cpf) {
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
    },
    // Simula a ação de modificar os dados
    modifyData() {
      alert("Função de alterar dados ainda não implementada!");
    },
    // Retorna à página anterior
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
};
</script>

<style scoped>
.v-avatar {
  margin-bottom: 20px;
}

.v-card {
  background-color: #212121;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.v-btn {
  text-transform: none;
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
      width: 40%;
      text-transform: none;
      font-size: 85% !important;
      background-color: rgba(69,69,69,255);
    }
  }
</style>
