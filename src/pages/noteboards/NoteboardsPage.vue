<template>
  <div class="noteboardsPage" :style="{ width, height }">
    <div class="card text-center" style="height: 100%; overflow: hidden;">
      <BoardsNavigation :boards="boards" @create-new-board="createNewBoard" />
      <!-- :key is required to allow transitions to work with the same component: 
      https://forum.vuejs.org/t/solved-vue-transitions-not-working/7614-->
      <FadeTransition>
        <router-view :key="$route.params.id"></router-view>
      </FadeTransition>
    </div>
  </div>
</template>

<script>
import BoardsNavigation from "@/components/boards-navigation/BoardsNavigation.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";
import BoardsService from "@/services/api-services/BoardsService";

export default {
  name: "NoteboardsPage",
  components: {
    FadeTransition,
    BoardsNavigation
  },
  data() {
    return {
      boards: [],
      width: "100%",
      height: "94vh"
    };
  },
  methods: {
    async retrieveBoards() {
      const response = await BoardsService.getAll();
      if (response.data) {
        this.boards = response.data;
      }
    },
    createNewBoard() {}
  },
  async beforeMount() {
    await this.retrieveBoards();
    if (
      this.boards &&
      this.boards.length > 0 &&
      this.$route.name === "@noteboardsPage"
    ) {
      // Redirect to the first board on the list if we're on noteboardsPage route
      this.$router.push({
        name: "@noteboardsItemPage",
        params: { id: this.boards[0].id.toString() }
      });
    }
  }
};
</script>

<style scoped>
.noteboardsPage {
  padding: 20px;
}
</style>
