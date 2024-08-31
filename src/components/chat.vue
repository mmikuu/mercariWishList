<template>

    <v-container id="chat-bot" class="pa-4" max-width="600">
      <v-card>
        <v-card-title>
          Chat Bot
        </v-card-title>
  
        <v-divider></v-divider>
  
        <v-card-text>
          <v-list class="chat-window">
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
  const type = ref(null)
  const formData = ref(null)

  const firstMessage = { text: 'what device do you want to manage??', sender: 'bot', type: 'text' };

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

    if (step.value == 0 && newMessage.value.trim().toLowerCase() === 'iphone') {
      formData.value.append('device', newMessage.value.trim());
      messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
      newMessage.value = '';
      messages.value.push({ text: 'send a picture of your iphone', sender: 'bot', type: 'text' });
      step.value = 1;
      scrollToEnd();
      return;
    } else if (step.value == 2) {
      step.value = 3;
      formData.value.append('type', newMessage.value.trim());
      messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
      newMessage.value = '';
      messages.value.push({ text: 'how much storage does it have?', sender: 'bot', type: 'text' });
      scrollToEnd();
      return;
    } else if (step.value == 3) {
      formData.value.append('storage', newMessage.value.trim());
      messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
      newMessage.value = '';
      messages.value.push({ text: 'Thank you for much', sender: 'bot', type: 'text' });
      step.value = 0;
      waitingForPC.value = false;
      scrollToEnd();
      // パスは適当です
      response = await fetch("http://localhost:8000/contents", {
        method: "POST",
        body: formData.value, // FormDataオブジェクトをリクエストボディに設定
      });
      return;
    }


    if (previewImage.value !== null && step.value === 1) {
        formData.value.append('image', selectedFile.value);
        messages.value.push({ imageUrl: previewImage.value, sender: 'user', type: 'image' });
        step.value = 2
        selectedFile.value = null
        previewImage.value = null
        messages.value.push({ text: 'what kind of iphone is it?', sender: 'bot', type: 'text' });
        return 
    }


    if (newMessage.value.trim() === '') return;
      const messageContent = newMessage.value.trim().toLowerCase();
      messages.value.push({ text: newMessage.value, sender: 'user', type: 'text' });
      newMessage.value = '';

  };
  
  const scrollToEnd = () => {
    nextTick(() => {
      const chatWindow = document.querySelector('.chat-window');
      chatWindow.scrollTop = chatWindow.scrollHeight;
    });
  };
  </script>
  
  <style scoped>
  #chat-bot {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .chat-window {
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
  
  
