<template>
  <div class="boardList">
    <div class="card text-center">
      <BoardItemNavigation :boards="boards"></BoardItemNavigation>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BoardItem from "@/components/board/BoardItem.vue";
import BoardItemNavigation from "@/components/board/BoardItemNavigation.vue";
import Board from "@/entities/Board";

// @todo: temporary until I implement API Platform to retrieve the boards
import boards from "@/data/boards.ts";

@Component({
  components: { BoardItem, BoardItemNavigation }
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
    this.boards = await this.retrieveBoards()
  }

  /**
   * "methods"
   */
  async retrieveBoards() {
    return boards;
  }
}
</script>
