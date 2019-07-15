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
      @toolbar-released="toolbarReleased"
    />
    <AccordionTransition>
      <NoteListItemBody v-if="showBody" :note="note" />
    </AccordionTransition>
  </div>
</template>

<script>
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
    }
  },
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
    editNote() {},
    deleteNote() {},
    toggleBody() {
      this.showBody = !this.showBody;
    },
    toolbarHeld() {
      console.log("toolbar held...");
    },
    toolbarReleased() {
      console.log("toolbar released...");
    },
    itemSelected() {
      this.zIndex = this.highestZIndex + 1;
      this.$emit('item-selected')
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
