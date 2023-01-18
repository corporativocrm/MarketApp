<template>
  <v-row justify="center">
    <v-dialog
      v-model="showForm"
      fullscreen persistent hide-overlay
      transition="dialog-bottom-transition">
      <v-card>
        <br/><br/>
        <v-container class="grey lighten-4 pt-2" fluid>
          <v-card
            v-for="(item, index) in listShopcart"
            :key="index"
            class="mx-auto pa-0 mt-4"
            color="white"
          >
            <v-row justify="start">
              <v-col cols="4" class="pa-1 ml-3">
                <v-img
                  height="100px"
                  alt="loading"
                  lazy-src="system/no-image.webp"
                  :src="item.image"
                >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
                </v-img>
              </v-col>
              <v-col cols="7" class="pa-0">
                <v-card-title style="padding: 8px 4px;">
                  <div>
                    <div class="body-2 font-weight-bold">
                      {{item.name}}
                    </div>
                    <div class="body-2">{{item.brand}}</div>
                    <div class="title">{{item.quantity}} x {{item.coin}} {{item.price}}</div>
                  </div>
                </v-card-title>
              </v-col>
            </v-row>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn fab small dark color="red" @click="remove(index)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-card-actions>
          </v-card>
        </v-container>

        <v-divider></v-divider>

        <v-card class="px-6 pr">
          <v-card-text>
            <div class="body-2 font-weight-bold">Monto estimado</div>
            <p class="text-h4 text--primary">
              {{totalMount}}
            </p>
            <div class="body-2 font-weight-bold">Politica</div>
            <div class="text--primary">
              La existencia como el precio de los productos son referenciales
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined rounded large elevation="4" color="primary">
              Cotizar
            </v-btn>
          </v-card-actions>
        </v-card>

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
      listShopcart: [],
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
    },

    totalMount: {
      get() {
        const list = this.listShopcart;
        if (list.length) {
          const mount = list.reduce((a, e) => a + (parseInt(e.quantity, 10) * parseFloat(e.price)), 0);
          return list[0].coin.concat(' ', mount.toFixed(2));
        }
        return '$0';
      },
    },
  },
  methods: {
    ...mapMutations('menu', ['SHOPCART']),

    remove(id) {
      const list = localStorage.getItem('listCartShop');
      if (list != null) {
        const data = JSON.parse(list);
        data.splice(id, 1);
        localStorage.setItem('listCartShop', JSON.stringify(data));
        this.listShopcart = data;
      }
    },

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },
  },

  watch: {
    showForm: {
      handler() {
        const list = localStorage.getItem('listCartShop');
        if (list != null) {
          this.listShopcart = JSON.parse(list);
        }
      },
    },
  },
};

</script>
