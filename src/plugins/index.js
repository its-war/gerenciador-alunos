// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import FirebaseCRUD from "@/plugins/FirebaseCRUD"

function install(app){
  app.provide('firebase', FirebaseCRUD)
}

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(install)
}
