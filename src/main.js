import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; // optional
import Row from 'primevue/row'; // optional

const app = createApp(App);

// 配置PrimeVue
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    }
  }
});

// 全局注册PrimeVue组件
app.component('DataTableComponent', DataTable);
app.component('ColumnComponent', Column);
app.component('ColumnGroupComponent', ColumnGroup);
app.component('RowComponent', Row);

app.mount("#app");
