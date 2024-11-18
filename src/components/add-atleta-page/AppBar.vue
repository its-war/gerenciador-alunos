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
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1); // Volta para a página anterior
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
  </style>
  