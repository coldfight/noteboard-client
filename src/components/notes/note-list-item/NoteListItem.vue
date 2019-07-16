<template>
  <div
    @mousedown="itemSelected"
    :class="['noteListItem card mb-3', textColorClass]"
    ref="item"
    :style="cardStyles"
  >
    <NoteListItemToolbar
      @toolbar-clicked="toggleBody"
      @toolbar-held="toolbarHeld"
    />
    <AccordionTransition>
      <NoteListItemBody v-if="showBody" :note="note" />
    </AccordionTransition>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import NoteListItemToolbar from "@/components/notes/note-list-item/NoteListItemToolbar.vue";
import NoteListItemBody from "@/components/notes/note-list-item/NoteListItemBody.vue";
import AccordionTransition from "@/components/transitions/AccordionTransition.vue";
import util from "@/lib/util";

export default {
  name: "NoteListItem",
  components: { NoteListItemToolbar, NoteListItemBody, AccordionTransition },
  props: {
    note: {
      type: Object,
      required: true
    },
    highestZIndex: {
      type: Number,
      required: false,
      default: 0
    },
    mousePositionDelta: {
      type: Object,
      default: () => {
        return { x: 0, y: 0 };
      }
    }
  },
  data() {
    return {
      showBody: true,
      position: {
        x: this.note.posX,
        y: this.note.posY
      },
      zIndex: 1,
      readyToDrag: false
    };
  },
  watch: {
    /**
     * @todo: I most likely do NOT want to use the delta position of the mouse. Here's an issue:
     * If your mouse goes off the "draggable" area, slowly, slowly the NoteListItem will get 
     * farther and farther away from the mouse position. Better to anchor it at the mouse
     * position. This means I'll have to normalize the mouse position to fit the #'s
     * for the card position.
     * @todo: Another thing I'll have to do is ensure that the NotListItem's position cannot
     * be less than 0 in x or y.
     */
    mousePositionDelta(newDeltaPosition) {
      console.log("NoteListItem: mousePositionDelta()", newDeltaPosition.x, newDeltaPosition.y)
      if (this.readyToDrag && this.globalMousePressed) {
        this.position = {
          x: this.position.x + newDeltaPosition.y,
          y: this.position.y + newDeltaPosition.x
        };
      }
    },
    globalMousePressed(newValue, oldValue) {
      console.log("NoteListItem: globalMousePressed()", newValue, oldValue)
      if (this.readyToDrag && oldValue && !newValue) {
        this.readyToDrag = false
      }
    }
  },
  computed: {
    ...mapState({
      globalMousePressed: 'mousePressed'
    }),
    cardStyles() {
      return {
        backgroundColor: this.note.color,
        top: `${this.position.x}px`,
        left: `${this.position.y}px`,
        zIndex: this.zIndex
      };
    },
    textColorClass() {
      if (util.useDarkColor(this.note.color)) {
        return "text-dark";
      }
      return "text-light";
    }
  },
  methods: {
    editNote() {},
    deleteNote() {},
    toggleBody() {
      this.showBody = !this.showBody;
    },
    toolbarHeld() {
      console.log("NoteListItem: toolbarHeld()")
      this.readyToDrag = true;
    },
    /**
     * This gets triggered anytime the mouse clicks anywhere on the whole 
     * NoteListItem div. (including, toolbar, body, action buttons, etc)
     */
    itemSelected() {
      console.log("NoteListItem: itemSelected()")
      this.zIndex = this.highestZIndex + 1;
      this.$emit("item-selected");
    }
  }
};
</script>

<style scoped>
.noteListItem {
  width: 250px;
  text-align: left;
  position: absolute;
}
</style>
