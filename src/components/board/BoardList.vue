<template>
  <div class="boardList">
    <BoardItemNavigation :boards="boards"></BoardItemNavigation>
      <router-view></router-view>
    <!-- <BoardItem
      v-for="board in boards"
      :key="board.id"
      :board="board"
    ></BoardItem>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BoardItem from "@/components/board/BoardItem.vue";
import BoardItemNavigation from "@/components/board/BoardItemNavigation.vue";
import Board from "@/entities/Board";

@Component({
  components: { BoardItem, BoardItemNavigation }
})
export default class BoardList extends Vue {
  boards: Array<Board> = [];
  width: number = 800;
  height: number = 800;

  beforeMount() {
    this.boards = [
      {
        id: 1,
        name: "Work",
        description: "This board is for work-related stuff",
        color: "lightblue",
        privacy: "hidden"
      },
      {
        id: 2,
        name: "Personal",
        description: "Personal projects and such",
        color: "lightgreen",
        privacy: "hidden"
      },
      {
        id: 3,
        name: "Fun",
        description: "Some fun stuff belongs here... Yay!",
        color: "lightyellow",
        privacy: "hidden"
      },
      {
        id: 4,
        name: "Important",
        description: "Important stuff goes here.",
        color: "lightsalmon",
        privacy: "hidden"
      }
    ];
  }
}
</script>

<style scoped>
.boardList {
  position: relative;
}
</style>
