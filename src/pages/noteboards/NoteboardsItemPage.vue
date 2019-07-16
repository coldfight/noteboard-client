<template>
  <div class="noteboardsItemPage" style="height: 100%;">
    <!-- This transition is necessary because because it might not be loaded 
    in time for the transition to nicely display this element-->
    <FadeTransition>
      <NoteList
        v-if="currentNoteboard"
        :noteboard="currentNoteboard"
        :notes="notes"
      />
      <Loading v-else-if="!currentNoteboard && !boardLoaded" />
      <NotFound v-else>Could not find Noteboard</NotFound>
    </FadeTransition>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import NoteList from "@/components/notes/NoteList.vue";
import NotFound from "@/components/common/NotFound.vue";
import Loading from "@/components/common/Loading.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";

export default {
  name: "NoteboardsItemPage",
  components: {
    NoteList,
    Loading,
    NotFound,
    FadeTransition
  },
  computed: {
    ...mapState("notes", {
      notes: state => state.notes
    }),
    ...mapState("noteboards", {
      currentNoteboard: state => state.currentNoteboard
    }),
    ...mapGetters("notes", {
      notesLoaded: "LOADED"
    }),
    ...mapGetters("noteboards", {
      boardLoaded: "LOADED"
    })
  },
  methods: {
    ...mapActions("notes", {
      getNotes: "GET_NOTES"
    }),
    ...mapActions("noteboards", {
      getNoteboardById: "GET_NOTEBOARD_BY_ID"
    }),
    async retrieveData() {
      this.getNoteboardById(this.$route.params.id);
      this.getNotes(this.$route.params.id);
    }
  },
  beforeMount() {
    this.retrieveData();
  }
};
</script>
