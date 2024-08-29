<script setup>
import Headerbar from './components/headerbar.vue';
import Uploader from './components/uploader.vue';
import Wishlist from './components/wishlist.vue';
import { ref } from 'vue';

const uploader = ref(true);

const movePage = (page) => {
  if (page === 1) {
    uploader.value = true;
  } else {
    uploader.value = false;
  }
};

</script>

<template>
  <v-app>
    <v-main>
      <Headerbar @movepage="movePage"/>
      <Uploader v-if="uploader"/>
      <Wishlist v-else/>
    </v-main>
  </v-app>
</template>

<style scoped>
/* 必要に応じて追加のスタイルをここに書いてください */
</style>


