<template>
  <div>
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
      <ul class="player-list">
        <li v-for="player in players" v-bind:key="player.id">
          {{ player.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Player } from "@/types/playerList";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class PlayerList extends Vue {
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

  currentName = "";
  sendName(): void {
    if (this.currentName != "") this.firstTry = false;
    this.$store.commit("setName", this.currentName);
  }
}
</script>

<style lang="scss" scoped>
    .player-list {
        li {
            list-style: none;
        }
    }
</style>