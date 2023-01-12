import Vue from 'vue';
import bottomNavigationVue from 'bottom-navigation-vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  bottomNavigationVue,
  render: (h) => h(App),
}).$mount('#app');
