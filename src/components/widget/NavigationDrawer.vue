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
      <v-list-item class="mt-2">
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

      <v-list-item class="mt-3">
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
import { mapActions, mapState } from 'vuex';
// eslint-disable-next-line import/extensions
import { DB } from '../../plugins/database';

export default {
  name: 'NavigationDrawer',
  computed: {
    ...mapState('StoreProfile', ['profile']),
    ...mapState('navigationDrawer', ['drawer']),
    ...mapState('notifications', ['dataNotifi']),

    showDrawer: {
      get() { return this.drawer; },
      set(param) {
        this.$store.dispatch('navigationDrawer/setVisibilityDrawer', param);
      },
    },
  },
  methods: {
    ...mapActions('navigationDrawer', ['toggleDrawer']),
    ...mapActions('menu', ['toggleFormModalNotify']),

    Logout() {
      // BORRAR TODO
      localStorage.clear();
      DB.delete();
      window.location.reload();
    },

    countNotify() {
      return this.dataNotifi.filter((e) => e.view === false).length;
    },

    openNotify() {
      if (this.dataNotifi.length > 0) {
        this.showDrawer = false;
        this.toggleFormModalNotify();
      }
    },
  },
};
</script>
