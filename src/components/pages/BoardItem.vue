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
        <h4 :id="`board_${board.id}`" class="card-title">{{ board.name }}</h4>
        <p class="card-text">{{ board.description }}</p>
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
