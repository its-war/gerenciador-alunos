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
          <h3>Gerenciar Alunos</h3>
        </v-col>
        <v-col class="d-flex justify-end">

        </v-col>
      </v-row>

      <!-- Seletor de Turmas -->
      <v-row>
        <v-col cols="12" md="6">
          <v-select label="Selecione a Turma" v-model="selectedTurma" :items="turmas" outlined dense
            style="min-width: 100%;" item-title="nome" item-value="id"
            @update:modelValue="listAlunosPorTurma"></v-select>
        </v-col>
      </v-row>

      <!-- Lista de Alunos -->
      <v-row v-if="selectedTurma && alunosFiltrados.length" class="mt-6">
        <v-col v-for="aluno in alunosFiltrados" :key="aluno.id" cols="12" md="6">
          <v-card class="pa-4 d-flex flex-column">
            <!-- Foto do Aluno -->
            <v-img :src="aluno.foto" alt="Foto do aluno" width="120" class="mb-4" contain></v-img>

            <!-- Informações do Aluno -->
            <v-card-text>
              <p><strong>Nome:</strong> {{ aluno.nome }}</p>
              <p>
                <strong>Data de Nascimento:</strong>
                {{ aluno.dataNascimento }}
              </p>
              <p>
                <strong>CPF:</strong>
                {{ formatarCPF(aluno.cpf) }}
              </p>
              <p>
                <strong>Telefone:</strong>
                {{ aluno.telefone }}
              </p>
              <p>
                <strong>Endereço:</strong>
                {{ aluno.endereco }}
              </p>
              <p>
                <strong>Responsável:</strong>
                {{ aluno.nomeResponsavel }}
              </p>
            </v-card-text>

            <!-- Botões de Modificar e Excluir -->
            <v-card-actions class="d-flex justify-end">
              <v-btn color="primary" @click="modificarAluno(aluno.id)">
                <v-icon left>mdi-pencil</v-icon>
                Modificar
              </v-btn>
              <v-btn color="error" @click="excluirAluno(aluno.id)">
                <v-icon left>mdi-delete</v-icon>
                Excluir
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Mensagem de "Nenhum aluno encontrado" -->
      <v-row v-else class="mt-6">
        <v-col>
          <p v-if="selectedTurma">Nenhum aluno encontrado para esta turma.</p>
          <p v-else>Selecione uma turma para ver os alunos.</p>
        </v-col>
      </v-row>

      <div style="height: 7.5%;"></div>
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
      // Lista de turmas
      turmas: [],

      // Turma selecionada
      selectedTurma: null,

      // Lista de alunos
      alunos: [],

      tFirebase: new FirebaseCRUD('turmas'),
      aFirebase: new FirebaseCRUD('atletas'),
    };
  },
  computed: {
    // Filtra os alunos com base na turma selecionada
    alunosFiltrados() {
      return this.alunos.filter(
        (aluno) => aluno.turma === this.selectedTurma
      );
    },
  },
  methods: {
    // Formata o CPF, ocultando os 3 primeiros e 5 últimos números
    formatarCPF(cpf) {
      return (
        cpf.slice(0, 3).replace(/\d/g, "*") +
        "." +
        cpf.slice(3, 6) +
        "." +
        cpf.slice(6, 9) +
        "-" +
        cpf.slice(-2).replace(/\d/g, "*")
      );
    },
    modificarAluno(id) {
      // Lógica para modificar as informações do aluno
      console.log("Modificar aluno com ID:", id);
      this.$router.push({ name: "EditAluno", params: { id } });
    },
    excluirAluno(id) {
      // Confirmação e exclusão do aluno
      if (confirm("Você tem certeza que deseja excluir este aluno?")) {
        this.alunos = this.alunos.filter((aluno) => aluno.id !== id);
        alert("Aluno excluído com sucesso!");
      }
    },
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
    async listAlunosPorTurma() {
      this.alunos = await this.aFirebase.getAllWhere('turma', '==', this.selectedTurma);
    }
  },
  async created() {
    this.turmas = await this.tFirebase.getAll();
  }
};
</script>

<style scoped>
.v-card {
  display: flex;
  align-items: center;
}

.v-card-actions {
  padding-top: 10px;
}

.v-card-text p {
  margin: 5px 0;
}

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