<template>
  <div class="card-body" :style="boardItemCardStyles" @mousemove="onMouseMove">
    <div class="noteList">
      <template v-if="notes.length">
        <NoteListItem
          v-for="note in notes"
          :key="note.id"
          :note="note"
          :highest-z-index="highestZIndex"
          @item-selected="itemSelected"
        />
      </template>
      <template v-else>
        <div>No notes found. Start by creating one!</div>
      </template>
    </div>
  </div>
</template>

<script>
import NoteListItem from "@/components/notes/note-list-item/NoteListItem.vue";
import util from "@/lib/util";

export default {
  name: "NoteList",
  components: {
    NoteListItem
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
      highestZIndex: 1
    };
  },
  methods: {
    itemSelected() {
      this.highestZIndex++;
    },
    onMouseMove(e) {
      console.log("mouse moving", e);
    }
  }
};
</script>
