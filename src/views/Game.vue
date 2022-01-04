<template>
  <div class="about">
    <button @click="test">test</button>
    <Field :setUp="false"></Field>
  </div>
</template>
<script lang="ts">
import Field from "@/components/Field.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components:{Field}
})
export default class Game extends Vue{
  test(){
    console.debug('test')
    this.$socket.send('{"type":"lol"}')
  }
}
</script>
