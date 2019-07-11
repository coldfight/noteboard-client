<template>
  <div class="boardItem">
    <div class="card-body" v-if="board" :style="{color: board.color}">
      <h4 :id="`board_${board.id}`" class="card-title">{{ board.name }}</h4>
      <p class="card-text">{{ board.description }}</p>
      <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import _ from "lodash";
import Board from "@/entities/Board";

// @todo: temporary until I implement API Platform to retrieve the boards
import boards from "@/data/boards.ts";

@Component({
  components: {}
})
export default class BoardItem extends Vue {
  board: Board | null = null;
  async beforeMount() {
    this.board = await this.retrieveBoard();
  }

  async retrieveBoard() {
    const matchedBoards = _.filter(
      boards,
      (board: Board) => board.id === parseInt(this.$route.params.id)
    );
    return matchedBoards.length > 0 ? matchedBoards[0] : null;
  }
}
</script>
