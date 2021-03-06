import { createApp } from 'vue'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket-vue3'
import router from './router'
import store from './store'

export default createApp(App).use(store).use(router).use(VueNativeSock, "ws://192.168.0.251:3000", { store: store },).mount('#app')

