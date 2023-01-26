<template>
  <v-card
    v-if="!loading && !preload"
    class="mx-auto overflow-hidden"
    style="position:fixed;top:0;width:100%;z-index:9999;border-radius:0px;"
    height="50">

    <v-app-bar :color="profile.color" dark prominent>
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <div v-if="showCaption"
        class="title ml-2 mt-2">
        {{textCaption}}
      </div>
      <v-text-field
          v-if="!showCaption"
          v-model="search"
          style="margin:2px 2px auto 8px;"
          label="Buscar producto"
          type="search"
          hide-details rounded dense solo-inverted
          prepend-inner-icon="mdi-magnify"
          :append-icon="search.trim().length ? 'mdi-close' : ''"
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
    ...mapState('menu', ['showDialogMessage', 'shopcart']),
    ...mapState('StoreProfile', ['profile']),
    ...mapState('WebServices', ['preload', 'loading']),

    showCaption: {
      get() {
        return this.showDialogMessage || this.shopcart;
      },
    },

    textCaption: {
      get() {
        if (this.showDialogMessage) return 'Mensajes';
        if (this.shopcart) return 'Mi carrito';
        return '';
      },
    },
  },
  methods: {
    ...mapMutations('menu', ['CATALOGUE']),
    ...mapActions('navigationDrawer', ['toggleDrawer']),

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },

    query() {
      if (this.search.trim().length >= 3) {
        this.$store.dispatch('catalogue/QuerySearch', { query: this.search, filters: null });
        this.CATALOGUE(true);
      }
    },

    clear() {
      this.search = '';
      this.$store.dispatch('catalogue/QuerySearch', { query: '', filters: null });
      this.CATALOGUE(false);
    },
  },
};

</script>

<style>
.v-text-field--rounded > .v-input__control > .v-input__slot {
  padding: 1px 8px;
}
</style>
