<template>
  <svg
    @click="log()"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
    xmlns="http://www.w3.org/2000/svg"
    xml:space="preserve"
    :width="size"
    :height="size"
    version="1.1"
    style="
      shape-rendering: geometricPrecision;
      text-rendering: geometricPrecision;
      image-rendering: optimizeQuality;
      fill-rule: evenodd;
      clip-rule: evenodd;
    "
    viewBox="0 0 847 847"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g id="Ebene_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer" />
      <g>
        <polygon id="tile" class="fil0" points="847,847 0,847 0,0 847,0 " />
        <path
          id="1"
          class="fil1"
          d="M847 847l-847 0 0 -847 847 0 0 847zm-827 -20l807 0 0 -807 -807 0 0 807z"
        />
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";

@Options({
  props:{
    pos:{x:Number,y:Number},
    wasBombt: Boolean,
    onDragOver: Function,
    onDragLeave: Function,
    onDrop: Function
  }
})
export default class Tile extends Vue {
  si = 60;
  get size() :string {
    return this.si + "px";
  }
  pos = {}

  log(): void {
    console.log(this.pos);
  }
}
</script>


<style scoped lang="scss">
@charset "UTF-8";
.fil1 {
  fill: black;
}
.fil0 {
    fill: white;
    &:hover{
        fill:aqua;
    }
}
</style>