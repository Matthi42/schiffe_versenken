<template>
  <h2>Lobby</h2>
  <div class="main-grid">
    <player-list></player-list>
    <chat :global="true"></chat>
    <div><button @click="za">zum Auufbau</button></div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Chat from '@/components/Chat.vue'
import PlayerList from "@/components/PlayerList.vue"

@Options({
  components:{Chat,PlayerList}
})
export default class Lobby extends Vue {
  za() {
    this.$router.push('setup')
  }

}
</script>
<style scoped lang= "scss">
.main-grid {
  display: grid;
  grid-template: ". . .";
}


</style>