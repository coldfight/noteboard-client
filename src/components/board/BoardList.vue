<template>
  <div class="boardList">
    <canvas
      id="myCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
      style="border: 1px solid #FFF;"
    ></canvas>
    <!-- <BoardItem
      v-for="board in boards"
      :key="board.id"
      :board="board"
    ></BoardItem> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BoardItem from "@/components/board/BoardItem.vue";
import Board from "@/entities/Board";

@Component({
  components: { BoardItem }
})
export default class BoardList extends Vue {
  boards: Array<Board> = [];
  canvasWidth: number = 800;
  canvasHeight: number = 800;

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
  text-align: center;
  margin: 50px auto;
}
</style>
