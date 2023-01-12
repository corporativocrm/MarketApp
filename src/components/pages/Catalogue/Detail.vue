<template>
  <v-row justify="center">
    <v-dialog
      :retain-focus="false"
      v-model="showForm"
      content-class="mt-10"
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
              aspect-ratio="1.7"
              height="250px"
              contain
              :src="getImage"
            ></v-img>
          </v-col>
          <v-col cols="12" class="pa-4 pt-0">
            <v-card-title style="padding: 8px;">
              <div>
                <div class="body-1 font-weight-bold">{{getTitle}}</div>
                <div class="mt-2 body-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum ornare lorem sit amet sollicitudin pretium.
                </div>
                <v-row
                  class="pa-1 pt-4"
                  justify="start"
                  align="center"
                >
                  <v-chip small color="teal" outlined class="ml-1">
                    <v-icon small left>mdi-label</v-icon>
                    Categoria
                  </v-chip>
                  <v-chip small color="teal" outlined class="ml-1">
                    <v-icon small left>mdi-label</v-icon>
                    Descuento 5%
                  </v-chip>
                </v-row>
                <div class="mt-3 title">{{getPrice}}</div>
              </div>
            </v-card-title>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-btn rounded color="red" outlined @click="close()"> Cerrar</v-btn>
          <v-spacer></v-spacer>
          <v-btn rounded color="primary"> Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'detail-product',
  data: () => ({
  }),
  computed: {
    ...mapState('catalogue', ['showDetail', 'itemView']),
    ...mapState('StoreProfile', ['profile']),

    showForm: {
      get() {
        return this.showDetail;
      },
    },
    getTitle: {
      get() {
        return this.itemView !== null ? this.itemView.name : '';
      },
    },
    getImage: {
      get() {
        return this.itemView !== null ? this.itemView.image : 'system/no-image.webp';
      },
    },
    getPrice: {
      get() {
        return this.itemView !== null ? this.itemView.coin.concat(this.itemView.price) : '0';
      },
    },
  },
  methods: {
    ...mapActions('catalogue', ['toggleFormDetail']),

    close() {
      this.toggleFormDetail();
    },

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },
  },
  mounted() {
  },
};
</script>
