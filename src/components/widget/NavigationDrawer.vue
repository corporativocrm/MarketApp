<template>
  <v-navigation-drawer
    :app="true"
    v-model="showDrawer"
    absolute
    temporary
    style="z-index:10000"
  >

    <template v-slot:prepend>
      <v-list-item dark two-line :style='"background-color:"+profile.color'>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Jane Smith</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list nav dense>

      <v-list-item
        @click="goHome()">
        <v-list-item-title class="subtitle-1">
          <v-icon :color="profile.color"
           style="font-size:1.7rem;">mdi-home-outline</v-icon>
            Inicio
        </v-list-item-title>
      </v-list-item>

      <v-list-item v-if="!catalogue && products.length"
        @click="openCatalogue()">
        <v-list-item-title class="subtitle-1">
          <v-icon :color="profile.color"
            style="font-size:1.7rem;"> mdi-star-outline</v-icon>
            Catalogo
        </v-list-item-title>
      </v-list-item>

      <v-list-item class="mt-1">
        <v-list-item-title @click="openNotify()" class="subtitle-1">
          <v-badge
            v-if="dataNotifi.length > 0"
            :content="countNotify()"
            :color="profile.color"
            overlap>
            <v-icon :color="profile.color">mdi-message-outline</v-icon>
          </v-badge>
          <v-icon v-else :color="profile.color">mdi-message-outline</v-icon>
            Mensajes
        </v-list-item-title>
      </v-list-item>

      <v-list-item class="mt-4">
        <v-list-item-title class="subtitle-1">
          <v-icon :color="profile.color">mdi-heart-outline</v-icon>
            Favoritos
        </v-list-item-title>
      </v-list-item>

      <v-list-item class="mt-1">
        <v-list-item-title @click="openShopCart()" class="subtitle-1">
          <v-badge
            v-if="qtyCartshop > 0"
            :content="qtyCartshop"
            :color="profile.color"
            overlap>
            <v-icon :color="profile.color">mdi-cart-outline</v-icon>
          </v-badge>
          <v-icon v-else :color="profile.color">mdi-cart-outline</v-icon>
            Mi carrito
        </v-list-item-title>
      </v-list-item>

      <v-list-item class="mt-4">
        <v-list-item-title class="subtitle-1">
          <v-icon :color="profile.color">mdi-gift-outline</v-icon>
            Mis compras
        </v-list-item-title>
      </v-list-item>

      <v-list-item class="mt-3">
        <v-list-item-title @click="Logout()" class="subtitle-1">
          <v-icon :color="profile.color">mdi-logout-variant</v-icon>
            Cerrar Sesión
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line import/extensions
import { mapMutations, mapActions, mapState } from 'vuex';
// eslint-disable-next-line import/extensions
import { DB } from '../../plugins/database';

export default {
  name: 'NavigationDrawer',
  data: () => ({
    qtyCartshop: 0,
    closeProfile: false,
  }),
  computed: {
    ...mapState('menu', ['catalogue']),
    ...mapState('StoreProfile', ['profile']),
    ...mapState('navigationDrawer', ['drawer']),
    ...mapState('notifications', ['dataNotifi']),
    ...mapState('catalogue', ['products']),
    ...mapState('mensaje', ['value']),

    conditionLogout: {
      get() {
        return this.value;
      },
    },

    showDrawer: {
      get() { return this.drawer; },
      set(param) {
        this.$store.dispatch('navigationDrawer/setVisibilityDrawer', param);
      },
    },
  },
  methods: {
    ...mapActions('navigationDrawer', ['toggleDrawer']),
    ...mapMutations('menu', ['HOME', 'CATALOGUE', 'SHOPCART', 'MESSAGE']),

    Logout() {
      this.closeProfile = true;
      this.condition('¿Seguro que desea cerrar sesión?');
    },

    countNotify() {
      const qty = this.dataNotifi.filter((e) => e.view === false).length;
      return qty > 99 ? '+99' : qty;
    },

    goHome() {
      this.showDrawer = false;
      this.HOME(true);
    },

    openCatalogue() {
      this.showDrawer = false;
      this.CATALOGUE(true);
    },

    openNotify() {
      this.showDrawer = false;
      this.MESSAGE(true);
    },

    openShopCart() {
      this.showDrawer = false;
      this.SHOPCART(true);
    },

    condition(message) {
      this.showDrawer = false;
      this.$store.dispatch('mensaje/condition', message);
    },
  },

  watch: {
    showDrawer: {
      handler() {
        const list = localStorage.getItem('listCartShop');
        if (list != null) {
          const qty = JSON.parse(list).length;
          this.qtyCartshop = qty > 99 ? '+99' : qty;
        }
      },
    },
    conditionLogout: {
      handler(r) {
        if (r && this.closeProfile) {
          // BORRAR TODO
          localStorage.clear();
          DB.delete();
          window.location.reload();
        }
        this.closeProfile = false;
      },
    },
  },
};
</script>
