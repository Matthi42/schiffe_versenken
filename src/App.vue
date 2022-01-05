<template>
  <div>
    <h1>Schiffe versenken</h1>
    <div v-for="name in namen" v-bind:key="name" :style="{ backgroundColor: color(name), color: textColor(color(name))}">{{ name }}</div>
    <button title="send" @click="send()">send</button>
    <p>{{ lastMessage }}</p>
    <input type="text" v-model="message" />
  </div>
  <router-view />
</template >

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { luminanceOfString, nameToColor } from "@/color/color"

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

  namen = ["Sophie", "Peter", "Alf", "Eda", "Miriam", "Uwe", "Heino"]

  color(a:string) {
    return nameToColor(a)
  }
  textColor(a:string) {
    return luminanceOfString(a) > 50 ? 'white' : 'black'
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
