import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import srore from './store/index'
import 'default-passive-events'
createApp(App).use(router).use(srore).use(ElementPlus).mount('#app')
