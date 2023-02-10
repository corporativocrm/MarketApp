<template>
  <v-row justify="center">
    <v-dialog
    :no-click-animation="true"
    content-class="mt-12" persistent fullscreen
    origin="center center" v-model="showForm"
    transition="dialog-bottom-transition">
      <v-card light>
        <v-row dense class="pa-2">
          <div style="overflow-y:auto;min-height:90vh;max-height:92vh;width:100%">
            <div v-if="viewOrder == null" class="pt-1">
              <v-subheader class="font-weight-light">Ordenes en espera</v-subheader>
              <template v-for="(item) in ordersWaiting">
                <v-card
                  :key="item.id" class="mx-auto mb-3"
                  elevation="4"
                  max-width="344" outlined @click="view(item)">
                  <v-card-title class="px-4 pt-1 pb-0">
                    <span class="blue--text">{{item.code}}</span>
                    <v-spacer></v-spacer>
                    {{parseFloat(item.total).toFixed(2).concat(' USD')}}
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-list>
                    <v-list-item style="min-height:25px !important;">
                      <v-list-item-subtitle>Estado:</v-list-item-subtitle>
                      <v-list-item-title>
                        <v-chip small :color="getColorByStatus(item.status)" outlined>{{item.status}}</v-chip>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item style="min-height:25px !important;">
                      <v-list-item-subtitle>Artículos:</v-list-item-subtitle>
                      <v-list-item-title v-text="item.products.length"></v-list-item-title>
                    </v-list-item>
                    <v-list-item style="min-height:25px !important;">
                      <v-list-item-subtitle>Fecha:</v-list-item-subtitle>
                      <v-list-item-title v-text="(new Date(item.date)).toLocaleDateString('es-VE')"></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </template>
              <v-subheader class="font-weight-light">Ordenes en proceso</v-subheader>
              <template v-for="(item) in ordersProcessed">
                <v-card
                  :key="item.id" class="mx-auto mb-3"
                  elevation="4"
                  max-width="344" outlined @click="view(item)">
                  <v-card-title class="px-4 pt-1 pb-0">
                    <span class="blue--text">{{item.code}}</span>
                    <v-spacer></v-spacer>
                    {{parseFloat(item.total).toFixed(2).concat(' USD')}}
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-list>
                    <v-list-item style="min-height:25px !important;">
                      <v-list-item-subtitle>Estado:</v-list-item-subtitle>
                      <v-list-item-title>
                        <v-chip small :color="getColorByStatus(item.status)" outlined>{{item.status}}</v-chip>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item style="min-height:25px !important;">
                      <v-list-item-subtitle>Artículos:</v-list-item-subtitle>
                      <v-list-item-title v-text="item.products.length"></v-list-item-title>
                    </v-list-item>
                    <v-list-item style="min-height:25px !important;">
                      <v-list-item-subtitle>Fecha:</v-list-item-subtitle>
                      <v-list-item-title v-text="(new Date(item.date)).toLocaleDateString('es-VE')"></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </template>
            </div>
            <div v-else>
              <v-subheader class="font-weight-light">
                Lista de artículos
                <v-spacer></v-spacer>
                <v-btn elevation="2" small rounded outlined color="warning" @click="view(null)">Volver</v-btn>
              </v-subheader>
              <template v-for="(item) in viewOrder.products">
                <v-card
                  :key="item.id" class="mx-auto mb-3"
                  elevation="4"
                  max-width="344" outlined>
                  <v-card-title class="px-4 pt-1 pb-0">
                    <span class="green--text">SKU: {{item.sku}}</span>
                    <v-spacer></v-spacer>
                    {{parseFloat(item.price * item.quantity).toFixed(2).concat(' USD')}}
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-list>
                    <v-list-item style="min-height:30px !important;" class="pb-1">
                      <v-list-item-title>{{item.name}}</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item style="min-height:20px !important;" class="pt-1">
                      <v-list-item-subtitle>Cantidad:</v-list-item-subtitle>
                      <v-list-item-title v-text="parseInt(item.quantity, 10)"></v-list-item-title>
                    </v-list-item>
                    <v-list-item style="min-height:20px !important;" class="pt-1">
                      <v-list-item-subtitle>Marca:</v-list-item-subtitle>
                      <v-list-item-title v-text="item.brand"></v-list-item-title>
                    </v-list-item>
                    <v-list-item style="min-height:20px !important;" class="pt-1">
                      <v-list-item-subtitle>Categoria:</v-list-item-subtitle>
                      <v-list-item-title v-text="item.category"></v-list-item-title>
                    </v-list-item>
                    <v-list-item style="min-height:20px !important;" class="pt-1">
                      <v-list-item-subtitle>Peso:</v-list-item-subtitle>
                      <v-list-item-title v-text="parseFloat(item.weight).toFixed(2).concat(' Kg')"></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </template>
            </div>
          </div>
        </v-row>

      </v-card>
    </v-dialog>

    <!-- MODAL LOADING -->
    <v-dialog v-model="showLoading" persistent width="300">
      <v-card :color="profile.color" dark>
        <v-card-text>
          {{captionLoading}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
// eslint-disable-next-line import/extensions
import { mapState } from 'vuex';

export default {
  name: 'dialogSales',
  data: () => ({
    viewOrder: null,
    answer: '',
  }),
  computed: {
    ...mapState('menu', ['dialogOrders']),
    ...mapState('StoreProfile', ['profile']),
    ...mapState('catalogue', ['orders', 'catalogueLoaded']),

    showForm: {
      get() {
        return this.dialogOrders;
      },
      set() { },
    },

    showLoading: {
      get() {
        return !this.catalogueLoaded && this.dialogOrders;
      },
    },

    captionLoading: {
      get() {
        return 'Descargando ordenes';
      },
    },

    ordersWaiting: {
      get() {
        if (this.orders.length) {
          const orders = this.orders.slice().reverse();
          return orders.filter((e) => e.status.toLowerCase() === 'cotizacion');
        }
        return [];
      },
    },

    ordersProcessed: {
      get() {
        if (this.orders.length) {
          const orders = this.orders.slice().reverse();
          return orders.filter((e) => e.status.toLowerCase() !== 'cotizacion');
        }
        return [];
      },
    },
  },
  methods: {
    view(item) {
      this.viewOrder = item;
    },

    getColorByStatus(status) {
      switch (status.toLowerCase()) {
        case 'cotizacion':
          return 'orange';
        case 'creado':
          return 'green';

        default:
          return 'black';
      }
    },

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },
  },
  watch: {
    showForm: {
      handler(show) {
        if (show) {
          this.$store.dispatch('catalogue/getOrders');
        }
      },
    },
  },
};
</script>
