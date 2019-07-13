<template>
  <div class="boardsNavigation">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <BoardsNavigationItem
          v-for="board in boards"
          :key="board.id"
          :board="board"
        />
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
}
</script>
