import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/tailwind.scss';

library.add(faTwitter)
library.add(faFacebook)
library.add(faYoutube)
library.add(faPhone)
library.add(faEnvelope)
library.add(faWindowMaximize)

Vue.component('Icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
