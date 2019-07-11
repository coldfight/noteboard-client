<template>
  <div class="boardList" style="height: 100%;">
    <div class="card text-center" style="height: 100%;">
      <BoardsNavigation :boards="boards"></BoardsNavigation>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BoardItem from "@/components/board/BoardItem.vue";
import BoardsNavigation from "@/components/board/boards-navigation/BoardsNavigation.vue";
import Board from "@/entities/Board";

// @todo: temporary until I implement API Platform to retrieve the boards
import boards from "@/data/boards.ts";

@Component({
  components: { BoardItem, BoardsNavigation }
})
export default class BoardList extends Vue {
  /**
   * "data"
   */
  boards: Array<Board> = [];

  /**
   * "lifecycle" hook functions
   */
  async beforeMount() {
    this.boards = await this.retrieveBoards();
  }

  /**
   * "methods"
   */
  async retrieveBoards() {
    return boards;
  }
}
</script>
