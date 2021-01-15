/*
 * @Date: 2021-01-10 11:25:42
 * @information: main
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'

import elementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import '@/style/common.scss'

import '@/config/axios'

const app = createApp(App)

app.use(store).use(router).use(elementPlus).mount('#app')

