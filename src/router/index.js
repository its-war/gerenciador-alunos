import { createRouter, createWebHistory } from 'vue-router'

// Routes Components
import HomePage from "@/pages/HomePage.vue";
import InicioComponent from "@/components/home-page/InicioComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomePage,
      children: [
        {
          path: "",
          name: "Home",
          component: InicioComponent
        }
      ]
    }
  ]
})

export default router
