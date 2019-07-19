<template>
  <FadeTransition>
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
        @delete-note="deleteItem"
      />
      <AccordionTransition>
        <NoteListItemBody v-if="showBody" :note="note" />
      </AccordionTransition>
    </div>
  </FadeTransition>
</template>

<script>
import { mapActions } from "vuex";
import util from "@/lib/util";
import NoteListItemToolbar from "@/components/notes/note-list-item/NoteListItemToolbar.vue";
import NoteListItemBody from "@/components/notes/note-list-item/NoteListItemBody.vue";
import AccordionTransition from "@/components/transitions/AccordionTransition.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";
import MouseDragMixin from "@/mixins/mouseDrag.js";

export default {
  name: "NoteListItem",
  components: {
    NoteListItemToolbar,
    NoteListItemBody,
    AccordionTransition,
    FadeTransition
  },
  props: {
    note: {
      type: Object,
      required: true
    },
    highestZIndex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  mixins: [MouseDragMixin],
  data() {
    return {
      showBody: true,
      position: {
        x: this.note.posX,
        y: this.note.posY
      },
      zIndex: 1
    };
  },
  computed: {
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
    ...mapActions("notes", {
      deleteNote: "DELETE_NOTE",
      updateNote: "UPDATE_NOTE"
    }),
    editNote() {},
    deleteItem() {
      this.deleteNote(this.note);
    },
    toggleBody() {
      this.showBody = !this.showBody;
    },
    /**
     * This gets triggered anytime the mouse clicks anywhere on the whole
     * NoteListItem div. (including, toolbar, body, action buttons, etc)
     */
    itemSelected() {
      // console.log("NoteListItem: itemSelected()");
      this.zIndex = this.highestZIndex + 1;
      this.$emit("item-selected");
    },
    updatePosition(newMousePosition, oldMousePosition) {
      this.position = {
        x: Math.max(
          0,
          this.position.x + (newMousePosition.x - oldMousePosition.x)
        ),
        y: Math.max(
          0,
          this.position.y + (newMousePosition.y - oldMousePosition.y)
        )
      };
    },
    mousePressReleased() {
      this.note.posX = this.position.x;
      this.note.posY = this.position.y;
      this.updateNote(this.note);
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
