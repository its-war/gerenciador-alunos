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
            <h3>Registro de Turma</h3>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-icon>mdi-home</v-icon>
          </v-col>
        </v-row>
  
        <!-- Formulário -->
        <v-row justify="center">
            <v-select
                class="mb-4"
                label="Turnos"
                v-model="selectedTurno"
                :items="turnos"
                outlined
                dense
                style="width: 90%;"
            ></v-select>
          <v-text-field
            class="mb-4"
            label="Horário"
            placeholder="Ex: 09:00"
            outlined
            dense
            style="width: 90%;"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="Numero de Alunos"
            placeholder="Ex: 20"
            outlined
            dense
            style="width: 90%;"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="Professor"
            placeholder="Ex: Sérgio Carlos"
            outlined
            dense
            style="width: 90%;"
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
        selectedTurno: null, 
        turnos: ["Manhã", "Tarde", "Noite"], 
        showManagePanel: false,
        showAddPanel: false
        };
    },
    methods: {
      goBack() {
        console.log("Voltar clicado");
        // Lógica para voltar à página anterior
        this.$router.go(-1);
      },
      saveAction() {
        console.log("Ação de salvar executada!");
        // Adicione a lógica para salvar os dados aqui
      },
      cancelAction() {
        console.log("Ação de cancelar executada!");
        // Lógica para cancelar ou voltar para a página anterior
        this.$router.go(-1); // Exemplo: voltar
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
        goToAddTurma() {
        this.$router.push({ name: "AddTurma" });
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
  