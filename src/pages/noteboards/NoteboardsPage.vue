<template>
  <div class="noteboardsPage" :style="{ width, height }">
    <div class="card text-center" style="height: 100%; overflow: hidden;">
      <BoardsNavigation :boards="boards" />
      <!-- :key is required to allow transitions to work with the same component: 
      https://forum.vuejs.org/t/solved-vue-transitions-not-working/7614-->
      <FadeTransition>
        <router-view :key="$route.params.id"></router-view>
      </FadeTransition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BoardsNavigation from "@/components/boards-navigation/BoardsNavigation.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";
import Board from "@/entities/Board";
import BoardsService from "@/services/api-services/BoardsService";

@Component({
  components: { BoardsNavigation, FadeTransition }
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
  async beforeMount() {
    await this.retrieveBoards();
    if (this.boards && this.boards.length > 0) {
      // Redirect to the first board on the list.
      this.$router.push({
        name: "@noteboardsItemPage",
        params: { id: this.boards[0].id.toString() }
      });
    }
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
