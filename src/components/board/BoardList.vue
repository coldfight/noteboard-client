<template>
  <div class="boardList" style="height: 100%;">
    <div class="card text-center" style="height: 100%;">
      <BoardsNavigation :boards="boards"></BoardsNavigation>

      <!-- :key is required to allow transitions to work with the same component: 
      https://forum.vuejs.org/t/solved-vue-transitions-not-working/7614-->
      <transition name="fade" mode="out-in">
        <router-view :key="$route.params.id"></router-view>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BoardItem from "@/components/board/BoardItem.vue";
import BoardsNavigation from "@/components/board/boards-navigation/BoardsNavigation.vue";
import Board from "@/entities/Board";

// @todo: temporary until I implement API Platform to retrieve the boards
import boardsData from "@/data/boards.ts";

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
  beforeMount() {
    this.retrieveBoards();
  }

  /**
   * "methods"
   */
  async retrieveBoards() {
    this.boards = boardsData;
  }
}
</script>
