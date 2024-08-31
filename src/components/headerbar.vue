<template>
  <v-app-bar color="purple darken-2" app>
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
    color="purple darken-2"
  >
    <v-list :items="items" @click:select="selected"></v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";
const emit = defineEmits(["movepage"]);

const title = ref("Bona");
const drawer = ref(false);

const items = ref([
  { title: "Kanri", value: 1 },
  { title: "My Wishlist", value: 2 },
  { title: "Register Spec", value: 3 },
  { title: "Chart", value: 4 },
  { title: "Home", value: 5 }
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
