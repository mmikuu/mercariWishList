<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <h2 class="text-h5 mb-4">Total: $1497.63</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="(item, index) in items" :key="index">
        <v-card @click="clickCard(item)" class="mb-4" elevation="2" max-height="250px" style="height: 250px;">
          <v-row no-gutters class="fill-height">
            <v-col cols="4">
              <v-img :src="item.image" alt="Item Image" class="rounded-l" contain />
            </v-col>
            <v-col cols="8" class="d-flex align-center pa-2">
              <v-card-text class="pa-0">
                <v-row>
                  <v-col cols="12">
                    <h3 class="text-h6">{{ item.title }}</h3>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-subtitle-1 font-weight-bold">{{ item.price }}</span>
                  </v-col>
                  <v-col cols="12">
                    <span class="text-subtitle-1 font-weight-bold">{{ item.GB }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<!-- <script>
export default {
  data() {
    return {
      items: [
        {
          image: "https://kddi-h.assetsadobe3.com/is/image/content/dam/au-com/common/graph/app/iphone-14/iPhone_14_Blue_01.jpg?scl=1&qlt=90",
          title: "iPhone 14",
          price: "$152.43",
        },
        {
          image: "https://m.media-amazon.com/images/I/41+CLiWu9lL.jpg",
          title: "iphone14",
          price: "$874.3",
        },
        {
          image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSg1dEJ9PVtgyu3apl3oatrtn-3HTpWIHOrUDHzobLjSMujIRR2dVq5d0j6SmZ4wxCJNUUNOAIIQAJVJ7oVA45cPf58PCmNZ8oFSoyI_GSiVZFuQzrJMoe3QLkDf-TUIH1VNGmBu6wr&usqp=CAc",
          title: "PC",
          price: "$350.5",
        },
        {
          image: "data:image/webp;base64,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",
          title: "ipad",
          price: "$120.4",
        },
      ],
    };
  },
};
</script> -->

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(["tochart"]);

const items = ref([
        {
          image: "https://kddi-h.assetsadobe3.com/is/image/content/dam/au-com/common/graph/app/iphone-14/iPhone_14_Blue_01.jpg?scl=1&qlt=90", // 画像URLを入れてください
          title: "iphone14",
          price: "$152.43",
          GB:"256GB",
          
          
        },
        {
          image: "https://m.media-amazon.com/images/I/41+CLiWu9lL.jpg",
          title: "iphone8",
          price: "$874.3",
          GB:"256GB",
        },
        {
          image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSg1dEJ9PVtgyu3apl3oatrtn-3HTpWIHOrUDHzobLjSMujIRR2dVq5d0j6SmZ4wxCJNUUNOAIIQAJVJ7oVA45cPf58PCmNZ8oFSoyI_GSiVZFuQzrJMoe3QLkDf-TUIH1VNGmBu6wr&usqp=CAc",
          title: "PC",
          price: "$350.5",
          GB:"256GB",
        },
        {
          image: "data:image/webp;base64,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",
          title: "ipad",
          price: "$120.4",
          GB: "256GB",
        },
      ])
const clickCard = (item) => {
  emit("tochart", item);
};
</script>

<style scoped>
.kanri-item-list {
  display: flex;
  flex-direction: column;
  width: 300px; /* リストの幅を指定 */
  border: 1px solid #ccc;
}

.kanri-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

.kanri-item:last-child {
  border-bottom: none; /* 最後のアイテムの下線を削除 */
}

.kanri-item-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.kanri-item-details {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
}

.kanri-item-price {
  margin-left: auto;
}
</style>
