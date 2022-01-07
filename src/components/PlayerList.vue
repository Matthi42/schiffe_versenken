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
      <select v-model="selectedTurn">
        <option
          v-for="turn in turnOptions"
          v-bind:value="turn.id"
          :key="turn.id"
        >
          {{ turn.option }}
        </option>
      </select>
      <button :disabled="!selectedPlayer.name" @click="challenge">
        herausfordern
      </button>
      <ul class="player-list">
        <li v-for="player in players" v-bind:key="player.id">
          <div
            @click="selectPlayer(player)"
            :style="{
              backgroundColor:
                selectedPlayer.id == player.id ? 'lightcyan' : '',
            }"
          >
            {{ player.name }}
          </div>
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
  challenge():void {
    let firstMove = "";
    switch (this.selectedTurn) {
      case 1:
        firstMove = Math.random() < 0.5 ? "me" : "you";
        break;
      case 2:
        firstMove = "me";
        break;
      case 3:
        firstMove = "you";
        break;
    }
    this.$store.commit("challenge", [this.selectedPlayer.id, firstMove]);
  }

  selectedPlayer: any = {};

  selectedTurn = 1;
  turnOptions = [
    { id: 1, option: "zufallig" },
    { id: 2, option: "ich" },
    { id: 3, option: "gegner" },
  ];

  selectPlayer(player: Player):void {
    this.selectedPlayer = player;
  }

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

  selectedOption = "";

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
    div {
      &:hover {
        background-color: lightblue;
        cursor: pointer;
      }
    }
  }
}
</style>