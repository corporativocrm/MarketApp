<template>
  <v-app>
    <Iniciando/>
    <div>
      <v-main v-if="session == null">
        <Login/>
      </v-main>
      <v-main v-else>
        <Header/>
        <Principal/>
      </v-main>
    </div>
    <Mensaje/>
  </v-app>
</template>

<script>
// eslint-disable-next-line import/extensions
import { mapState } from 'vuex';
// eslint-disable-next-line import/extensions
import Iniciando from './components/widget/Iniciando';
// eslint-disable-next-line import/extensions
import {
  DB,
} from './plugins/database';

// eslint-disable-next-line import/extensions
const Login = () => import('./components/pages/Login');
// eslint-disable-next-line import/extensions
const Mensaje = () => import('./components/widget/Mensaje');
// eslint-disable-next-line import/extensions
const Header = () => import('./layouts/Header');
// eslint-disable-next-line import/extensions
const Principal = () => import('./components/Principal');

export default {
  name: 'App',
  data: () => ({
    session: null,
  }),
  components: {
    Header, Iniciando, Principal, Login, Mensaje,
  },
  computed: {
    ...mapState('WebServices', ['loading', 'preload']),
  },
  async mounted() {
    const isLogin = await DB.session.count();
    if (isLogin > 0) {
      this.session = await DB.session.get(1);
    } else {
      localStorage.clear();
      DB.delete().then(() => {
        DB.open();
      });
    }
  },
  watch: {
    session: {
      async handler(value) {
        if (value !== null) {
          this.$store.dispatch('StoreProfile/setProfile', value);
          this.$store.dispatch('StoreProfile/setLogin', true);
        } else {
          this.$store.dispatch('StoreProfile/reset');
        }
      },
    },
  },
};
</script>

<style>
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(../src/assets/font/MaterialIcons-Regular.eot); /* For IE6-8 */
  src: local('Material Icons'),
  local('MaterialIcons-Regular'),
  url(../src/assets/font/MaterialIcons-Regular.woff2) format('woff2'),
  url(../src/assets/font/MaterialIcons-Regular.woff) format('woff'),
  url(../src/assets/font/MaterialIcons-Regular.ttf) format('truetype');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

body {
  overflow: hidden;
}
</style>
