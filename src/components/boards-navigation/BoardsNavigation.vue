<template>
  <div class="boardsNavigation">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <BoardsNavigationItem v-for="board in boards" :key="board.id" :board="board" />
        <li class="nav-item">
          <a
            href="#"
            @click.prevent="createNewBoard"
            class="nav-link pl-2 pr-2 border-top border-right border-left"
            title="New Board"
          >
            <span class="oi oi-plus" aria-hidden="true"></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import BoardsNavigationItem from "@/components/boards-navigation/BoardsNavigationItem.vue";
import Board from "@/entities/Board";

@Component({
  components: { BoardsNavigationItem }
})
export default class BoardsNavigation extends Vue {
  /**
   * "props"
   */
  @Prop({ default: () => [] }) boards!: Array<Board>;

  /**
   * "methods"
   */
  createNewBoard(e: any) {
    this.$emit("create-new-board");
  }
}
</script>
