import { createApp } from 'vue'

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// import style
// 引入的各种样式，如normalize.css、tailwind.css、uno.css等
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// import '@unocss/reset/tailwind.css'            // 这里放开会导致式样错乱
import 'normalize.css/normalize.css'              // A modern alternative to CSS resets
import './style.css'                              //项目内的样式，注意：最好放在重置样式后，uno.css前
import './tailwind.css'
import 'element-plus/dist/index.css'
import './assets/css/icon.css'
import 'uno.css'

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// import section
// 引入的各种第三方模块，如Element Plus、Vue Router、Vuex等
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

import router, { setupRouter } from './router'    // 引入Vue-router路由
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 引入Element Plus图标

// 全局引入Element Plus（本工程使用按需引入，这里注释掉）
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import store from './store'                       // 引入Vuex
import { createI18n } from 'vue-i18n'             // 引入vue-i18n，用于国际化
import messages from "@intlify/unplugin-vue-i18n/messages";

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// createApp
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
import App from './App.vue'
const app = createApp(App)

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// setting
// 各种第三方模块的设置，如Element Plus、Vue Router、Vuex等
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// 设置Vue-router路由
setupRouter(app)

// 设置Element Plus（本工程使用按需引入，这里注释掉）
// app.use(ElementPlus)

// 设置Vuex
app.use(store)

// 设置vue-i18n
const i18n = createI18n({
  legacy: false,  // you must specify `false`, to use Composition API, enables the Composition API.
  globalInjection: true,  // allows you to use `this.$i18n` and `this.$t` in each component
  locale: "en", // set locale
  fallbackLocale: "en", // set fallback locale
  availableLocales: ["en", "cn"], // set locale messages
  messages: messages, // set locale messages
});
app.use(i18n)

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

router.isReady().then(() => {
  app.mount('#app')
})
