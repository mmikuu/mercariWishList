<template>
    <v-app>
      <v-container>
        <v-card class="pa-4" outlined>
          <v-card-title>
            Add Items to Your Wishlist
          </v-card-title>
  
          <v-card-text>
            <!-- 入力フィールド -->
            <v-text-field
              v-model="newItem"
              label="項目を入力してください"
              @keyup.enter="addItem"
              clearable
            ></v-text-field>
  
            <!-- 追加ボタン -->
            <v-btn color="primary" @click="addItem">
              追加
            </v-btn>
  
            <!-- リスト -->
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item-content>
  
                <!-- 削除ボタン -->
                <v-list-item-action>
                  <v-btn icon @click="removeItem(index)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const newItem = ref(''); // 新しい項目の入力
  const items = ref([]); // リストに表示される項目の配列
  
  // 項目を追加するメソッド
  const addItem = () => {
    if (newItem.value.trim() !== '') {
      items.value.push(newItem.value.trim());
      newItem.value = ''; // 入力フィールドをクリア
    }
  };
  
  // 項目を削除するメソッド
  const removeItem = (index) => {
    items.value.splice(index, 1); // 指定されたインデックスの項目を削除
  };
  </script>
  
  <style scoped>
  /* 必要に応じてスタイルをここに書いてください */
  </style>
  