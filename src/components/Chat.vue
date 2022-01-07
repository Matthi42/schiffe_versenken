<template>
  <div>
    <h2>globaler chat</h2>
    <div class="chat-body" id="chat" @change="scrollToBottom">
      <ul>
        <li
          v-for="(c, i) in chat"
          :key="i"
        >
          <div class="chat-element" :style="{ justifyContent: c.sender ? 'flex-start' : 'flex-end' }">
            <div
              class="chat-name"
              :style="{
                color: textColor(color(c.sender)),
                backgroundColor: color(c.sender),
              }"
            >
              {{ c.sender ? c.sender : "ich" }}
            </div>
            <div class="chat-text">{{ c.message }}</div>
          </div>
        </li>
      </ul>
    </div>
    <input @keypress.enter="sendChat" v-model="currentChat" />
    <button @click="sendChat">senden</button>
  </div>
</template>


<script lang="ts">
import { luminanceOfString, nameToColor } from "@/color/color";
import { ChatMessageI } from "@/types/playerList";
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    global: Boolean,
    partner: Number,
  },
})
export default class Chat extends Vue {
  currentChat = "";

  get chat():ChatMessageI[] {
    return this.$store.getters.globalChat;
  }
  sendChat():void {
    if (this.currentChat != "") {
      this.$store.commit("sendGlobalChat", this.currentChat);
      this.currentChat = "";
    }
  }

  color(a: string):string {
    return nameToColor(a);
  }
  textColor(a: string):'white'|'black' {
    return luminanceOfString(a) < 125 ? "white" : "black";
  }
  scrollToBottom():void {
    const container = this.$el.querySelector("#chat");
    container.scrollTop = container.scrollHeight;
  }
}
</script>
<style scoped lang="scss">
.chat-body {
  overflow-y: scroll;
  height: auto;
  min-height: 100% !important;

  ul {
    li {
      list-style: none;
      padding: 4px;
    }
  }
}
.chat-element {
  display: flex;
}
.chat-name {
  border-radius: 3px 10px;
  padding: 3px;
  height: 18.5px;
}
.chat-text {
  padding: 3px;
  background-color: rgb(228, 228, 228);
  border-radius:5px;
  margin-left: 8px;
  margin-right: 8px;
  max-width: 60%;
}
</style>