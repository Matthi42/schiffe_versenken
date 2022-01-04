<template>
  <div class="container">
    <!--@dragenter="putShip({ x: (a % 10) + 1, y: Math.floor(a / 10) + 1 })"-->

    <Tile
      @drop="onDrop($event, a)"
      @dragenter.prevent
      @dragleave.prevent
      @dragover.prevent
      :style="position(a)"
      v-for="a in array"
      v-bind:key="a"
      :wasBombt="false"
      :pos="{ x: (a % 10) + 1, y: Math.floor(a / 10) + 1 }"
    ></Tile>

    <div
      v-for="ship in ships"
      v-bind:key="ship.shipID"
      @dragstart="startDrag($event, ship.shipID)"
      @click="rotate(ship.shipID)"
      class="ship"
      :draggable="setUp"
      :style="`grid-area: 
      ${ship.shipPos.y}/
      ${ship.shipPos.x}/
      ${
        ship.orientation == 'vertical'
          ? ship.shipSize + ship.shipPos.y
          : ship.shipPos.y
      }/
      ${
        ship.orientation == 'horizontal'
          ? ship.shipPos.x + ship.shipSize
          : ship.shipPos.x
      };
      ${
        ship.orientation == 'vertical'
          ? `height:${60 * ship.shipSize}px;width:60px;`
          : `width:${60 * ship.shipSize}px;height:60px;`
      }`"
    >
      <svg
        :width="60 * ship.shipSize"
        height="60"
        class="ship"
        :transform="
          ship.orientation === 'horizontal'
            ? `rotate(0,${(ship.shipSize * 60) / -2 + 30},0)`
            : `rotate(90,${(ship.shipSize * 60) / -2 + 30},0)`
        "
      >
        <rect
          :width="60 * ship.shipSize"
          height="60"
          :style="`fill: rgb(0, 0, 255); stroke-width: 3; stroke: rgb(0, 0, 0)`"
        />
      </svg>
    </div>
    <div class="shipII" draggable="true"></div>
  </div>
</template>

<script lang="ts">
import { Ship } from "@/types/serverCom";
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
  setUp = false;
  position(a: number): string {
    return `grid-area:${Math.floor(a / 10) + 1}/${(a % 10) + 1}/${
      Math.floor(a / 10) + 2
    }/${(a % 10) + 2};`;
  }
  get ships(): Ship[] {
    return this.$store.getters.allShips;
  }
  rotate(id: number):void {
    if(this.setUp)
    this.$store.commit("rotateShip", id);
  }
  array = [...Array(100).keys()];

  startDrag(event: DragEvent, ship: number) :void {
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("ship", ship.toString());
    }
  }
  onDrop(event: DragEvent, tile: number):void {
    if (this.setUp) {
      const shipID = event.dataTransfer?.getData("ship");
      this.$store.commit("moveShip", [
        (tile % 10) + 1,
        Math.floor(tile / 10) + 1,
        shipID,
      ]);
    }
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
  transition-property: transform;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  transition: grid-area 0.2s;
}

[draggable="true"] {
  cursor: move;
}
</style>