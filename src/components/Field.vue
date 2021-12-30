<template>
  <div class="container">
    <Tile
      :wasBombt="false"
      :pos="{ x: (a % 10) + 1, y: Math.floor(a / 10) + 1 }"
      @dragenter="putShip({ x: (a % 10) + 1, y: Math.floor(a / 10) + 1 })"
      v-for="a in array"
      v-bind:key="a"
      :style="position(a)"
    ></Tile>
    <div
      class="ship"
      :draggable="setUp"
      :style="`grid-area: ${shipPos.y}/${shipPos.x}/${shipPos.y}/${
        shipPos.x + 5
      };`"
    >
      <svg width="300" height="60" class="ship">
        <rect
          width="300"
          height="60"
          :style="`fill: rgb(0, 0, 255); stroke-width: 3; stroke: rgb(0, 0, 0)`"
        />
      </svg>
    </div>
    <div class="shipII" draggable="true"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Tile from "./Tile.vue";

@Options({
  components: {
    Tile,
  },
  props: {
    setUp: Boolean,
  },
})
export default class Field extends Vue {
  position(a: number): string {
    return `grid-area:${Math.floor(a / 10) + 1}/${(a % 10) + 1}/${
      Math.floor(a / 10) + 2
    }/${(a % 10) + 2};`;
  }
  test() {
    console.log("test");
  }

  shipPos = { x: 12, y: 3 };
  putShip(a: any) {
    if (a.x < 7) this.shipPos = a;
  }
  array = [...Array(100).keys()];

  dragging = false;

  setdrag(a: boolean) {
    this.dragging = a;
  }
}
</script>

<style lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 0 0;
  height: 600px;
  width: 1200px;
}
.element {
  display: grid;
}
.ship {
  height: 60px;
  &:not(.dragging) {
    transition-property: transform;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
  }
}

[draggable="true"] {
  cursor: move;
}
</style>