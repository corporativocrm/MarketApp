<template>
  <v-row justify="center">
    <v-dialog
      v-model="showForm"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar
          :color="profile.color"
          dark
          height="50px"
          max-height="50px">
          <h2 class="text-uppercase font-weight-black subtitle-1">
            <v-icon class="mr-2">
                mdi-cart
            </v-icon>
            CARRITO
          </h2>
          <v-spacer></v-spacer>
            <v-btn
              x-small
              text
              icon
              @click="SHOPCART()">
              <i class="material-icons">close</i>
            </v-btn>
        </v-toolbar>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// eslint-disable-next-line import/extensions
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
    };
  },
  components: {
  },
  computed: {
    ...mapState('menu', ['shopcart']),
    ...mapState('StoreProfile', ['profile']),

    showForm: {
      get() {
        return this.shopcart;
      },
      set() {
        // nothing
      },
    },
  },
  methods: {
    ...mapMutations('menu', ['SHOPCART']),

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },
  },
};

</script>
