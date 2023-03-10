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
          <v-icon dark x-large>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{profile.name}}</v-list-item-title>
          <v-list-item-subtitle>{{profile.dni}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list>
      <v-list-item-group>
        <v-list-item
          @click="goHome()" style="height:40px">
          <v-list-item-title class="subtitle-1">
            <v-icon :color="profile.color"
            style="font-size:1.7rem;">mdi-home-outline</v-icon>
              <span class="ml-4">Inicio</span>
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-if="!catalogue && products.length"
          @click="openCatalogue()">
          <v-list-item-title class="subtitle-1">
            <v-icon :color="profile.color"
              style="font-size:1.7rem;"> mdi-star-outline</v-icon>
              <span class="ml-4">Catalogo</span>
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title @click="openMessage()" class="subtitle-1">
            <v-badge
              v-if="countMessage() > 0"
              :content="countMessage()"
              :color="profile.color"
              overlap>
              <v-icon :color="profile.color">mdi-message-outline</v-icon>
            </v-badge>
            <v-icon v-else :color="profile.color">mdi-message-outline</v-icon>
              <span class="ml-4">Mensajes</span>
          </v-list-item-title>
        </v-list-item>

        <v-list-item class="mt-3" style="height:40px">
          <v-list-item-title @click="openFavorite()" class="subtitle-1">
            <v-badge
              v-if="favorites.length > 0"
              :content="countFavorites()"
              :color="profile.color"
              overlap>
              <v-icon :color="profile.color">mdi-heart-outline</v-icon>
            </v-badge>
            <v-icon v-else :color="profile.color">mdi-heart-outline</v-icon>
              <span class="ml-4">Favoritos</span>
          </v-list-item-title>
        </v-list-item>

        <v-list-item class="mt-2">
          <v-list-item-title @click="openShopCart()" class="subtitle-1">
            <v-badge
              v-if="qtyCartshop > 0"
              :content="qtyCartshop"
              :color="profile.color"
              overlap>
              <v-icon :color="profile.color">mdi-cart-outline</v-icon>
            </v-badge>
            <v-icon v-else :color="profile.color">mdi-cart-outline</v-icon>
              <span class="ml-4">Mi carrito</span>
          </v-list-item-title>
        </v-list-item>

        <v-list-item style="height:30px">
          <v-list-item-title class="subtitle-1" @click="openOrders()">
            <v-icon :color="profile.color">mdi-gift-outline</v-icon>
            <span class="ml-4">Mis compras</span>
          </v-list-item-title>
        </v-list-item>

        <v-list-item class="mt-3" style="height:40px">
          <v-list-item-title @click="Logout()" class="subtitle-1">
            <v-icon :color="profile.color">mdi-logout-variant</v-icon>
              <span class="ml-4">Cerrar Sesi??n</span>
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
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
    ...mapState('messenger', ['messageList']),
    ...mapState('catalogue', ['products', 'favorites', 'orders']),
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
    ...mapActions('catalogue', ['hideFormDetail']),
    ...mapMutations('menu', [
      'HOME',
      'CATALOGUE',
      'SHOPCART',
      'MESSAGE',
      'ORDERS',
      'FAVORITE',
    ]),

    Logout() {
      this.closeProfile = true;
      localStorage.setItem('alert-condition-param-path', 'logout');
      this.alertCondition('??Seguro que desea cerrar sesi??n?');
    },

    countMessage() {
      const qty = this.messageList.filter((e) => parseInt(e.view, 10) === 0).length;
      return qty > 99 ? '+99' : qty;
    },

    countFavorites() {
      const qty = this.favorites.length;
      return qty > 99 ? '+99' : qty;
    },

    control() {
      this.showDrawer = false;
      this.hideFormDetail();
    },

    goHome() {
      this.HOME(true);
      this.control();
    },

    openCatalogue() {
      this.CATALOGUE(true);
      this.control();
    },

    openMessage() {
      this.MESSAGE(true);
      this.control();
    },

    openShopCart() {
      this.SHOPCART(true);
      this.control();
    },

    openOrders() {
      this.ORDERS(true);
      this.control();
    },

    openFavorite() {
      this.FAVORITE(true);
      this.control();
    },

    async alertCondition(message) {
      this.control();
      this.$store.dispatch('mensaje/condition', message);
    },
  },
  async beforeMount() {
    // --
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
      async handler() {
        const resp = await this.$store.dispatch('mensaje/getResponse', 'logout');
        if (resp) {
          // BORRAR TODO
          localStorage.clear();
          DB.delete();
          localStorage.removeItem('alert-condition-param-path');
          window.location.reload();
        } else if (resp !== null) {
          localStorage.removeItem('alert-condition-param-path');
        }
      },
    },
  },
};
</script>
