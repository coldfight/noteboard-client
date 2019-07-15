<template>
  <div class="noteboardsItemPage" style="height: 100%;">
    <!-- This transition is necessary because because it might not be loaded 
    in time for the transition to nicely display this element-->
    <FadeTransition>
      <div
        v-if="currentNoteboard"
        class="card-body"
        :style="boardItemCardStyles"
      >
        <NoteList :notes="notes" />
      </div>
    </FadeTransition>
    <div
      v-if="!currentNoteboard && boardLoaded"
      class="card-body"
      :style="{ height: '100%' }"
    >
      <!-- <span v-if="!boardLoaded">Loading...</span> -->
      <span>Could not find Noteboard</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import util from "@/lib/util";
import NoteList from "@/components/notes/NoteList.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";

export default {
  name: "NoteboardsItemPage",
  components: {
    NoteList,
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
    }),
    boardItemCardStyles() {
      const styles = { height: "100%" };

      if (this.currentNoteboard) {
        // styles.backgroundColor = this.currentNoteboard.color;
        // styles.color = this.autoColorFromBackgroundColor;
      }

      return styles;
    },

    autoColorFromBackgroundColor() {
      if (this.currentNoteboard) {
        return util.autoColorFromColor(this.currentNoteboard.color);
      }
      return "#ffffff";
    }
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
