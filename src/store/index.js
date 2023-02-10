import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/extensions
import StoreProfile from './modules/profile';
import menu from './modules/menu';
import WebServices from './modules/webservices';
import mensaje from './modules/mensaje';
import messenger from './modules/messenger';
import catalogue from './modules/catalogue';
import navigationDrawer from './modules/drawer';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    WebServices,
    StoreProfile,
    menu,
    navigationDrawer,
    mensaje,
    messenger,
    catalogue,
  },
});
