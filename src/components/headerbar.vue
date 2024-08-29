<template>
  <v-app-bar color="teal-darken-4" app>
    <!-- ナビゲーションアイコン -->
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

    <!-- タイトル -->
    <v-app-bar-title>{{ title }}</v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- アイコンボタン -->
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <v-list :items="items" @click:select="selected"></v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";
const emit = defineEmits(["movepage"]);

const title = ref("My Site");
const drawer = ref(false);

const items = ref([
  { title: "Home", value: 1 },
  { title: "My Wishlist", value: 2 },
]);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const selected = (item) => {
  emit("movepage", item.id);
};
</script>

<style scoped>
/* 必要に応じて追加のスタイルをここに書いてください */
</style>
