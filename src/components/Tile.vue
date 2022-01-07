<template>
  <svg
    @click="log()"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
    :width="size"
    :height="size"
    viewBox="0 0 847 847"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <radialGradient
        id="id0"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(1 -0 -0 0.572289 0 182)"
        cx="423.97"
        cy="424.45"
        r="3.32"
        fx="423.97"
        fy="424.45"
      >
        <stop offset="0" style="stop-opacity: 1; stop-color: #4b97c4" />
        <stop offset="1" style="stop-opacity: 1; stop-color: #65e0c9" />
      </radialGradient>
    </defs>

    <g id="Ebene_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer" />
      <rect id="tile" class="fil0 str0" x="1" y="2" width="847" height="847" />
    </g>
    <!--
 </g>
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
    -->
  </svg>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";

@Options({
  props: {
    pos: { x: Number, y: Number },
    wasBombt: Boolean,
    onDragOver: Function,
    onDragLeave: Function,
    onDrop: Function,
  },
})
export default class Tile extends Vue {
  si = 60;
  get size(): string {
    return this.si + "px";
  }
  pos = {};

  log(): void {
    console.log(this.pos);
  }
}
</script>


<style scoped lang="scss">
@charset "UTF-8";
.str0 {
  stroke: #549aab;
  stroke-width: 20;
}
.fil0 {
  fill: url(#id0);
}
</style>