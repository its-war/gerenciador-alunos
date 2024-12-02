<template>
    <v-app>
      <v-container>
        <!-- Cabeçalho -->
        <v-row class="mb-6 d-flex align-center">
          <v-col class="d-flex justify-start">
            <v-btn icon @click="goBack">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-center" style="flex: 60%;">
            <h3>Cadastro de Responsável</h3>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-icon>mdi-home</v-icon>
          </v-col>
        </v-row>
  
        <!-- Formulário -->
        <v-row justify="center">
          <v-text-field
            class="mb-4"
            label="Nome do Responsável"
            placeholder="Ex: Maria Fernanda"
            outlined
            dense
            style="width: 90%;"
            v-model="responsavel.nome"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="CPF"
            placeholder="Ex: 123.456.789-00"
            outlined
            dense
            style="width: 90%;"
            v-model="responsavel.cpf"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="Email"
            placeholder="Ex: mariafernanda2020@gmail.com"
            outlined
            dense
            style="width: 90%;"
            v-model="responsavel.email"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="Telefone"
            placeholder="Ex: (99) 9 9999-9999"
            outlined
            dense
            style="width: 90%;"
            v-model="responsavel.telefone"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="Endereço"
            placeholder="Ex: Rua Almeida Alves, 5066"
            outlined
            dense
            style="width: 90%;"
            v-model="responsavel.endereco"
          ></v-text-field>
        </v-row>
  
        <!-- Botões de Salvar e Cancelar -->
        <v-row justify="center" class="mt-4">
          <v-btn 
            color="green" 
            dark 
            class="mx-2" 
            @click="saveAction" 
            style="width: 120px; text-transform: none;">
            Salvar
          </v-btn>
          <v-btn 
            color="red" 
            dark 
            class="mx-2" 
            @click="cancelAction" 
            style="width: 120px; text-transform: none;">
            Cancelar
          </v-btn>
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
  import FirebaseCRUD from "@/plugins/FirebaseCRUD";

  export default {
    data() {
    return {
      showManagePanel: false,
      showAddPanel: false,
      responsavel: {
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        endereco: '',
      },
      responsaveisCrud: new FirebaseCRUD("responsaveis"), // Nome no Firestore
    };
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
      },
      async saveAction() {
        console.log("Ação de salvar executada!");
        try {
          // Monta o objeto pra salvar no Firestore
          const responsavelData = {
            nome: this.responsavel.nome,
            cpf: this.responsavel.cpf,
            email: this.responsavel.email,
            telefone: this.responsavel.telefone,
            endereco: this.responsavel.endereco,
          };

          // Chamar o método save
          const savedData = await this.responsaveisCrud.save(responsavelData);

          console.log("Responsável salvo com sucesso:", savedData);
          this.$router.go(-1); // Voltar para a página anterior após salvar
        } catch (error) {
          console.error("Erro ao salvar responsável:", error);
        }
        // Adicione a lógica para salvar os dados aqui
      },
      cancelAction() {
        console.log("Ação de cancelar executada!");
        // Lógica para cancelar ou voltar para a página anterior
        this.$router.go(-1); // Exemplo: voltar
      },
    },
  };
  </script>
  
  <style scoped>
.v-container {
  padding-top: 20px;
  min-height: 10vh;
}

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
    width: 40%;
    font-size: 85%;
    background-color: rgba(69,69,69,255);
  }
}
</style>
  