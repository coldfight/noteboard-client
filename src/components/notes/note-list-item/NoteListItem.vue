<template>
  <div
    @mousedown="itemSelected"
    :class="[
      'noteListItem card',
      textColorClass,
      { cardSelected: readyToDrag }
    ]"
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
import { mapState } from "vuex";
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
    mouseClientPosition: {
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
    mouseClientPosition(newMousePosition, oldMousePosition) {
      // console.log(
      //   "NoteListItem: mousePositionDelta()",
      //   newDeltaPosition.x,
      //   newDeltaPosition.y
      // );
      if (this.readyToDrag && this.globalMousePressed) {
        this.position = {
          x: this.position.x + (newMousePosition.x - oldMousePosition.x),
          y: this.position.y + (newMousePosition.y - oldMousePosition.y), 
        };
      }
    },
    globalMousePressed(newValue, oldValue) {
      // console.log("NoteListItem: globalMousePressed()", newValue, oldValue);
      if (this.readyToDrag && oldValue && !newValue) {
        this.readyToDrag = false;
      }
    }
  },
  computed: {
    ...mapState({
      globalMousePressed: "mousePressed"
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
      // console.log("NoteListItem: toolbarHeld()");
      this.readyToDrag = true;
    },
    /**
     * This gets triggered anytime the mouse clicks anywhere on the whole
     * NoteListItem div. (including, toolbar, body, action buttons, etc)
     */
    itemSelected() {
      // console.log("NoteListItem: itemSelected()");
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
.cardSelected {
  -webkit-box-shadow: 10px 7px 21px -3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 7px 21px -3px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 7px 21px -3px rgba(0, 0, 0, 0.75);
  transform: scale(1.01);
}
</style>
