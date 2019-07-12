<template>
  <div class="boardItem" style="height: 100%;">
    <!-- This transition is necessary because because it might not be loaded 
    in time for the transition to nicely display this element-->
    <transition name="fade" mode="out-in">
      <div
        v-if="board"
        class="card-body"
        :style="{ height: '100%', backgroundColor: board.color }"
      >
        <div
          :style="{
            color: autoColorFromBackgroundColor,
            mixBlendMode: 'difference'
          }"
        >
          <h4 :id="`board_${board.id}`" class="card-title">{{ board.name }}</h4>
          <p class="card-text">{{ board.description }}</p>
        </div>
      </div>
    </transition>
    <div v-if="!board" class="card-body" :style="{ height: '100%' }">
      Loading...
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import _ from "lodash";
import Board from "@/entities/Board";

// @todo: temporary until I implement API Platform to retrieve the boards
import boardsData from "@/data/boards.ts";

@Component({
  components: {}
})
export default class BoardItem extends Vue {
  /**
   * "data"
   */
  board: Board | null = null;

  /**
   * "watch"
   */
  // Watch for changes to the route. If we're changing to another
  // noteboard we're going to have to pull the new data for it.
  @Watch("$route")
  onRouteChanged(value: any, oldValue: any) {
    this.retrieveBoard();
  }

  /**
   * "computed"
   */
  get autoColorFromBackgroundColor(): string {
    if (this.board) {
      // lets use #fafad2 as example
      let hex: string = this.board.color.toUpperCase();

      // convert HEX into RGB
      // remove the leading #
      hex = hex.replace("#", "");

      if (hex.length !== 6) {
        return "#ffffff";
      }
      // each two digits represent R, G, B, convert each from hex to dec
      let r: number = parseInt(hex.slice(0, 2), 16);
      let g: number = parseInt(hex.slice(2, 4), 16);
      let b: number = parseInt(hex.slice(4, 6), 16);

      // Invert each component 0 to 255
      r = 255 - r;
      g = 255 - r;
      b = 255 - r;

      // convert each component back to hex
      return (
        "#" +
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0")
      );
    }
    return "#ffffff";
  }

  /**
   * "lifecycle" hook methods
   */
  beforeMount() {
    this.retrieveBoard();
  }

  /**
   * "methods"
   */
  async retrieveBoard() {
    this.board = null;
    setTimeout(() => {
      const matchedBoards = _.filter(
        boardsData,
        (board: Board) => board.id === parseInt(this.$route.params.id)
      );

      this.board = matchedBoards.length > 0 ? matchedBoards[0] : null;
    }, Math.random() * 1000);
  }
}
</script>
