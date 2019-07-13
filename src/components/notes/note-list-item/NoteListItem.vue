<template>
  <div :class="['noteListItem card', textColorClass]" ref="item" :style="cardStyles">
    <NoteListItemToolbar @toolbar-clicked="toggleBody" />
    <transition
      name="accordion"
      mode="out-in"
    >
      <NoteListItemBody v-if="showBody" :note="note" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import NoteListItemToolbar from "@/components/notes/note-list-item/NoteListItemToolbar.vue";
import NoteListItemBody from "@/components/notes/note-list-item/NoteListItemBody.vue";
import Note from "@/entities/Note";
import Util from "@/lib/util";

@Component({
  components: { NoteListItemToolbar, NoteListItemBody }
})
export default class NoteListItem extends Vue {
  /**
   * "props"
   */
  @Prop({ required: true }) note!: Note;

  /**
   * "data"
   */
  showBody: boolean = true;

  /**
   * "computed"
   */
  get cardStyles(): object {
    return {
      backgroundColor: this.note.color
    };
  }

  get textColorClass(): string {
    if (Util.useDarkColor(this.note.color)) {
      return "text-dark";
    }
    return "text-light";
  }

  /**
   * "methods"
   */
  editNote() {}
  deleteNote() {}
  toolbarClicked() {
    console.log("I Clicked the toolbar, so I should collapse the body.");
  }
  toggleBody() {
    this.showBody = !this.showBody;
  }

  /**
   * "lifecycle" methods
   */
  mounted() {
    // @todo: arrange the item based on the note's position
    // console.log(this.$refs.item);
  }
}
</script>

<style scoped>
.noteListItem {
  width: 250px;
  text-align: left;
  /* position: absolute; */
}
</style>
