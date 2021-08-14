import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import '@/styles/layout.scss'

createApp(App).use(PrimeVue).mount('#app')
