<template>
  <div
    @mousedown="mouseHold"
    @mouseup="mouseReleased"
    @mouseleave="mouseReleased"
    @touchstart="mouseHold"
    @touchend="mouseReleased"
    @touchcancel="mouseReleased"
    class="toolbar noselect"
  >
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
// Anything greater than 15 will be registered as a mouse hold vs a mouse click
const MOUSE_CLICK_THRESHOLD = 15;

export default {
  name: "NoteListItemToolbar",
  data() {
    return {
      timeHeldDown: 0,
      interval: null
    };
  },
  methods: {
    editNote() {
      this.$emit("edit-note");
    },
    deleteNote() {
      confirm("Are you sure you want to delete this note?");
      this.$emit("delete-note");
    },
    mouseHold() {
      this.$emit("toolbar-held");
      if (!this.interval) {
        this.interval = setInterval(() => this.timeHeldDown++, 30);
      }
    },
    mouseReleased() {
      if (this.timeHeldDown <= MOUSE_CLICK_THRESHOLD) {
        // This is a very short "hold" so register it as a click.
        this.$emit("toolbar-clicked");
      } else {
        this.$emit("toolbar-released");
      }
      clearInterval(this.interval);
      this.interval = false;
      this.timeHeldDown = 0;
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
