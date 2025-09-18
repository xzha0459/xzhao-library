// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyChAKWzhY0wtzZ1RMfBg3zEZPDnXEMfBt0",
  authDomain: "fit5032-week-6-204c9.firebaseapp.com",
  projectId: "fit5032-week-6-204c9",
  storageBucket: "fit5032-week-6-204c9.firebasestorage.app",
  messagingSenderId: "917107337890",
  appId: "1:917107337890:web:dc3f4a09fc2637c70f45fb"
};

// Initialize Firebase
initializeApp(firebaseConfig);

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    }
  }
});

// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')
