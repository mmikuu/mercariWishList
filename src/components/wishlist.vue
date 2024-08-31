<template>
  <v-container id="wish-bot" class="pa-4" max-width="600">
    <v-card>
      <v-card-title>
        Wish Bot
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-list class="wish-window">
          <v-list-item
            v-for="(message, index) in messages"
            :key="index"
            :class="message.sender"
          >
            <v-list-item-content>
              <template v-if="message.type === 'text'">
                <v-chip :color="message.sender === 'user' ? 'primary' : 'grey lighten-1'" text-color="white">
                  {{ message.text }}
                </v-chip>
              </template>
              <template v-else-if="message.type === 'image'">
                <img :src="message.imageUrl" alt="Uploaded Image" style="width: 50%; padding-right: 0%;" class="user"/>
              </template>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-text-field
          v-model="newMessage"
          label="Type a message..."
          @keyup.enter="sendMessage"
          outlined
          dense
          hide-details
          class="flex-grow-1"
        ></v-text-field>
        <v-file-input
          accept="image/*"
          @change="onFileSelected"
          v-model="selectedFile"
          prepend-icon="mdi-camera"
          label="Upload Image"
          outlined
          dense
          hide-details
        ></v-file-input>
        <v-btn @click="sendMessage" color="primary">
          Send
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const messages = ref([]);
const newMessage = ref('');
const selectedFile = ref(null);
const previewImage = ref(null);
const waitingForPC = ref(false);
const step = ref(0);
const formData = ref(null)

const firstMessage = { text: 'what are you looking for? for example, iphone, ipad, pc… ', sender: 'bot', type: 'text' };

setTimeout(() => {
  messages.value.push(firstMessage);
}, 1500);

formData.value = new FormData();

const onFileSelected = () => {
  if (selectedFile.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(selectedFile.value);
  }
};

const sendMessage = async() => {
  if (step.value == 0 && newMessage.value.trim() !== '') {
    messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
    formData.value.append('wanna', newMessage.value);
    newMessage.value = '';
    messages.value.push({ text: 'What\'s iphone type?', sender: 'bot', type: 'text' });
    step.value = 1;
    scrollToEnd();
    return;
  }if (step.value === 1 && newMessage.value.trim() !== '') {
    messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
    formData.value.append('category', newMessage.value);
    newMessage.value = '';
    step.value = 2;
    messages.value.push({ text: 'How much is your max budget?', sender: 'bot', type: 'text' });
    scrollToEnd();
    return;
  }else if (step.value === 2 && newMessage.value.trim() !== '') {
    messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
    formData.value.append('max_budget', newMessage.value);
    newMessage.value = '';
    step.value = 3;
    messages.value.push({ text: 'How much is your min budget?', sender: 'bot', type: 'text' });
    scrollToEnd();
    return;
  }else if (step.value === 3 && newMessage.value.trim() !== '') {
    messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
    formData.value.append('min_budget', newMessage.value);
    newMessage.value = '';
    step.value = 4;
    messages.value.push({ text: 'Do you have a preference for processing speed?', sender: 'bot', type: 'text' });
    scrollToEnd();
    return;
  }else if (step.value == 4 && newMessage.value.trim() !== '') {
    step.value = 5;
    messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
    formData.value.append('speed', newMessage.value);
    newMessage.value = '';
    messages.value.push({ text: 'Do you have a preference for \n camera performance??', sender: 'bot', type: 'text' });
    scrollToEnd();
    return;
  }else if (step.value == 5 && newMessage.value.trim() !== '') {
    step.value = 6;
    messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
    formData.value.append('camera', newMessage.value);
    newMessage.value = '';
    messages.value.push({ text: 'Do you have a preference for which types of cables to use for charging?', sender: 'bot', type: 'text' });
    scrollToEnd();
    return;
  }else if (step.value == 6 && newMessage.value.trim() !== '') {
    step.value = 7;
    messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
    newMessage.value = '';
    messages.value.push({ text: 'Do you have any size preference?', sender: 'bot', type: 'text' });
    scrollToEnd();
    return;
  } else if (step.value == 7 && newMessage.value.trim() !== '') {
    messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
    formData.value.append('size', newMessage.value);
    newMessage.value = '';
    messages.value.push({ text: 'Thank you so much', sender: 'bot', type: 'text' });
    step.value = 0;
    waitingForPC.value = false;
    scrollToEnd();
    // パスは適当です
    response = await fetch("http://localhost:8000/wishes", {
      method: "POST",
      body: formData.value, // FormDataオブジェクトをリクエストボディに設定
    });
    return;
  }

  

  if (newMessage.value.trim() === '') return;
  const messageContent = newMessage.value.trim().toLowerCase();
  messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
  newMessage.value = '';
};

const scrollToEnd = () => {
  nextTick(() => {
    const wishWindow = document.querySelector('.wish-window');
    wishWindow.scrollTop = wishWindow.scrollHeight;
  });
};
</script>

<style scoped>
#wish-bot {
  max-width: 600px;
  margin: 0 auto;
}

.wish-window {
  height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.user {
  justify-content: flex-end;
  display: flex;
}

.bot {
  justify-content: flex-start;
  display: flex;
}
</style>
