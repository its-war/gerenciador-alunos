import { createRouter, createWebHistory } from "vue-router";

// Routes Components
import HomePage from "@/pages/HomePage.vue";
import InicioComponent from "@/components/home-page/InicioComponent.vue";
import AddAtleta from "@/pages/AddAtleta.vue";
import AddTurma from "@/pages/AddTurma.vue";
import AddResponsavel from "@/pages/AddResponsavel.vue";
import Configs from "@/pages/configs.vue";
import Perfil from "@/pages/perfil.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/", // Página inicial padrão
      component: HomePage,
      children: [
        {
          path: "",
          name: "Home",
          component: InicioComponent,
        },
      ],
    },
    {
      path: "/adicionar-atleta", // Caminho para AddAtleta
      name: "AddAtleta",
      component: AddAtleta,
    },
    {
      path: "/adicionar-responsavel", // Caminho para responsavel
      name: "AddResponsavel",
      component: AddResponsavel,
    },
    {
      path: "/adicionar-turma", // Caminho para AddTurma
      name: "AddTurma",
      component: AddTurma,
    },
    {
      path: "/configuration", // Caminho para configs
      name: "Configs",
      component: Configs,
    },
    {
      path: "/perfil", // Caminho para configs
      name: "Perfil",
      component: Perfil,
    }
  ],
});

export default router;
