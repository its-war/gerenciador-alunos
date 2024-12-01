<template>
    <v-app>
      <v-container class="d-flex justify-center align-center" style="min-height: 100vh;">
        <v-card elevation="2" class="pa-4" width="400">
          <!-- Abas de Navegação (Entrar e Cadastrar-se) -->
          <v-row>
            <v-btn
              :color="activeTab === 'login' ? '#050505' : 'dark'"
              @click="switchTab('login')"
              class="flex-grow-1"
              outlined
            >
              Entrar
            </v-btn>
            <v-btn
              :color="activeTab === 'register' ? '#050505' : 'dark'"
              @click="switchTab('register')"
              class="flex-grow-1"
              outlined
            >
              Cadastre-se
            </v-btn>
          </v-row>
  
          <!-- Formulário de Login -->
          <v-form v-if="activeTab === 'login'" class="mt-4">
            <h3 class="text-center">Entre em uma conta existente</h3>
            <v-text-field
              v-model="loginForm.email"
              label="E-mail"
              type="email"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="loginForm.password"
              label="Senha"
              type="password"
              outlined
              dense
            ></v-text-field>
            <v-row class="mt-4">
              <v-btn color="green" class="flex-grow-1" @click="login">
                Entrar
              </v-btn>
              <v-btn color="red" class="flex-grow-1" @click="clearLoginForm">
                Cancelar
              </v-btn>
            </v-row>
          </v-form>
  
          <!-- Formulário de Cadastro -->
          <v-form v-if="activeTab === 'register'" class="mt-4">
            <h3 class="text-center">Crie uma nova conta</h3>
            <v-text-field
              v-model="registerForm.name"
              label="Nome Completo"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="registerForm.email"
              label="E-mail"
              type="email"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="registerForm.password"
              label="Senha"
              type="password"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="registerForm.confirmPassword"
              label="Confirmar Senha"
              type="password"
              outlined
              dense
            ></v-text-field>
            <v-row class="mt-4">
              <v-btn color="green" class="flex-grow-1" @click="register">
                Criar
              </v-btn>
              <v-btn color="red" class="flex-grow-1" @click="clearRegisterForm">
                Cancelar
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: "login", // Aba ativa (login ou register)
        // Dados do formulário de login
        loginForm: {
          email: "",
          password: "",
        },
        // Dados do formulário de cadastro
        registerForm: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      };
    },
    methods: {
      // Alterna entre as abas
      switchTab(tab) {
        this.activeTab = tab;
      },
      // Simula o login e navega para a homepage
      login() {
        alert("Login realizado com sucesso!");
        this.$router.push("/homepage"); // Alterar para a rota correta
      },
      // Simula o registro e navega para a homepage
      register() {
        if (this.registerForm.password !== this.registerForm.confirmPassword) {
          alert("As senhas não coincidem!");
          return;
        }
        alert("Conta criada com sucesso!");
        this.$router.push("/homepage"); // Alterar para a rota correta
      },
      // Limpa os campos do formulário de login
      clearLoginForm() {
        this.loginForm.email = "";
        this.loginForm.password = "";
      },
      // Limpa os campos do formulário de cadastro
      clearRegisterForm() {
        this.registerForm.name = "";
        this.registerForm.email = "";
        this.registerForm.password = "";
        this.registerForm.confirmPassword = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .v-btn {
    text-transform: none;
  }
  
  .v-card {
    background-color: #050505;
  }
  </style>
  