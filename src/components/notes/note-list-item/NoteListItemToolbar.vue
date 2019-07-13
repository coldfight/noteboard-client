<template>
  <div @click.prevent="toolbarClicked" class="toolbar noselect">
    <a href="#" @click.prevent="editNote" class="text-light" title="Edit Note">
      <span class="oi oi-pencil" aria-hidden="true"></span>
    </a>
    <a href="#" @click.prevent="deleteNote" class="text-light" title="Delete Note">
      <span class="oi oi-trash" aria-hidden="true"></span>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class NoteListItemToolbar extends Vue {
  /**
   * "methods"
   */
  editNote() {}
  deleteNote() {
    confirm("Are you sure you want to delete this note?");
  }
  toolbarClicked(e: any) {
    this.$emit('toolbar-clicked');
  }
}
</script>

<style scoped>
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
</style>
