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
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="CPF"
            placeholder="Ex: 123.456.789-00"
            outlined
            dense
            style="width: 90%;"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="Email"
            placeholder="Ex: mariafernanda2020@gmail.com"
            outlined
            dense
            style="width: 90%;"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="Telefone"
            placeholder="Ex: (99) 9 9999-9999"
            outlined
            dense
            style="width: 90%;"
          ></v-text-field>
          <v-text-field
            class="mb-4"
            label="Endereço"
            placeholder="Ex: Rua Almeida Alves, 5066"
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
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
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
  </style>
  