<template>
  <v-card
    v-if="!loading && !preload"
    class="mx-auto overflow-hidden"
    style="position:fixed;top:0;width:100%;z-index:9999;border-radius:0px;"
    height="50">

    <!--v-system-bar color="deep-purple darken-3"></v-system-bar-->
    <v-app-bar :color="profile.color" dark prominent>
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-text-field
          id="inputSearch"
          v-model="search"
          class="ml-4 mr-1 mt-1"
          hide-details
          label="Search"
          type="search"
          prepend-inner-icon="mdi-magnify"
          :append-icon="search.trim().length ? 'mdi-close' : ''"
          solo-inverted
          @change="query()"
          @click:append="clear()"
          ></v-text-field>
    </v-app-bar>
  </v-card>
</template>

<script>
// eslint-disable-next-line import/extensions
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data: () => ({
    idTimer: -1,
    search: '',
  }),
  computed: {
    ...mapState('StoreProfile', ['profile']),
    ...mapState('WebServices', ['preload', 'loading']),

  },
  methods: {
    ...mapMutations('menu', ['CATALOGUE']),
    ...mapActions('navigationDrawer', ['toggleDrawer']),

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },

    query() {
      if (this.search.trim().length >= 3) {
        this.$store.dispatch('catalogue/QuerySearch', this.search);
        this.CATALOGUE(true);
      }
    },

    clear() {
      this.search = '';
      this.$store.dispatch('catalogue/QuerySearch', '');
      this.CATALOGUE(false);
    },
  },
  mounted() {
    this.idTimer = setInterval(() => {
      const e = document.querySelector('#inputSearch');
      if (e !== null) {
        e.parentElement.parentElement.parentElement.style.minHeight = '35px';
        e.parentElement.parentElement.parentElement.style.borderRadius = '15px';
        clearInterval(this.idTimer);
      }
    }, 1000);
  },
};

</script>
