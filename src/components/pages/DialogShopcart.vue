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
            <v-btn
              outlined rounded large elevation="4" color="primary"
              @click="createQuotation()">
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
// eslint-disable-next-line import/extensions
import { sendOrder } from '../../config/api/catalogue';

export default {
  data() {
    return {
      listShopcart: [],
      sendingQuotation: false,
    };
  },
  computed: {
    ...mapState('menu', ['shopcart']),
    ...mapState('StoreProfile', ['profile']),
    ...mapState('mensaje', ['value']),

    showForm: {
      get() {
        return this.shopcart;
      },
    },

    conditionSendQuotation: {
      get() {
        return this.value;
      },
    },
    flagCondition: {
      get() {
        return this.condition;
      },
    },

    totalMount: {
      get() {
        const list = this.listShopcart;
        if (list.length) {
          const mount = list.reduce((a, e) => a + (parseInt(e.quantity, 10) * parseFloat(e.price)), 0);
          return list[0].coin.concat(' ', mount.toFixed(2));
        }
        return 'USD 0';
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

    createQuotation() {
      if (localStorage.getItem('listCartShop') != null) {
        this.sendingQuotation = true;
        localStorage.setItem('alert-condition-param-path', 'order');
        this.alertCondition('¿Enviar solicitud de cotización?');
      }
    },

    createOrder() {
      const mount = this.listShopcart.reduce((a, e) => a + (parseInt(e.quantity, 10) * parseFloat(e.price)), 0);
      return {
        client: {
          name: this.profile.name,
          code: this.profile.dni,
          address: this.profile.address,
        },
        creator: this.profile.seller,
        order: {
          iva: 0,
          subtotal: 0,
          total: mount,
          observation: 'Pedido desde el Market',
          transport: 'Cliente',
          retention: 0,
          offert: 1,
          coin: this.listShopcart[0].coin,
          organization: this.profile.org,
          paymentCondition: 'Contado',
          saleCondition: '',
        },
        products: this.listShopcart,
        quotation: 1,
        market: 1,
        date: (new Date()).getTime(),
      };
    },

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },

    alertCondition(message) {
      this.$store.dispatch('mensaje/condition', message);
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
    conditionSendQuotation: {
      async handler() {
        const resp = await this.$store.dispatch('mensaje/getResponse', 'order');
        if (resp) {
          const list = localStorage.getItem('listCartShop');
          if (list != null) {
            if (navigator.onLine) {
              this.listShopcart = JSON.parse(list);
              const order = this.createOrder();
              const response = await sendOrder(JSON.stringify(order));

              if (response.data.response.status) {
                this.listShopcart.splice(0, this.listShopcart.lenght);
                localStorage.removeItem('listCartShop');
                this.alert('La solicitud de cotización ha sido enviada', 'success');
              } else {
                this.alert('La señal es inestable, no logro subir la cotización intente más tarde', 'warning');
              }
            } else {
              this.alert('Asegurese de estar conectado a una red con internet', 'warning');
            }
            localStorage.removeItem('alert-condition-param-path');
          }
        } else if (resp !== null) {
          localStorage.removeItem('alert-condition-param-path');
        }
      },
    },
  },
};

</script>
