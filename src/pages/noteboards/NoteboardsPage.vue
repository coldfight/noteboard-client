<template>
  <div class="noteboardsPage" :style="{ width, height }">
    <div class="card text-center" style="height: 100%; overflow: hidden;">
      <BoardsNavigation :boards="boards" />
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
import BoardsNavigation from "@/components/boards-navigation/BoardsNavigation.vue";
import Board from "@/entities/Board";
import BoardsService from "@/services/api-services/BoardsService";

@Component({
  components: { BoardsNavigation }
})
export default class NoteboardsPage extends Vue {
  /**
   * "data"
   */
  boards: Array<Board> = [];
  width: string | null = "100%";
  height: string | null = "94vh";

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
    const response = await BoardsService.getAll();
    if (response.data) {
      this.boards = response.data;
    }
  }
}
</script>

<style scoped>
.noteboardsPage {
  padding: 20px;
}
</style>