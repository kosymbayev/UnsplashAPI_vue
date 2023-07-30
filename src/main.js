import { createApp } from 'vue'

import './css/normalize.css'
import './css/style.css'

import App from './App.vue'
import store from './vuex/store'
import router from './router'

createApp(App).use(store).use(router).mount('#app')