<template>
  <div class="card-body" :style="boardItemCardStyles" @mousemove="onMouseMove">
    <div class="noteList" :style="{ 'z-index': layerOrderNoteList }">
      <template v-if="notes.length">
        <NoteListItem
          v-for="note in notes"
          :key="note.id"
          :note="note"
          :mouse-client-position="mouseClientPosition"
          :highest-z-index="highestZIndex"
          @item-selected="increaseZIndex"
        />
      </template>
      <template v-else>
        <div>No notes found. Start by creating one!</div>
      </template>
    </div>
    <ButtonCircularFloating
      @button-pressed="createNewNoteForm"
      :style="{ 'z-index': layerOrderHoveringButton }"
    />

    <FadeTransition>
      <NewNoteForm
        v-if="displayNewNoteForm"
        :board-id="noteboard.id"
        :style="{ 'z-index': layerOrderHoveringForm }"
        :mouse-client-position="mouseClientPosition"
        @close-form="closeNewNoteForm"
      />
    </FadeTransition>
  </div>
</template>

<script>
import util from "@/lib/util";
import NoteListItem from "@/components/notes/note-list-item/NoteListItem.vue";
import NewNoteForm from "@/components/notes/NewNoteForm.vue";
import ButtonCircularFloating from "@/components/common/ButtonCircularFloating.vue";
import layerOrder from "@/lib/layerOrder";
import FadeTransition from "@/components/transitions/FadeTransition.vue";

export default {
  name: "NoteList",
  components: {
    NoteListItem,
    ButtonCircularFloating,
    NewNoteForm,
    FadeTransition
  },
  props: {
    notes: {
      type: Array,
      default: () => []
    },
    noteboard: {
      type: Object,
      required: true
    }
  },
  computed: {
    layerOrderNoteList() {
      return layerOrder.NOTE_LIST;
    },
    layerOrderHoveringButton() {
      return layerOrder.HOVERING_BUTTON;
    },
    layerOrderHoveringForm() {
      return layerOrder.HOVERING_FORM;
    },
    boardItemCardStyles() {
      // @todo: Increase the width AND height of the card-body as you drag the notes off screen.
      // @todo: save the width and height and load it
      return {
        height: "100%",
        width: "100%"
        // backgroundColor: this.currentNoteboard.color,
        // color: this.autoColorFromBackgroundColor
      };
    },

    autoColorFromBackgroundColor() {
      return util.autoColorFromColor(this.noteboard.color);
    }
  },
  data() {
    return {
      highestZIndex: 1,
      mouseClientPosition: {
        x: 0,
        y: 0
      },
      displayNewNoteForm: false
    };
  },
  methods: {
    closeNewNoteForm() {
      this.displayNewNoteForm = false;
    },
    createNewNoteForm() {
      this.displayNewNoteForm = true;
    },
    increaseZIndex() {
      this.highestZIndex++;
    },
    onMouseMove(e) {
      // I don't understand why x, and y are switched.
      this.mouseClientPosition = {
        x: e.clientY,
        y: e.clientX
      };
    },
    mouseDown() {
      this.$store.dispatch("PRESS_MOUSE");
    },
    mouseUp() {
      this.$store.dispatch("RELEASE_MOUSE");
    }
  },
  created() {
    // @todo: I might want to add the touch events
    document.addEventListener("mousedown", this.mouseDown);
    document.addEventListener("mouseleave", this.mouseDown);
    document.addEventListener("mouseup", this.mouseUp);
  },
  beforeDestroy() {
    // @todo: I might want to add the touch events
    document.removeEventListener("mousedown", this.mouseDown);
    document.removeEventListener("mouseleave", this.mouseDown);
    document.removeEventListener("mouseup", this.mouseUp);
  }
};
</script>
