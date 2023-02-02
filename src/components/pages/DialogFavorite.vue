<template>
  <v-row justify="center">
    <v-dialog
      v-model="showForm"
      fullscreen persistent hide-overlay
      :no-click-animation="true"
      transition="dialog-bottom-transition">
      <v-card>
      <v-container
        class="grey lighten-4 pt-12"
        fluid>
        <v-subheader
          class="pa-0 d-flex justify-space-between">
          <i class="mt-1">{{countFavorites}}</i>
        </v-subheader>

        <v-container v-if="showLoading">
          <v-card
            class="mx-auto pa-0 mt-5"
            color="white"
            v-for="item in [1,2,3]"
            :key="item">
            <v-row>
              <v-col cols="6" class="pa-0">
                <div class="skeleton-item-image skeleton-animation-wave"></div>
              </v-col>
              <v-col cols="6" class="pa-3">
                <div class="skeleton-item-title skeleton-animation-pulse"></div>
                <div class="mt-2 skeleton-item-title skeleton-animation-pulse"></div>
                <div class="mt-6 skeleton-item-price skeleton-animation-pulse"></div>
              </v-col>
            </v-row>
          </v-card>
        </v-container>

        <v-card
          v-for="(item, index) in favoritesByPages"
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
                height="152px"
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
                  @click.stop="favorite(index)">
                  <v-icon color="blue">mdi-heart{{item.detail.favorite ? '':'-outline'}}</v-icon>
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

      <br/>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="countPages"
          :total-visible="5"
          @input="changePage"
          circle
        ></v-pagination>
      </div>
      <br/>

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
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      page: 1,
      modalLoading: false,
      ITEMPERPAGE: 20,
    };
  },
  computed: {
    ...mapState('menu', ['dialogFavorite']),
    ...mapState('StoreProfile', ['profile']),
    ...mapState('catalogue', ['favorites', 'showDetail', 'catalogueLoaded']),

    showForm: {
      get() {
        return this.dialogFavorite;
      },
      set() { },
    },

    showLoading: {
      get() {
        return !this.catalogueLoaded && this.dialogFavorite;
      },
    },

    favoritesByPages: {
      get() {
        if (this.favorites.length && !this.showLoading) {
          const from = (this.page - 1) * this.ITEMPERPAGE;
          const to = (from + this.ITEMPERPAGE) < this.favorites.length ? from + this.ITEMPERPAGE : this.favorites.length;
          return this.favorites.slice(from, to);
        }
        return [];
      },
    },

    captionLoading: {
      get() {
        return 'Descargando favoritos';
      },
    },

    countPages: {
      get() {
        if (this.favorites.length) {
          const pages = Math.ceil(this.favorites.length / this.ITEMPERPAGE);
          return pages > 0 ? pages : 1;
        }
        return 1;
      },
    },

    countFavorites: {
      get() {
        if (this.favorites.length) {
          const count = this.favorites.length;
          const current = (this.page - 1) * this.ITEMPERPAGE;
          const mount = (current + this.ITEMPERPAGE) < (count - 1) ? current + this.ITEMPERPAGE : count;

          return parseInt(current, 10).toString().concat('-', mount, '/', count);
        }
        return '0/0';
      },
    },
  },
  methods: {
    ...mapMutations('menu', ['CATALOGUE']),
    ...mapActions('catalogue', ['toggleFormDetail', 'setItemView']),

    favorite(index) {
      const item = this.favorites[index];
      this.$store.dispatch('catalogue/favorite', {
        position: index,
        code: item.id,
        status: !item.detail.favorite,
      });
    },

    openDetail(e) {
      this.setItemView(e);
      this.toggleFormDetail();
    },

    changePage(page) {
      if (page) {
        // --
      }
    },

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },
  },
  watch: {
    showForm: {
      async handler(show) {
        if (show) {
          await this.$store.dispatch('catalogue/getFavorites');
        }
      },
    },
  },
};

</script>

<style>
.skeleton-item-image {width:90%;height:150px;background-color:#e8e8e8;}
.skeleton-item-title {width:90%;height:20px;background-color:#e8e8e8;}
.skeleton-item-price {width:50%;height:35px;background-color:#e8e8e8;}
.skeleton-animation-wave {
  animation: wave 1s infinite linear forwards;
  -webkit-animation: wave 1s infinite linear forwards;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
}
.skeleton-animation-pulse {
  animation: pulse 1s infinite ease-in-out;
  -webkit-animation: pulse 1s infinite ease-in-out;
}

@keyframes pulse {
  0% { background-color: rgba(165, 165, 165, .1); }
  50% { background-color: rgba(165, 165, 165, .3); }
  100% { background-color: rgba(165, 165, 165, .1); }
}

@-webkit-keyframes pulse {
  0% { background-color: rgba(165, 165, 165, .1); }
  50% { background-color: rgba(165, 165, 165, .3); }
  100% { background-color: rgba(165, 165, 165, .1); }
}

@keyframes wave {
  0% { background-position: -468px 0 }
  100% { background-position: 468px 0 }
}

@-webkit-keyframes wave {
  0% {background-position: -468px 0 }
  100% { background-position: 468px 0 }
}
</style>
