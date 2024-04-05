import './assets/css/satoshi.css'
import './assets/css/style.css'
import 'jodit/build/jodit.min.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import JoditVue from 'jodit-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(JoditVue)

app.mount('#app')
