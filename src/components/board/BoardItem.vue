<template>
  <div class="boardItem">
    <div v-if="board"  class="card-body" :style="{ color: board.color }">
      <h4 :id="`board_${board.id}`" class="card-title">{{ board.name }}</h4>
      <p class="card-text">{{ board.description }}</p>
    </div>
    <div v-else class="card-body"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import _ from "lodash";
import Board from "@/entities/Board";

// @todo: temporary until I implement API Platform to retrieve the boards
import boards from "@/data/boards.ts";

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
    setTimeout(() => {
      const matchedBoards = _.filter(
        boards,
        (board: Board) => board.id === parseInt(this.$route.params.id)
      );

      this.board = matchedBoards.length > 0 ? matchedBoards[0] : null;
    }, Math.random() * 1000);
  }
}
</script>
