<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="grey-darken-4"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>YouTube</v-toolbar-title>

        <v-spacer>
          <template v-if="$vuetify.display.mdAndUp">
            <v-text-field style="height: 55px; width: 800px;" label="Pesquisa" prepend-icon="$vuetify" class=""></v-text-field>
          </template>
        </v-spacer>

        
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list
          :items="paginas"
          class="border-b-lg"
        ></v-list>
        <v-list
          :items="explorar"
          class="border-b-lg"
        ></v-list>
        <v-list
          :items="opcoes"
        ></v-list>
      </v-navigation-drawer>

      <v-main style="height: auto;">
        <v-card-text>
          The navigation drawer will appear from the bottom on smaller size screens.
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      paginas: [
        {
          title: 'Início',
          value: 'home',
        },
        {
          title: 'Shorts',
          value: 'shorts',
        },
        {
          title: 'Inscrições',
          value: 'inscricoes',
        },
      ],
      explorar: [
        {
          title: 'Em Alta',
          value: 'foo',
        },
        {
          title: 'Shopping',
          value: 'bar',
        },
        {
          title: 'Musica',
          value: 'fizz',
        },
        {
          title: 'Filmes',
          value: 'buzz',
        },
        {
          title: 'Ao vivo',
          value: 'buzz',
        },
        {
          title: 'Jogos',
          value: 'buzz',
        },
        {
          title: 'Noticias',
          value: 'buzz',
        },
        {
          title: 'Esportes',
          value: 'buzz',
        },
        {
          title: 'Cursos',
          value: 'buzz',
        },
        {
          title: 'Podcasts',
          value: 'buzz',
        },
      ],
      opcoes: [
        {
          title: 'Configurações',
          value: 'foo',
        },
        {
          title: 'Historico de Denúncias',
          value: 'bar',
        },
        {
          title: 'Ajuda',
          value: 'fizz',
        },
        {
          title: 'Enviar Feed',
          value: 'buzz',
        },
      ],
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>
