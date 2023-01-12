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
          class="pa-0 d-flex justify-end">
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
            </v-list>
          </v-menu>
        </v-subheader>
        <v-card
          v-for="(item, index) in items"
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
                :src="item.image"
              >
                <v-btn
                  fab
                  light
                  small
                  absolute
                  style="top:2px;right:2px;opacity:0.6 !important;"
                  @click.stop="favorite(index)"
                >
                  <v-icon color="blue">mdi-heart{{item.fav ? '':'-outline'}}</v-icon>
                </v-btn>
              </v-img>
            </v-col>
            <v-col cols="6" class="pa-0">
              <v-card-title style="padding: 8px;">
                <div>
                  <div class="body-2">
                    {{item.name}}
                  </div>
                  <div class="body-2">Ellie Goulding</div>
                  <div class="title">{{item.coin}}{{item.price}}</div>
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
          :length="8"
          :total-visible="5"
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
                v-model="filters.price.min"
                class="mt-1" label="Minimo" prefix="$"
              ></v-text-field>
              <v-text-field
                v-model="filters.price.max"
                label="Maximo" prefix="$"
              ></v-text-field>
          </v-col>
        </v-card-text>
        <v-card-text style="height: 300px;" v-else-if="filterType == 'category'">
          <v-radio-group column>
            <v-radio
              label="Bahamas, The"
              value="bahamas"
            ></v-radio>
            <v-radio
              label="Bahrain"
              value="bahrain"
            ></v-radio>
            <v-radio
              label="Bangladesh"
              value="bangladesh"
            ></v-radio>
            <v-radio
              label="Barbados"
              value="barbados"
            ></v-radio>
            <v-radio
              label="Belarus"
              value="belarus"
            ></v-radio>
            <v-radio
              label="Belgium"
              value="belgium"
            ></v-radio>
            <v-radio
              label="Belize"
              value="belize"
            ></v-radio>
            <v-radio
              label="Benin"
              value="benin"
            ></v-radio>
            <v-radio
              label="Bhutan"
              value="bhutan"
            ></v-radio>
            <v-radio
              label="Bolivia"
              value="bolivia"
            ></v-radio>
            <v-radio
              label="Bosnia and Herzegovina"
              value="bosnia"
            ></v-radio>
            <v-radio
              label="Botswana"
              value="botswana"
            ></v-radio>
            <v-radio
              label="Brazil"
              value="brazil"
            ></v-radio>
            <v-radio
              label="Brunei"
              value="brunei"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-text style="height: 300px;" v-else-if="filterType == 'factory'">
          <v-radio-group column>
            <v-radio
              label="Bahamas, The"
              value="bahamas"
            ></v-radio>
            <v-radio
              label="Bahrain"
              value="bahrain"
            ></v-radio>
            <v-radio
              label="Bangladesh"
              value="bangladesh"
            ></v-radio>
            <v-radio
              label="Barbados"
              value="barbados"
            ></v-radio>
            <v-radio
              label="Belarus"
              value="belarus"
            ></v-radio>
            <v-radio
              label="Belgium"
              value="belgium"
            ></v-radio>
            <v-radio
              label="Belize"
              value="belize"
            ></v-radio>
            <v-radio
              label="Benin"
              value="benin"
            ></v-radio>
            <v-radio
              label="Bhutan"
              value="bhutan"
            ></v-radio>
            <v-radio
              label="Bolivia"
              value="bolivia"
            ></v-radio>
            <v-radio
              label="Bosnia and Herzegovina"
              value="bosnia"
            ></v-radio>
            <v-radio
              label="Botswana"
              value="botswana"
            ></v-radio>
            <v-radio
              label="Brazil"
              value="brazil"
            ></v-radio>
            <v-radio
              label="Brunei"
              value="brunei"
            ></v-radio>
          </v-radio-group>
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
    <v-dialog v-model="modalLoading" persistent width="300">
      <v-card :color="profile.color" dark>
        <v-card-text>
          Filtrando contenido
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
      modalMenuFilters: false,
      modalFilters: false,
      modalLoading: false,
      filterType: '',
      filters: {
        price: { min: 0, max: 0 },
        category: [],
        factory: [],
      },
      products: [
        {
          name: 'item 1',
          image: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/9/9/99ea41d5-58fd-4643-8cbc-189700dbbc25.jpg',
          price: 1,
          coin: 'USD $',
          fav: false,
        },
        {
          name: 'item 2',
          image: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/7/4/749b627a-24d4-4273-a85b-a53c716b2aba.jpg',
          price: 10,
          coin: 'USD $',
          fav: false,
        },
        {
          name: 'item 3',
          image: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/e/d/edb13e0e-ad6a-4b25-87ae-8b40cf4554dd.jpg',
          price: 8,
          coin: 'USD $',
          fav: false,
        },
        {
          name: 'item 4',
          image: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/f/6/f6028354-a774-427c-bc84-73d866a1d639.jpg',
          price: 7,
          coin: 'USD $',
          fav: false,
        },
        {
          name: 'item 5',
          image: 'https://ve.epaenlinea.com/media/catalog/product/cache/9de02ba98484dc90d74f47a4b2fb992a/5/b/5b958384-4d11-4627-9d70-6005afb7caeb.jpg',
          price: 7,
          coin: 'USD $',
          fav: false,
        },
      ],
      items: [],
    };
  },
  computed: {
    ...mapState('menu', ['catalogue']),
    ...mapState('StoreProfile', ['profile']),
    ...mapState('catalogue', ['showDetail', 'itemView']),

    showForm: {
      get() {
        return this.catalogue;
      },
      set() { },
    },

  },
  methods: {
    ...mapMutations('menu', ['CATALOGUE']),
    ...mapActions('catalogue', ['toggleFormDetail', 'setItemView']),

    favorite(index) {
      this.items[index].fav = !this.items[index].fav;
    },

    openDetail(e) {
      this.setItemView(e);
      this.toggleFormDetail();
    },

    openFilters(type) {
      this.filterType = type;
      this.modalFilters = !this.modalFilters;
    },

    filterItems() {
      this.items = this.products.filter((e) => e.price >= this.filters.price.min && e.price <= this.filters.price.max);
      this.modalFilters = false;
      this.modalLoading = true;
      setTimeout(() => { this.modalLoading = false; }, 4000);
    },
  },
  mounted() {
    this.items = this.products;
  },
};

</script>
