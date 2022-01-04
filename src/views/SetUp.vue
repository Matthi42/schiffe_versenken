<template>
  <div class="home">
    <div
      id="light"
      :style="{ 'background-color': color }"
      @click="toGame"
    ></div>
    <div
      id="light"
      :style="{ 'background-color': color2 }"
      @click="toGame"
    ></div>
    <Field :setUp="true"></Field>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue";
import Field from "@/components/Field.vue";

@Options({
  components: {
    HelloWorld,
    Field,
  },
})
export default class SetUp extends Vue {
  get color(): string {
    return this.$store.getters.validationFull ? "green" : "red";
  }
  get color2(): string {
    return this.$store.getters.validationPartial ? "green" : "red";
  }

  toGame(): void {
    this.$router.push("game");
  }
}
</script>
<style lang="scss" scoped>
#light {
  border-radius: 40px;
  width: 80px;
  height: 80px;
}
</style>
