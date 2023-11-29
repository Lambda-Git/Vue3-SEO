import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {store} from './store.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { ElConfigProvider } from 'element-plus'


const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.component(ElConfigProvider,[ElConfigProvider.name])

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
