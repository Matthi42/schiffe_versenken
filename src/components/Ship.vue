<template>
  <svg
    :width="svgWidth"
    height="60px"
    :viewBox="'0 0 ' + 847 * shipSize + ' 847'"
    :transform="
      ship.orientation === 'horizontal'
        ? `rotate(0,${(ship.shipSize * 60) / -2 + 30},0)`
        : `rotate(90,${(ship.shipSize * 60) / -2 + 30},0)`
    "
  >
    <!-- U-Boot-->
    <g id="Ebene_x0020_1" v-if="shipSize == 2">
      <metadata id="CorelCorpID_0Corel-Layer" />
      <path
        class="fil0 str0"
        d="M1636 265l-78 0 -35 125c-127,-41 -257,-125 -381,-125 -284,0 -567,0 -851,0 -142,0 -257,71 -257,158 0,88 115,158 257,158 284,0 567,0 851,0 123,0 254,-83 381,-124l35 124 78 0 0 -316z"
      />
      <path
        class="fil1 str1"
        d="M547 350c109,0 197,33 197,73 0,41 -88,73 -197,73 -109,0 -197,-32 -197,-73 0,-40 88,-73 197,-73z"
      />
    </g>
    <!-- Zerstörer -->
    <g id="Ebene_x0020_1" v-if="shipSize == 3">
      <metadata id="CorelCorpID_0Corel-Layer" />
      <path
        class="fil0 str0"
        d="M2465 611c-305,16 -610,32 -909,44 -298,12 -591,20 -793,-1 -201,-20 -312,-70 -415,-114 -103,-43 -198,-80 -293,-117 95,-36 190,-73 293,-117 103,-43 214,-93 415,-114 202,-21 495,-13 793,-1 299,13 604,29 909,45l0 375z"
      />
      <rect class="fil1 str0" x="899" y="314" width="172" height="218" />
      <ellipse class="fil4 str0" cx="1533" cy="423" rx="138" ry="51" />
      <polygon
        class="fil3 str0"
        points="835,249 1351,249 1750,287 1750,560 1351,598 835,598 "
      />
    </g>
    <!-- Schlachtschiff -->
    <g id="Ebene_x0020_1" v-if="shipSize == 4">
      <metadata id="CorelCorpID_0Corel-Layer" />
      <path
        class="fil0 str0"
        d="M3360 633c-81,21 -162,31 -257,52 -94,21 -203,53 -376,62 -172,8 -408,6 -646,7 -238,1 -477,5 -721,-21 -245,-26 -494,-82 -717,-138 -222,-57 -419,-114 -616,-172 197,-57 394,-114 616,-171 223,-57 472,-113 717,-139 244,-25 483,-21 721,-20 238,1 474,11 646,20 173,9 282,28 376,48 95,21 176,31 257,53l0 419z"
      />
      <path
        class="fil3 str1"
        d="M703 381l-179 65m232 76l-177 65m150 -135l-177 65m144 -156l161 -59 67 183 -162 58 -59 -162 -3 -9 -4 -11z"
      />
      <path
        class="fil3 str1"
        d="M3021 499l190 0m-192 -151l189 0m-187 75l188 0m-188 97l-172 0 0 -194 172 0 0 173 0 10 0 11z"
      />
      <polygon
        class="fil3 str2"
        points="1551,187 2067,187 2701,244 2701,603 2067,660 1551,660 "
      />
      <rect class="fil3 str2" x="1622" y="244" width="255" height="359" />
      <path
        class="fil3 str3"
        d="M2597 507c-27,-3 -58,-28 -80,-65 -21,-38 -27,-77 -17,-102"
      />
      <path
        class="fil3 str4"
        d="M1972 244l0 359m-46 -83l99 0m-162 -97l235 0m-172 -97l99 0"
      />
      <path
        class="fil5 str5"
        d="M2291 354c88,0 159,31 159,69 0,39 -71,70 -159,70 -87,0 -158,-31 -158,-70 0,-38 71,-69 158,-69z"
      />
      <path
        class="fil3 str1"
        d="M1320 318l-65 -178m-76 231l-64 -177m134 150l-64 -177m156 144l58 162 -182 66 -59 -162 162 -59 9 -3 12 -4z"
      />
    </g>
    <!-- Flugzeugträger -->
    <g id="Ebene_x0020_1" v-if="shipSize == 5">
      <metadata id="CorelCorpID_0Corel-Layer" />
      <g>
        <path
          class="fil0"
          d="M4181 482l-2695 417 -436 -241 -994 -75 2 -272 888 -95 326 -170 2238 6 422 157 212 -33 45 241 -20 174 -474 30 -60 178 -1504 0 2050 -317zm-3132 176l3095 -482 -3095 482z"
        />
        <path
          id="1"
          class="fil1 str0"
          d="M4181 482l-2695 417 -436 -241 -994 -75 2 -272 888 -95 326 -170 2238 6 422 157 212 -33 45 241 -20 174 -474 30 -60 178 -1504 0 2050 -317zm-3132 176l3095 -482"
        />
      </g>
      <rect class="fil0 str0" x="2604" y="115" width="622" height="146" />
    </g>
  </svg>
</template>

<script lang = "ts">
import { Options, Vue } from "vue-class-component";
import { Ship as ShipD } from "@/types/ship";

@Options({
  props: ["ship"],
})
export default class Ship extends Vue {
  ship: ShipD = {
    shipPos: { x: 0, y: 0 },
    shipID: 0,
    shipSize: 2,
    orientation: "horizontal",
  };

  get shipSize() {
    return this.ship.shipSize;
  }
  get shipOrientation() {
    return this.ship.orientation;
  }
  get svgWidth() {
    return this.shipSize * 60 + "px";
  }
}
</script>


<style lang="scss" scoped>
.str0 {
  stroke: #2e3c52;
  stroke-width: 50;
  stroke-linejoin: round;
}

.str5 {
  stroke: #2e3c52;
  stroke-width: 50;
}
.str2 {
  stroke: #2e3c52;
  stroke-width: 50;
  stroke-linejoin: round;
}
.str1 {
  stroke: #333333;
  stroke-width: 50;
  stroke-linejoin: round;
}
.str3 {
  stroke: #2e3c52;
  stroke-width: 50;
  stroke-linecap: round;
}
.str4 {
  stroke: #333333;
  stroke-width: 50;
  stroke-linecap: round;
}

.fil1 {
  fill: #3e5375;
}
.fil0 {
  fill: #577099;
}
.fil2 {
  fill: #ff6600;
}
.fil3 {
  fill: none;
}
.fil4 {
  fill: #202a3b;
}
.fil5 {
  fill: #333333;
}
</style>