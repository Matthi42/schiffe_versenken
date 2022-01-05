<template>
  <!--
  <router-link to="/game">Game</router-link> |
  <router-link to="/setup">SetUp</router-link>
  -->
  <div class="main-grid">
    <div>
      <h2>Lobby</h2>
      <div v-if="!validName">
        <p v-show="!firstTry">Name ist bereits vergeben</p>
        <input
          @keypress.enter="sendName"
          v-model="currentName"
          type="text"
          placeholder="choose name"
        />
        <button @click="sendName">senden</button>
      </div>
      <div>
        <h3>{{ myName }}</h3>
        <ul>
          <li v-for="player in players" v-bind:key="player.id">
            {{ player.name }}
          </li>
        </ul>
      </div>
    </div>
    <div>
      <h2>globaler chat</h2>
      <div class="chat-body">
        <ul>
          <li v-for="(c, i) in chat" v-bind:key="i">
            <span>{{ c.sender }}</span
            >: <span>{{ c.message }}</span>
          </li>
        </ul>
      </div>
      <input @keypress.enter="sendChat" v-model="currentChat" />
      <button @click="sendChat">senden</button>
    </div>
    <div></div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Player } from "@/types/playerList";

export default class Lobby extends Vue {
  firstTry = true;
  get players(): Player[] {
    return this.$store.getters.otherPlayers;
  }
  get validName(): string {
    return this.$store.getters.validName;
  }
  get myName(): string {
    return this.$store.getters.myName;
  }
  get chat() {
    return this.$store.getters.globalChat;
  }
  currentName = "";
  currentChat = "";
  sendName(): void {
    if(this.currentName != "")
    this.firstTry = false;
    this.$store.commit("setName", this.currentName);
  }
  sendChat() {
    if (this.currentChat != "") {
      this.$store.commit("sendGlobalChat", this.currentChat);
      this.currentChat = "";
    }
  }
}
</script>
<style scoped lang= "scss">
.main-grid {
  display: grid;
  grid-template: ". . .";
}

.chat-body {
  overflow-y: scroll;
  height: 150px;
}
</style>