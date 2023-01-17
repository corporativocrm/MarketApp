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
                <div class="mt-3 title">{{getPrice}}</div>
              </div>
            </v-card-title>
          </v-col>
        </v-row>

        <v-card-actions class="mb-4">
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
    errorImage: false,
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
    ...mapActions('catalogue', ['toggleFormDetail']),

    close() {
      this.toggleFormDetail();
    },

    handlerError($event) {
      this.errorImage = $event.length;
    },

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },
  },
  watch: {
    showForm: {
      handler() {
        this.errorImage = false;
      },
    },
  },
  mounted() {
  },
};
</script>
