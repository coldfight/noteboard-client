<template>
  <div class="card-body" :style="boardItemCardStyles" @mousemove="onMouseMove">
    <div class="noteList">
      <template v-if="notes.length">
        <NoteListItem
          v-for="note in notes"
          :key="note.id"
          :note="note"
          :mouse-position-delta="mousePositionDelta"
          :highest-z-index="highestZIndex"
          @item-selected="increaseZIndex"
        />
      </template>
      <template v-else>
        <div>No notes found. Start by creating one!</div>
      </template>
    </div>
    <ButtonCircularFloating />
  </div>
</template>

<script>
import util from "@/lib/util";
import NoteListItem from "@/components/notes/note-list-item/NoteListItem.vue";
import ButtonCircularFloating from "@/components/common/ButtonCircularFloating.vue";

export default {
  name: "NoteList",
  components: {
    NoteListItem,
    ButtonCircularFloating
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
    boardItemCardStyles() {
      return {
        height: "100%"
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
      mousePositionDelta: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    increaseZIndex() {
      this.highestZIndex++;
    },
    onMouseMove(e) {
      this.mousePositionDelta = {
        x: e.movementX,
        y: e.movementY
      };
    },
    mouseDown() {
      this.$store.dispatch("PRESS_MOUSE");
      // console.log("NoteList: mouseDown()");
    },
    mouseUp() {
      this.$store.dispatch("RELEASE_MOUSE");
      // console.log("NoteList: mouseUp()");
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
