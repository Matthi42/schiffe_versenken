<template>
  <div>
    <h1>Schiffe versenken</h1>
  </div>
  <router-view />
</template >

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { luminanceOfString, nameToColor } from "@/color/color"

@Options({})
export default class App extends Vue {




}
</script>


<style lang="scss">
  html {
    width: 100% !important;
    display: inline;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button  {
  border-radius: 5px;
  border-color: darkblue;
  color: white;
  background-color: rgb(98, 107, 241);
  margin: 4px;
  padding: 2px 6px;
  &:hover{
    background-color: rgb(130, 138, 243);
  }
  &:disabled{
    background-color: rgb(192, 192, 192);
    cursor: not-allowed;
  }
}
input {
  border-radius: 5px;
  border-width: 1px;
  margin: 5px;
  padding: 2px 6px;
}
</style>
