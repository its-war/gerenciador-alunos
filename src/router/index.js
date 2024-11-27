import { createRouter, createWebHistory } from "vue-router";

// Routes Components
import HomePage from "@/pages/HomePage.vue";
import InicioComponent from "@/components/home-page/InicioComponent.vue";
import AddAtleta from "@/pages/AddAtleta.vue";
import AddResponsavel from "@/pages/AddResponsavel.vue";

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
      path: "/add-atleta", // Caminho para AddAtleta
      name: "AddAtleta",
      component: AddAtleta,
    },
    {
      path: "/add-responsavel", // Caminho para AddAtleta
      name: "AddResponsavel",
      component: AddResponsavel,
    },
  ],
});

export default router;
