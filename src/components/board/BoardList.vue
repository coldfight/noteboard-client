<template>
  <div class="boardList">
    <BoardItem v-for="board in boards" :key="board.id" :board="board"></BoardItem>
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

  beforeMount() {
    console.log("BoardList beforeMount");
    this.boards = [
      new Board(1, "Work", "This board is for work-related stuff", "lightblue", "hidden"),
      new Board(2, "Personal", "Personal projects and such", "lightgreen", "hidden"),
      new Board(3, "Fun", "Some fun stuff belongs here... Yay!", "lightyellow", "hidden"),
      new Board(4, "Important", "Important stuff goes here.", "lightsalmon", "hidden"),
    ]
  }
}
</script>
