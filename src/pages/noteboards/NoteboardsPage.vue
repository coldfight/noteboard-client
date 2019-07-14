<template>
  <div class="noteboardsPage" :style="{ width, height }">
    <div class="card text-center" style="height: 100%; overflow: hidden;">
      <NoteboardNavigation
        :boards="boards"
        @create-new-board="createNewBoard"
      />
      <!-- :key is required to allow transitions to work with the same component: 
      https://forum.vuejs.org/t/solved-vue-transitions-not-working/7614-->
      <FadeTransition>
        <router-view :key="$route.params.id"></router-view>
      </FadeTransition>
    </div>
  </div>
</template>

<script>
import NoteboardNavigation from "@/components/noteboard-navigation/NoteboardNavigation.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";
import NoteboardsService from "@/services/api-services/NoteboardsService";

export default {
  name: "NoteboardsPage",
  components: {
    FadeTransition,
    NoteboardNavigation
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
      const response = await NoteboardsService.getAll();
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
