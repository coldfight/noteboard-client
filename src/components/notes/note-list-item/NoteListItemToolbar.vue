<template>
  <div
    @mousedown.self="mouseHold"
    @touchstart.self="mouseHold"
    :class="['toolbar noselect', { grabbed: !!interval }]"
  >
    <a
      v-if="isEditable"
      href="#"
      @click.prevent="editNote"
      class="text-light"
      title="Edit Note"
    >
      <span class="oi oi-pencil" aria-hidden="true"></span>
    </a>
    <a
      v-if="isDeletable"
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
const MOUSE_CLICK_THRESHOLD = 3;
const ACTION_EDIT = "edit";
const ACTION_DELETE = "delete";

export default {
  name: "NoteListItemToolbar",
  props: {
    actionButtons: {
      type: Array,
      default: () => [ACTION_EDIT, ACTION_DELETE],
      validator: function(actions) {
        const allowedActions = [ACTION_EDIT, ACTION_DELETE];
        return actions.every(a => {
          return allowedActions.indexOf(a) >= 0;
        });
      }
    }
  },
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
    }),
    isEditable() {
      return this.hasAction(ACTION_EDIT);
    },
    isDeletable() {
      return this.hasAction(ACTION_DELETE);
    }
  },
  data() {
    return {
      heldDown: false,
      timeHeldDown: 0,
      interval: null
    };
  },
  methods: {
    hasAction(action) {
      return this.actionButtons.indexOf(action) >= 0;
    },
    editNote() {
      this.$emit("edit-note");
    },
    deleteNote() {
      this.$emit("delete-note");
    },
    mouseHold() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          if (!this.heldDown && this.timeHeldDown > MOUSE_CLICK_THRESHOLD) {
            this.heldDown = true;
            this.$emit("toolbar-held");
          }
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
      this.heldDown = false;
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
