<template>
  <v-footer padless style="z-index:9999 !important;">
    <CurvedBottomNavigation
      v-if="show && !preload && !showModalAlert && showNavigationBar"
     :options="options"
     v-model="selected"
     :foregroundColor="profile.color || blue-grey"
     iconColor="#282828">
      <template #icon="{ props }">
        <v-icon
          :color="profile.color || blue-grey"
          class="material-icons">{{ props.icon }}
        </v-icon>
      </template>
      <template #title="{ props }">
        <b>{{ props.title }}</b>
      </template>
    </CurvedBottomNavigation>
  </v-footer>
</template>

<script>
// eslint-disable-next-line import/newline-after-import
import { mapMutations, mapState } from 'vuex';
import { CurvedBottomNavigation } from 'bottom-navigation-vue';
// eslint-disable-next-line import/extensions
import { DB } from '../plugins/database';

export default {
  components: { CurvedBottomNavigation },
  data() {
    return {
      show: false,
      profile: { color: 'gray', userid: null, organization: [{ name: '' }] },
      selected: 1,
      options: [
        {
          id: 0,
          icon: 'redeem',
          title: 'CATALOGO',
        },
        {
          id: 1,
          icon: 'home',
          title: 'INICIO',
        },
        {
          id: 2,
          icon: 'shopping_cart',
          title: 'CARRITO',
        },
      ],
    };
  },
  computed: {
    ...mapState('mensaje', ['showModalAlert']),
    ...mapState('menu', ['showNavigationBar', 'catalogue', 'shopcart']),
    ...mapState('WebServices', ['preload']),
  },
  methods: {
    ...mapMutations('menu', ['HOME', 'CATALOGUE', 'SHOPCART']),

    async loadProfile() {
      if (this.profile.userid === null) {
        this.profile = await DB.session.get(1);
      }
    },
  },
  mounted() {
    this.loadProfile();

    setTimeout(() => {
      this.show = true;
    }, 3000);
  },
  watch: {
    selected: {
      handler(key) {
        switch (key) {
          case 0:
            this.CATALOGUE();
            break;
          case 1:
            this.HOME();
            break;
          case 2:
            this.SHOPCART();
            break;
          default:
            break;
        }
      },
    },
  },
};
</script>
