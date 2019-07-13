<template>
  <div class="noteboardsItemPage" style="height: 100%;">
    <!-- This transition is necessary because because it might not be loaded 
    in time for the transition to nicely display this element-->
    <FadeTransition>
      <div v-if="board" class="card-body" :style="boardItemCardStyles">
        <NoteList :notes="notes" />
      </div>
    </FadeTransition>
    <div v-if="!board && boardLoaded" class="card-body" :style="{ height: '100%' }">
      <!-- <span v-if="!boardLoaded">Loading...</span> -->
      <span>Could not find Board</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import _ from "lodash";
import Board from "@/entities/Board";
import Note from "@/entities/Note";
import Util from "@/lib/util";
import NoteList from "@/components/notes/NoteList.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";
import BoardsService from "@/services/api-services/BoardsService";
import NotesService from "@/services/api-services/NotesService";

@Component({
  components: { NoteList, FadeTransition }
})
export default class NoteboardsItemPage extends Vue {
  /**
   * "data"
   */
  board: Board | null = null;
  boardLoaded: boolean = false;
  notes: Array<Note> = [];

  /**
   * "watch"
   */
  // Watch for changes to the route. If we're changing to another
  // noteboard we're going to have to pull the new data for it.
  @Watch("$route")
  onRouteChanged(value: any, oldValue: any) {
    this.retrieveData();
  }

  /**
   * "computed"
   */
  get boardItemCardStyles(): object {
    const styles = { height: "100%", backgroundColor: "", color: "" };

    if (this.board) {
      // styles.backgroundColor = this.board.color;
      // styles.color = this.autoColorFromBackgroundColor;
    }

    return styles;
  }

  get autoColorFromBackgroundColor(): string {
    if (this.board) {
      return Util.autoColorFromColor(this.board.color);
    }
    return "#ffffff";
  }

  /**
   * "lifecycle" hook methods
   */
  beforeMount() {
    this.retrieveData();
  }

  /**
   * "methods"
   */
  async retrieveData() {
    await this.retrieveBoard();
    await this.retrieveNotes();
  }

  async retrieveBoard() {
    this.board = null;
    this.boardLoaded = false;
    const response = await BoardsService.get(parseInt(this.$route.params.id));
    if (response.data && !_.isEmpty(response.data)) {
      // @todo: this weirdness because of firebase.. update once we use a real database
      this.board = response.data[_.keys(response.data)[0]];
    }
    this.boardLoaded = true;
  }

  async retrieveNotes() {
    this.notes = [];
    if (!this.board) {
      return;
    }
    const response = await NotesService.getAllForBoard(this.board.id);
    if (response.data && !_.isEmpty(response.data)) {
      // @todo: this weirdness because of firebase.. update once we use a real database
      const notes: Array<Note> = [];
      _.each(response.data, item => notes.push(item));
      this.notes = notes;
    }
  }
}
</script>
