<template>
    <div class="cadastro-de-atleta">
      <!-- Barra Superior -->
      <div class="top-bar">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1>Cadastro de Atleta</h1>
      </div>
  
      <!-- Formulário de Cadastro -->
      <div class="form-container">
        <label for="foto">Foto:</label>
        <v-btn outlined color="primary">Clique para inserir</v-btn>
  
        <v-text-field label="Nome do Atleta" placeholder="Ex: Pedro Henrique"></v-text-field>
        <v-text-field
          label="Data de Nascimento"
          placeholder="Ex: 12/12/1202"
        ></v-text-field>
        <v-text-field label="CPF" placeholder="Ex: 123.456.789-00"></v-text-field>
        <v-text-field
          label="Telefone"
          placeholder="Ex: (99) 9 9999-9999"
        ></v-text-field>
        <v-text-field label="Endereço" placeholder="Rua, Bairro, Número"></v-text-field>
  
        <v-checkbox label="Mora com os pais"></v-checkbox>
        <v-text-field label="Posição" placeholder="Rua, Bairro, Número"></v-text-field>
  
        <!-- Botões de Responsável -->
        <div class="responsavel-container">
          <v-btn outlined color="primary">Criar novo responsável</v-btn>
          <v-btn outlined color="secondary">Alocar a responsável existente</v-btn>
        </div>
      </div>
    </div>
     <!-- Rodapé com ícones de navegação -->
     <v-bottom-navigation
        fixed
        grow
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
        this.$router.go(-1); // Volta para a página anterior
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
    },
  };
  </script>
  
  <style scoped>
  .cadastro-de-atleta {
    display: flex;
    flex-direction: column;
    padding: 16px;
    background-color: #ffffff;
    height: 100vh;
  }
  
  .top-bar {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 0;
  }
  
  h1 {
    font-size: 20px;
    margin: 0;
    flex-grow: 1;
    text-align: center;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
  }

  .responsavel-container {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-top: 16px;
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
  