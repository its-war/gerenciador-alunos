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
            <h3>Cadastro de Atleta</h3>
          </v-col>
          <v-col class="d-flex justify-end">
            
          </v-col>
        </v-row>
  
        <!-- Formulário de Cadastro -->
        <v-row justify="center" style="margin-bottom: 20%;">
          <v-text-field
            label="Alocar a responsável existente"
            placeholder="CPF do Responsável. Ex: 123.456.789-00"
            outlined
            dense
            style="width: 90%;"
          ></v-text-field>
          <v-btn @click="goToAddResponsavel"
            class="mb-4"
            outlined
            style="width: 90%; text-align: left;"
          >
            Criar novo responsável
          </v-btn>
          <v-text-field
            class="mb-4"
            label="Nome do Atleta"
            placeholder="Ex: Pedro Henrique"
            outlined
            dense
            style="width: 90%;"
            v-model="atleta.nome"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="Data de Nascimento"
            placeholder="Ex: 12/12/1202"
            outlined
            dense
            style="width: 90%;"
            v-model="atleta.dataNascimento"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="CPF"
            placeholder="Ex: 123.456.789-00"
            outlined
            dense
            style="width: 90%;"
            v-model="atleta.cpf"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="Telefone"
            placeholder="Ex: (99) 9 9999-9999"
            outlined
            dense
            style="width: 90%;"
            v-model="atleta.telefone"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="Endereço"
            placeholder="Rua, Bairro, Número"
            outlined
            dense
            style="width: 90%;"
            v-model="atleta.endereco"
          ></v-text-field>
          <v-checkbox
            class="mb-4"
            label="Mora com os pais"
            style="width: 90%;"
            v-model="atleta.moraComPais"
          ></v-checkbox>
          <v-text-field
            class="mb-4"
            label="Posição"
            placeholder="Ex: Atacante"
            outlined
            dense
            style="width: 90%;"
            v-model="atleta.posicao"
          ></v-text-field>
          <h3 class="mb-4" style="width: 90%;">Foto do Atleta</h3>
          <v-btn
            class="mb-4"
            outlined
            style="width: 90%; text-align: left;"
          >
            Clique para inserir Foto
          </v-btn>
          <v-btn 
            color="green" 
            dark 
            class="mx-2" 
            @click="saveAction" 
            style="width: 30%; text-transform: none; font-size: 95%">
            Salvar
          </v-btn>
          <v-btn 
            color="red" 
            dark 
            class="mx-2" 
            @click="cancelAction" 
            style="width: 30%; text-transform: none; font-size: 95%">
            Cancelar
          </v-btn>
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
  import FirebaseCRUD from "@/plugins/FirebaseCRUD"
  export default {
    data() {
      return {
        showManagePanel: false,
        showAddPanel: false,
        atleta: {
          nome: "",
          dataNascimento: "",
          cpf: "",
          telefone: "",
          endereco: "",
          posicao: "",
          moraComPais: false,
        },
        atletasCrud: null, // Instância do FirebaseCRUD
      };
    },
    created() {
        this.atletasCrud = new FirebaseCRUD("atletas"); // Nome no Firestore
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
      },
      cancelAction() {
        console.log("Ação de cancelar executada!");
        // Lógica para cancelar ou voltar para a página anterior
        this.$router.go(-1); // Exemplo: voltar
      },
      async saveAction() {
        try {
        // Verifica se o CPF do responsável está preenchido, caso contrário, criará um novo responsável
        if (this.atleta.responsavelCpf) {
          console.log("Responsável já alocado:", this.atleta.responsavelCpf);
        } else {
          console.log("Responsável não alocado. Navegar para cadastro.");
          // Navegar para a página de cadastro do responsável
          this.goToAddResponsavel();
          return;
        }

        // Salvar dados do atleta no Firestore
        const response = await this.atletasCrud.save(this.atleta);
        console.log("Atleta salvo com sucesso:", response);
        
        // Navegar de volta para a página inicial após salvar
        this.$router.push({ name: "Home" });
        } catch (error) {
          console.error("Erro ao salvar atleta:", error);
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
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
  