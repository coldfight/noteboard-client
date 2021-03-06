<template>
  <div class="noteboardsPage" :style="{ width, height }">
    <div class="card" style="height: 100%; overflow: hidden;">
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

    <ModalEmpty v-if="displayNewNoteboardForm" @close="closeNewNoteboardForm">
      <NewNoteboardForm slot="body" @close-form="closeNewNoteboardForm" />
    </ModalEmpty>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import NoteboardNavigation from "@/components/noteboard-navigation/NoteboardNavigation.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";
import NewNoteboardForm from "@/components/noteboards/NewNoteboardForm.vue";
import ModalEmpty from "@/components/modals/ModalEmpty.vue";

export default {
  name: "NoteboardsPage",
  components: {
    FadeTransition,
    NoteboardNavigation,
    NewNoteboardForm,
    ModalEmpty
  },
  data() {
    return {
      width: "100%",
      height: "94vh",
      displayNewNoteboardForm: false
    };
  },
  watch: {
    /**
     * I have this to prevent object watching... more performant to check for
     * changes on a string rather than a whole $route object.
     */
    routeName() {
      this.checkForRedirect();
    }
  },
  computed: {
    routeName() {
      return this.$route.name;
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
    createNewBoard() {
      this.displayNewNoteboardForm = true;
    },
    closeNewNoteboardForm() {
      this.displayNewNoteboardForm = false;
    }
  },
  async beforeMount() {
    await this.getNoteboards();
    this.checkForRedirect();
  }
};
</script>

<style scoped>
.noteboardsPage {
  padding: 20px;
}
</style>
