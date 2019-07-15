<template>
  <div class="noteboardsPage" :style="{ width, height }">
    <div class="card text-center" style="height: 100%; overflow: hidden;">
      <NoteboardNavigation
        :boards="noteboards"
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
import { mapActions, mapState } from "vuex";
import NoteboardNavigation from "@/components/noteboard-navigation/NoteboardNavigation.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";

export default {
  name: "NoteboardsPage",
  components: {
    FadeTransition,
    NoteboardNavigation
  },
  data() {
    return {
      width: "100%",
      height: "94vh"
    };
  },
  watch: {
    routeAndNoteboardsChanged() {
      this.checkForRedirect();
    }
  },
  computed: {
    /**
     * Used to detect a change in route path and that noteboards has been fetched.
     * We set a watcher on this computed property to properly redirect to the
     * first fetched noteboard.
     */
    routeAndNoteboardsChanged() {
      return `R:${this.$route.fullPath},B:${this.noteboards.length}`;
    },
    ...mapState("noteboards", {
      noteboards: state => state.noteboards
    })
  },
  methods: {
    ...mapActions("noteboards", {
      getNoteboards: "GET_NOTEBOARDS"
    }),
    checkForRedirect() {
      if (
        this.noteboards &&
        this.noteboards.length > 0 &&
        this.$route.name === "@noteboardsPage"
      ) {
        // Redirect to the first board on the list if we're on noteboardsPage route
        this.$router.push({
          name: "@noteboardsItemPage",
          params: { id: this.noteboards[0].id.toString() }
        });
      }
    },
    createNewBoard() {}
  },
  async beforeMount() {
    this.getNoteboards();
  }
};
</script>

<style scoped>
.noteboardsPage {
  padding: 20px;
}
</style>
