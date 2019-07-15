<template>
  <div class="noteboardsItemPage" style="height: 100%;">
    <!-- This transition is necessary because because it might not be loaded 
    in time for the transition to nicely display this element-->
    <FadeTransition>
      <div v-if="board" class="card-body" :style="boardItemCardStyles">
        <NoteList :notes="notes" />
      </div>
    </FadeTransition>
    <div
      v-if="!board && boardLoaded"
      class="card-body"
      :style="{ height: '100%' }"
    >
      <!-- <span v-if="!boardLoaded">Loading...</span> -->
      <span>Could not find Board</span>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import util from "@/lib/util";
import NoteList from "@/components/notes/NoteList.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";
import NoteboardsService from "@/services/api-services/NoteboardsService";
import NotesService from "@/services/api-services/NotesService";

export default {
  name: "NoteboardsItemPage",
  components: {
    NoteList,
    FadeTransition
  },
  data() {
    return {
      board: null,
      boardLoaded: false,
      notes: []
    };
  },
  watch: {
    $route() {
      this.retrieveData();
    }
  },
  methods: {
    async retrieveData() {
      await this.retrieveBoard();
      await this.retrieveNotes();
    },

    async retrieveBoard() {
      this.board = null;
      this.boardLoaded = false;
      const response = await NoteboardsService.getBoard(
        parseInt(this.$route.params.id)
      );
      if (response.data && !_.isEmpty(response.data)) {
        // @todo: this weirdness because of firebase.. update once we use a real database
        this.board = response.data[_.keys(response.data)[0]];
      }
      this.boardLoaded = true;
    },

    async retrieveNotes() {
      this.notes = [];
      if (!this.board) {
        return;
      }
      const response = await NotesService.getAllByBoardId(this.board.id);
      if (response.data && !_.isEmpty(response.data)) {
        // @todo: this weirdness because of firebase.. update once we use a real database
        const notes = [];
        _.each(response.data, item => notes.push(item));
        this.notes = notes;
      }
    }
  },
  computed: {
    boardItemCardStyles() {
      const styles = { height: "100%" };

      if (this.board) {
        // styles.backgroundColor = this.board.color;
        // styles.color = this.autoColorFromBackgroundColor;
      }

      return styles;
    },

    autoColorFromBackgroundColor() {
      if (this.board) {
        return util.autoColorFromColor(this.board.color);
      }
      return "#ffffff";
    }
  },
  beforeMount() {
    this.retrieveData();
  }
};
</script>
