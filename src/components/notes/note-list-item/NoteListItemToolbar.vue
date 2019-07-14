<template>
  <div @click.prevent="toolbarClicked" class="toolbar noselect">
    <a
      href="#"
      @click.prevent.stop="editNote"
      class="text-light"
      title="Edit Note"
    >
      <span class="oi oi-pencil" aria-hidden="true"></span>
    </a>
    <a
      href="#"
      @click.prevent.stop="deleteNote"
      class="text-light"
      title="Delete Note"
    >
      <span class="oi oi-trash" aria-hidden="true"></span>
    </a>
  </div>
</template>

<script>
export default {
  name: "NoteListItemToolbar",
  methods: {
    editNote() {
      this.$emit("edit-note");
    },
    deleteNote() {
      confirm("Are you sure you want to delete this note?");
      this.$emit("delete-note");
    },
    toolbarClicked() {
      this.$emit("toolbar-clicked");
    }
  }
};
</script>

<style scoped>
.toolbar {
  background-color: black;
  text-align: right;
  cursor: grab;
}
.toolbar a {
  font-size: 0.85em;
  margin: 0 5px 0 2px;
  opacity: 0.24;
}
.toolbar a:hover {
  opacity: 0.65;
}
.toolbar.grabbed {
  cursor: grabbing;
}
</style>
