<template>
  <v-container fluid class="pa-1 mt-14 mb-2" v-show="!preload">
    <NavigationDrawer/>
    <v-container pa-0 fluid style="max-height:90vh;overflow-y:auto">
      <div class="pa-2" style="width:100%;overflow:hidden">
        <v-row>
          <v-col cols="12" ma-0 pa-0>
            <v-card class="mb-4 elevation-5">
              <v-carousel height="200px"
                cycle
                hide-delimiters
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
                hide-delimiter-background>
                <v-carousel-item
                  v-for="(item) in getListSlide"
                  :key="item.code"
                  :src="'https://www.sistemacrm.com.ve/api/tmp/images/'.concat(item.code, '.webp')"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <div
                    align="center"
                    class="white--text font-weight-bold subtitle-1"
                    style="margin-top:40%;"
                    v-text="item.name">
                  </div>
                  <div
                    align="end"
                    style="font-size:26px;margin-top:-8px;"
                    class="white--text font-weight-bold">
                    {{item.price.price.concat(' ', item.price.coin)}}
                    <s class="red--text subtitle-2">
                    Antes: {{parseFloat(item.price.price*1.03).toFixed(2)}} {{item.price.coin}}</s>
                  </div>
                </v-carousel-item>
              </v-carousel>
            </v-card>
          </v-col>
        </v-row>

        <v-subheader class="pa-1"> MAS VENDIDO</v-subheader>
        <v-container class="lighten-4 pa-0" fluid>
          <v-card
            v-for="(item, index) in getListOfferts"
            :key="index"
            transition="none"
            class="mx-auto pa-0 mt-4"
            color="white"
            @click="openDetail(item)"
          >
            <v-row justify="start">
              <v-col cols="5" class="pa-0 ml-3">
                <v-img
                  width="100%"
                  height="140px"
                  alt="loading"
                  lazy-src="system/no-image.webp"
                  :src="'https://www.sistemacrm.com.ve/api/tmp/images/'.concat(item.code, '.webp')"
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
                  <v-btn fab light small absolute
                    style="top:2px;right:2px;opacity:0.6 !important;"
                    @click.stop="favorite(item)">
                    <v-icon color="blue">mdi-heart{{parseInt(item.detail.favorite, 10) ? '':'-outline'}}</v-icon>
                  </v-btn>
                </v-img>
              </v-col>
              <v-col cols="6" class="pa-0">
                <v-card-title style="padding: 8px;">
                  <div>
                    <div class="body-2 font-weight-bold">
                      {{item.name}}
                    </div>
                    <div class="body-2">{{item.brand}}</div>
                    <div class="title">{{item.price.coin}} {{item.price.price}}</div>
                  </div>
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
        </v-container>

        <v-subheader class="pa-1 mt-8"> MEJORES PRECIOS </v-subheader>
        <v-row dense>
          <v-col
            v-for="(item) in getListBestPrice"
            :key="item.code"
            cols="6"
          >
            <v-card class="elevation-4 mt-2" @click="openDetail(item)">
              <v-img
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                alt="loading"
                lazy-src="system/no-image.webp"
                :src="'https://www.sistemacrm.com.ve/api/tmp/images/'.concat(item.code, '.webp')"
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

              <v-card-actions>
                <v-card-title style="padding: 8px;min-height:128px;">
                  <div>
                    <div class="body-2 font-weight-bold">
                      {{item.name}}
                    </div>
                    <div class="body-2">{{item.brand}}</div>
                    <div class="title">{{item.price.coin}} {{item.price.price}}</div>
                  </div>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn fab light small absolute
                  style="top:2px;right:2px;opacity:0.6 !important;"
                  @click.stop="favorite(item)">
                  <v-icon color="blue">mdi-heart{{parseInt(item.detail.favorite, 10) ? '':'-outline'}}</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <DialogMessage/>
    <DialogCatalogue/>
    <DialogFavorite/>
    <DialogShopcart/>
    <DialogDetail/>
    <DialogSales/>
  </v-container>
</template>

<script>
// eslint-disable-next-line import/extensions
import { mapActions, mapState } from 'vuex';
// eslint-disable-next-line import/extensions
import DialogShopcart from './pages/DialogShopcart.vue';
// eslint-disable-next-line import/extensions
import DialogCatalogue from './pages/DialogCatalogue';
// eslint-disable-next-line import/extensions
import DialogMessage from './pages/DialogMessage';
// eslint-disable-next-line import/extensions
import DialogDetail from './pages/DialogItemDetail';
// eslint-disable-next-line import/extensions
import DialogSales from './pages/DialogSales';
// eslint-disable-next-line import/extensions
import DialogFavorite from './pages/DialogFavorite';
// eslint-disable-next-line import/extensions
import NavigationDrawer from './widget/NavigationDrawer';

export default {
  name: 'Main',

  components: {
    NavigationDrawer,
    DialogShopcart,
    DialogCatalogue,
    DialogMessage,
    DialogDetail,
    DialogSales,
    DialogFavorite,
  },
  computed: {
    ...mapState('StoreProfile', ['profile']),
    ...mapState('messenger', ['messageList']),
    ...mapState('WebServices', ['preload']),
    ...mapState('catalogue', ['offerts']),

    getListSlide: {
      get() {
        return this.offerts.slice(0, 4);
      },
    },
    getListOfferts: {
      get() {
        const shuffled = this.offerts.slice(0, 8)
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);

        return shuffled;
      },
    },
    getListBestPrice: {
      get() {
        const shuffled = this.offerts.map((value) => ({ value, sort: parseInt(value.topY, 10) }))
          .sort((a, b) => b.sort - a.sort)
          .map(({ value }) => value).slice(0, 20);
        return shuffled;
      },
    },
  },
  methods: {
    ...mapActions('catalogue', ['toggleFormDetail', 'setItemView']),

    favorite(item) {
      this.$store.dispatch('catalogue/favorite', {
        position: -1,
        code: item.id,
        status: !parseInt(item.detail.favorite, 10),
      });
    },

    openDetail(e) {
      this.setItemView(e);
      this.toggleFormDetail();
    },
  },
  mounted() {
    // descargar mensajes
    if (navigator.onLine) {
      this.$store.dispatch('catalogue/getOfferts');
      this.$store.dispatch('messenger/getAllMessagesHead');
    }
  },
};
</script>

<style>
.reduce-height-dialog {height:91vh;}
</style>
