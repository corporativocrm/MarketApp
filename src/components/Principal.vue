<template>
  <v-container fluid class="pt-2 mt-14 mb-16" v-show="!preload">
    <NavigationDrawer/>
    <v-card class="mb-4 elevation-5">
      <v-carousel height="200px"
        cycle
        delimiter-icon="mdi-minus"
        hide-delimiter-background
        show-arrows-on-hover>
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-card>

    <v-row dense>
      <v-col
        v-for="card in cards"
        :key="card.name"
        cols="6"
      >
        <v-card class="elevation-2" @click="openDetail(card)">
          <v-img
            :src="card.image"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.name"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-heart{{card.fav ? '':'-outline'}}</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <ModalNotify/>
    <Catalogue/>
    <Shopcart/>
    <Detail/>
  </v-container>
</template>

<script>
// eslint-disable-next-line import/extensions
import { mapActions, mapState } from 'vuex';
// eslint-disable-next-line import/extensions
import Shopcart from './pages/Shopcart.vue';
// eslint-disable-next-line import/extensions
import Catalogue from './pages/Catalogue';
// eslint-disable-next-line import/extensions
import ModalNotify from './widget/Notify';
// eslint-disable-next-line import/extensions
import Detail from './pages/Catalogue/Detail';
// eslint-disable-next-line import/extensions
import NavigationDrawer from './widget/NavigationDrawer';

export default {
  name: 'Main',

  data: () => ({
    cards: [
      {
        name: 'Router Mercusys 150Mb',
        image: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/5/2/52c6dd76-99b1-42fd-a59c-87ac6287c8cc.jpg',
        price: 1,
        coin: 'USD $',
        fav: false,
      },
      {
        name: 'Best airlines ',
        image: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/e/5/e56f1dd2-594c-4a24-bc61-0f7eb72118f0.jpg',
        price: 1,
        coin: 'USD $',
        fav: false,
      },
      {
        name: 'Router Mercusys 300Mb',
        image: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/5/2/52c6dd76-99b1-42fd-a59c-87ac6287c8cc.jpg',
        price: 1,
        coin: 'USD $',
        fav: false,
      },
      {
        name: 'Best airlines',
        image: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/e/5/e56f1dd2-594c-4a24-bc61-0f7eb72118f0.jpg',
        price: 1,
        coin: 'USD $',
        fav: false,
      },
    ],
    items: [
      {
        src: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/6/4/64689a53-8a99-48da-9301-829675894052.jpg',
      },
      {
        src: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/1/e/1ea8a521-d963-47b8-8c4b-85c01fdd4349.jpg',
      },
      {
        src: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/e/5/e535a3da-5a07-453c-aa2a-7b41455492a1.jpg',
      },
      {
        src: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/e/7/e714edc9-8a75-4c3f-b8de-977063bcbfa2.jpg',
      },
    ],
  }),

  components: {
    NavigationDrawer, Shopcart, Catalogue, ModalNotify, Detail,
  },
  computed: {
    ...mapState('StoreProfile', ['profile']),
    ...mapState('notifications', ['dataNotifi']),
    ...mapState('WebServices', ['preload']),
  },
  methods: {
    ...mapActions('catalogue', ['toggleFormDetail', 'setItemView']),

    openDetail(e) {
      this.setItemView(e);
      this.toggleFormDetail();
    },
  },
  async mounted() {
    setInterval(() => {
      if (navigator.onLine) {
        this.$store.dispatch('notifications/getAllNotifications');
      }
    }, 60000); // 1 Min
  },
};
</script>

<style>
.reduce-height-dialog {height:91vh;}
</style>
