<template>
  <v-row justify="center">
    <v-dialog
      v-model="showForm"
      fullscreen persistent hide-overlay
      transition="dialog-bottom-transition">
      <v-card>
      <v-container
        class="grey lighten-4 pt-12"
        fluid>
        <v-subheader
          class="pa-0 d-flex justify-space-between">
          <i class="mt-1">{{countProducts}}</i>
          <v-menu bottom offset-y v-model="modalMenuFilters">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="profile.color"
                dark
                class="blue--text mt-1 mr-2"
                @click="modalMenuFilters=!modalMenuFilters"
                v-bind="attrs"
                v-on="on">
                Filtro <v-icon left>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title @click="openFilters('price')">
                  Precio
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="openFilters('category')">
                  Categoria
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="openFilters('factory')">
                  Marca
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title @click="resetFilters()">
                  Reiniciar
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
          v-for="(item, index) in products"
          :key="index"
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
                  @click.stop="favorite(index)"
                >
                  <v-icon color="blue">mdi-heart-outline</v-icon>
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
          :length="index.length"
          :total-visible="5"
          @next="changePage()"
          @previous="changePage()"
          circle
        ></v-pagination>
      </div>
      <br/>

      </v-card>
    </v-dialog>

    <!-- MODAL FILTERS -->
    <v-dialog v-model="modalFilters" hide-overlay scrollable max-width="300">
      <v-card>
        <v-card-title>Filtros</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 220px;" v-if="filterType == 'price'">
          <v-col>
              <v-subheader class="font-weight-bold">
                Establesca los rangos de precio a filtrar
              </v-subheader>
              <v-text-field
                v-model="price.min"
                class="mt-1" label="Minimo" prefix="$"
              ></v-text-field>
              <v-text-field
                v-model="price.max"
                label="Maximo" prefix="$"
              ></v-text-field>
          </v-col>
        </v-card-text>
        <v-card-text style="height: 300px;" v-else-if="filterType == 'category'">
          <v-checkbox v-for="(category, index) in listCategories"
            v-model="preselectFilters"
            :key="index"
            :label="category"
            :value="category"
            hide-details
          ></v-checkbox>
        </v-card-text>
        <v-card-text style="height: 300px;" v-else-if="filterType == 'factory'">
          <v-checkbox v-for="(factory, index) in listFactory"
            v-model="preselectFilters"
            :key="index"
            :label="factory"
            :value="factory"
            hide-details
          ></v-checkbox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="modalFilters = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="filterItems()">
            Guardar
          </v-btn>
        </v-card-actions>
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
      query: '',
      modalMenuFilters: false,
      modalFilters: false,
      modalLoading: false,
      filterType: '',
      preselectFilters: [],
      price: { min: 0, max: 0 },
      filters: {
        price: { min: 0, max: 0 },
        category: [],
        factory: [],
        range: { min: '', max: '' },
      },
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  computed: {
    ...mapState('menu', ['catalogue']),
    ...mapState('StoreProfile', ['profile']),
    ...mapState('catalogue', ['catalogueLoaded', 'showDetail', 'itemView', 'querySearch', 'products', 'index']),

    showForm: {
      get() {
        return this.catalogue;
      },
      set() { },
    },

    showLoading: {
      get() {
        return !this.catalogueLoaded && this.catalogue;
      },
    },

    captionLoading: {
      get() {
        return (this.query === this.querySearch) ? 'Filtrando productos' : 'Descargando productos';
      },
    },

    countProducts: {
      get() {
        if (this.index.length) {
          const count = this.index.reduce((a, c) => a + parseInt(c.cnt, 10), 0);
          return this.index[this.page - 1].cnt.toString().concat('/', count);
        }
        return '0/0';
      },
    },

    listCategories: {
      get() {
        if (this.products.length) {
          const result = this.products.map((e) => e.category);
          return Array.from(new Set(result));
        }
        return [];
      },
    },

    listFactory: {
      get() {
        if (this.products.length) {
          const result = this.products.map((e) => e.brand);
          return Array.from(new Set(result));
        }
        return [];
      },
    },
  },
  methods: {
    ...mapMutations('menu', ['CATALOGUE']),
    ...mapActions('catalogue', ['toggleFormDetail', 'setItemView']),

    favorite(index) {
      return index;
    },

    openDetail(e) {
      this.setItemView(e);
      this.toggleFormDetail();
    },

    openFilters(type) {
      this.filterType = type;

      switch (type) {
        case 'category':
          this.preselectFilters = this.filters.category;
          break;
        case 'factory':
          this.preselectFilters = this.filters.factory;
          break;
        case 'price':
          this.price = this.filters.price;
          break;
        default:
          break;
      }

      this.modalFilters = !this.modalFilters;
    },

    changePage() {
      this.modalLoading = true;
      this.filters.range = this.index[this.page - 1];
      this.$store.dispatch('catalogue/QuerySearch', { query: this.querySearch, filters: this.filters }).finally(() => {
        this.modalLoading = false;
      });
    },

    resetFilters() {
      this.modalLoading = true;
      this.filters = {
        price: { min: 0, max: 0 },
        category: [],
        factory: [],
        range: { min: '', max: '' },
      };

      this.$store.dispatch('catalogue/QuerySearch', { query: this.querySearch, filters: null }).finally(() => {
        this.modalLoading = false;
      });
    },

    filterItems() {
      switch (this.filterType) {
        case 'category':
          this.filters.category = this.preselectFilters;
          break;
        case 'factory':
          this.filters.factory = this.preselectFilters;
          break;
        case 'price':
          if (this.price.min >= 0 && this.price.max > 0) {
            this.filters.price = this.price;
          } else {
            this.alert('El rango establecido no esta permitido');
            return;
          }
          break;
        default:
          break;
      }

      this.query = this.querySearch;
      this.modalFilters = false;
      this.modalLoading = true;
      this.filters.range = { min: '', max: '' };

      this.$store.dispatch('catalogue/QuerySearch', { query: this.querySearch, filters: this.filters }).finally(() => {
        this.modalLoading = false;
      });
    },

    alert(message, type = 'info') {
      this.$store.dispatch('mensaje/push', [message, type]);
    },
  },
  watch: {
    showForm: {
      handler(show) {
        if (show && (this.query !== this.querySearch)) {
          this.filters = {
            price: { min: 0, max: 0 },
            category: [],
            factory: [],
            range: { min: '', max: '' },
          };
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
