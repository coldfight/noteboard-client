<template>
  <div
    :class="['noteListItem card', textColorClass]"
    ref="item"
    :style="cardStyles"
  >
    <div class="toolbar noselect">
      <a
        href="#"
        @click.prevent="editNote"
        class="text-light"
        title="Edit Note"
      >
        <span class="oi oi-pencil" aria-hidden="true"></span>
      </a>
      <a
        href="#"
        @click.prevent="deleteNote"
        class="text-light"
        title="Delete Note"
      >
        <span class="oi oi-trash" aria-hidden="true"></span>
      </a>
    </div>
    <div class="card-body">
      <blockquote class="card-blockquote">
        <p>{{ note.content }}</p>
      </blockquote>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Note from "@/entities/Note";
import Util from "@/lib/util";

@Component({
  components: {}
})
export default class NoteListItem extends Vue {
  /**
   * "props"
   */
  @Prop({ required: true }) note!: Note;

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
  deleteNote() {
    confirm("Are you sure you want to delete this note?");
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
.toolbar {
  background-color: black;
  cursor: grab;
  text-align: right;
}
.toolbar a {
  font-size: 0.85em;
  vertical-align: top;
  margin: 0 5px 0 2px;
  opacity: 0.4;
}
.toolbar:hover a {
  font-size: 0.85em;
  vertical-align: top;
  margin: 0 5px 0 2px;
  opacity: 1;
}
.toolbar.grabbed {
  cursor: grabbing;
}
.card-blockquote p,
.card-blockquote {
  margin: 0;
}
</style>
