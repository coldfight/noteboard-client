<template>
  <div
    @mousedown.self="mouseHold"
    @touchstart.self="mouseHold"
    :class="['toolbar noselect', { grabbed: !!interval }]"
  >
    <a href="#" @click.prevent="editNote" class="text-light" title="Edit Note">
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
</template>

<script>
import { mapState } from "vuex";
// Anything greater than 7 will be registered as a mouse hold vs a mouse click
const MOUSE_CLICK_THRESHOLD = 7;

export default {
  name: "NoteListItemToolbar",
  watch: {
    globalMousePressed(newValue, oldValue) {
      if (this.interval && oldValue && !newValue) {
        this.mouseReleased();
      }
    }
  },
  computed: {
    ...mapState({
      globalMousePressed: "mousePressed"
    })
  },
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
      // console.log("NoteListItemToolbar: mouseHold()");
      this.$emit("toolbar-held");
      if (!this.interval) {
        this.interval = setInterval(() => {
          // console.log(
          //   "NoteListItemToolbar: interval running",
          //   this.timeHeldDown
          // );
          this.timeHeldDown++;
        }, 30);
      }
    },
    mouseReleased() {
      // console.log("NoteListItemToolbar: mouseReleased()");
      if (this.interval && this.timeHeldDown <= MOUSE_CLICK_THRESHOLD) {
        // This is a very short "hold" so register it as a click.
        this.$emit("toolbar-clicked");
      }
      this.$emit("toolbar-released");
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
  -webkit-border-top-left-radius: 5px;
  -webkit-border-top-right-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -moz-border-radius-topright: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
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
