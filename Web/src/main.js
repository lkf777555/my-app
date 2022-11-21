import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import srore from './store/index'

createApp(App).use(router).use(srore).use(ElementPlus).mount('#app')
