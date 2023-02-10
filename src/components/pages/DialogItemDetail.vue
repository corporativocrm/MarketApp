<template>
  <v-row justify="center">
    <v-dialog
      :retain-focus="false"
      v-model="showForm"
      content-class="mt-10"
      :no-click-animation="true"
      persistent max-width="95%">
      <v-card>

        <v-toolbar :color="profile.color" dark height="50px" max-height="50px">
          <v-icon class="mr-2">
            mdi-checkbox-marked-circle-plus-outline
          </v-icon>
          <h1 class="title mt-2 white--text text-truncate">
            Agregar al carrito
          </h1>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="close()">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-toolbar>

        <v-row justify="start">
          <v-col cols="12" class="pa-6 pt-5 pb-2 d-flex justify-center">
            <v-img
              height="250px"
              alt="loading"
              contain
              lazy-src="system/no-image.webp"
              @error="handlerError"
              :src="getImage"
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
          <v-col cols="12" class="pa-4 pt-0">
            <v-card-title style="padding: 8px;">
              <div>
                <div class="body-1 font-weight-bold">{{getTitle}}</div>
                <div class="mt-2 body-2">
                  SKU: {{getCode}}
                </div>
                <v-row
                  class="pa-1 pt-4"
                  justify="start"
                  align="center"
                >
                  <v-chip
                    v-for="(item, index) in getTags"
                    :key="index"
                    small color="teal" outlined class="ml-1">
                    <v-icon small left>mdi-label</v-icon>
                    {{item}}
                  </v-chip>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <div class="mt-3 title">{{getPrice}}</div>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="quantity"
                      style="margin:4px 2px auto 8px;"
                      class="pa-0"
                      label="search"
                      type="search"
                      hide-details rounded dense solo-inverted
                      prepend-inner-icon="mdi-minus"
                      append-icon="mdi-plus"
                      @click:append="quantity++"
                      @click:prepend-inner="quantity -= quantity > 1 ? 1 : 0"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-card-title>
          </v-col>
        </v-row>

        <v-card-actions class="mb-4">
          <v-btn rounded color="red" outlined @click="close()"> CERRAR</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            rounded
            small
            color="teal"
            @click="openMessage()"
          >
            MENSAJE
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            rounded
            color="primary"
            :disabled="disabled"
            @click="addToCart()">
            AGREGAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'detail-product',
  data: () => ({
    errorImage: false,
    quantity: 1,
    disabled: true,
  }),
  computed: {
    ...mapState('catalogue', ['showDetail', 'itemView']),
    ...mapState('StoreProfile', ['profile']),

    showForm: {
      get() {
        return this.showDetail;
      },
    },

    getImage: {
      get() {
        if (this.errorImage) {
          return 'system/no-image.webp';
        }
        return 'https://www.sistemacrm.com.ve/api/tmp/images/'.concat(this.getCode, '.webp');
      },
    },

    getTitle: {
      get() {
        return this.itemView !== null ? this.itemView.name : '';
      },
    },
    getCode: {
      get() {
        return this.itemView !== null ? this.itemView.code : '';
      },
    },
    getTags: {
      get() {
        if (this.itemView !== null) {
          const tags = [this.itemView.brand, this.itemView.category];
          if (this.itemView.family.length) tags.push(this.itemView.family);
          return tags;
        }
        return [];
      },
    },
    getPrice: {
      get() {
        return this.itemView !== null ? this.itemView.price.coin.concat(' ', this.itemView.price.price) : '0';
      },
    },
  },
  methods: {
    ...mapActions('catalogue', ['toggleFormDetail', 'setItemView']),
    ...mapMutations('menu', ['MESSAGE']),

    close() {
      this.toggleFormDetail();
      this.setItemView(null);
    },

    openMessage() {
      this.$store.dispatch('messenger/clearMessagesText');
      this.$store.dispatch('catalogue/setMessageDirect', true);
      this.MESSAGE(true);
    },

    handlerError($event) {
      this.errorImage = $event.length;
    },

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },

    addToCart() {
      const list = localStorage.getItem('listCartShop');
      const item = {
        name: this.itemView.name,
        code: this.itemView.code,
        salecenter: this.itemView.center,
        image: this.getImage,
        quantity: this.quantity,
        weight: this.itemView.weight,
        warehouse: this.itemView.warehouse,
        unit: this.itemView.unit,
        pricelist: this.itemView.price.name,
        coin: this.itemView.price.coin,
        price: this.itemView.price.price,
        brand: this.itemView.brand,
        pricelist_id: this.itemView.price.id,
        condition_sale: this.itemView.price.terms,
      };

      if (list != null) {
        const data = JSON.parse(list);
        data.push(item);
        localStorage.setItem('listCartShop', JSON.stringify(data));
      } else {
        localStorage.setItem('listCartShop', JSON.stringify([item]));
      }

      this.disabled = true;
      this.alert('Producto agreagado al carrito', 'success');
    },
  },
  watch: {
    showForm: {
      handler(show) {
        this.errorImage = false;
        this.quantity = 1;
        this.disabled = !show;
      },
    },
  },
};
</script>
