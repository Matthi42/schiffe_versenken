<template>
  <div>
    <h1>Schiffe versenken</h1>
    <button title="send" @click="send()">send</button>
    <p>{{ lastMessage }}</p>
    <input type="text" v-model="message" />
  </div>
  <router-view />
</template >

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class App extends Vue {
  get lastMessage():string {
    return this.$store.getters.lastMessage;
  }
  message = "";
  send() :void{
    this.$socket.send (
      JSON.stringify({
        type: "broadcast",
        message: this.message,
      })
    );
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
