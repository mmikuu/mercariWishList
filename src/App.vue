<script setup>
import Headerbar from './components/headerbar.vue';
import Uploader from './components/uploader.vue';
import Wishlist from './components/wishlist.vue';
import Chart from './components/chart.vue';
import Kanri from './components/kanri.vue';
import  Chat from './components/chat.vue';
import { ref } from 'vue';

const uploader = ref(false);
const chatbot = ref(false)
const wishlist = ref(false);
const chart = ref(false);
const kanri = ref(true);
const prop = ref(null)


const toChart = (item) => {
    chart.value = true; 
    uploader.value = false;
    chatbot.value = false;
    wishlist.value = false;
    kanri.value = false;
    prop.value = item;
}


const movePage = (page) => {
  if (page === 1) {
    kanri.value = true;
    chatbot.value = false;
    wishlist.value = false;
    chart.value = false;
    uploader.value = false;
  } else if (page === 2) {
    uploader.value = false;
    chatbot.value = false;
    wishlist.value = true;
    chart.value = false;
    kanri.value = false;
  } else if (page === 3) {
    uploader.value = false;
    chatbot.value = true;
    wishlist.value = false;
    chart.value = false;
    kanri.value = false;
  } else if (page === 4) {
    uploader.value = false;
    chatbot.value = false;
    wishlist.value = false;
    chart.value = true;
    kanri.value = false;
  }else {
    uploader.value = false;
    chatbot.value = false;
    wishlist.value = false;
    chart.value = false; 
    uploader.value = true;
  }
};

console.log(movePage.value);

</script>

<template>
  <v-app>
    <v-main>
      <Headerbar @movepage="movePage"/>
      <Uploader v-if="uploader"/>
      <Wishlist v-if="wishlist"/>
      <Chat v-if="chatbot"/>
      <Chart v-if="chart" :data="prop"/>
      <Kanri v-if="kanri" @tochart="toChart"/>
    </v-main>
  </v-app>
</template>

<style scoped>
/* 必要に応じて追加のスタイルをここに書いてください */
</style>


