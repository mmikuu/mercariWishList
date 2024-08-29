<template>
  <v-container class="pa-4" max-width="600">
    <v-card class="mx-auto" outlined>
      <v-card-title>Upload Item Image</v-card-title>
      <v-card-text>
        <v-file-input
          label="Select an image"
          accept="image/*"
          v-model="selectedFile"
          prepend-icon="mdi-camera"
          @change="onFileSelected"
        ></v-file-input>

        <!-- 画像プレビュー -->
        <v-img
          v-if="previewImage"
          :src="previewImage"
          alt="Preview"
          max-width="300"
          class="mx-auto my-4"
        ></v-img>

        <!-- アップロードボタン -->
        <v-btn v-if="selectedFile" color="primary" @click="uploadImage">
          Upload Item Image
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";
const emit = defineEmits(["movepage"]);

const selectedFile = ref(null);
const previewImage = ref(null);

const onFileSelected = () => {
  if (selectedFile.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(selectedFile.value);
  }
};

const uploadImage = async () => {
  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append("img_file", selectedFile.value);

  // アップロード処理（例: axiosを使用）
  // axios.post('your-upload-url', formData)
  const response = await fetch("http://localhost:8000/contents", {
    method: "POST",
    body: formData, // FormDataオブジェクトをリクエストボディに設定
  });
  console.log(response);

  // 状態のリセット
  selectedFile.value = null;
  previewImage.value = null;
};
</script>
