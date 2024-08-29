import { createApp } from 'vue'
import './style.css'
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import '@mdi/font/css/materialdesignicons.css';
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // Material Design Iconsを使用
      },
  });

createApp(App).use(vuetify).mount('#app')
