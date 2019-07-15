<template>
  <div class="noteList">
    <template v-if="notes.length">
      <NoteListItem 
      v-for="note in notes" 
      :key="note.id" 
      :note="note" 
      :highest-z-index="highestZIndex"
      @item-selected="itemSelected" />
    </template>
    <template v-else>
      <div>
        No notes found. Start by creating one!
      </div>
    </template>
  </div>
</template>

<script>
import NoteListItem from "@/components/notes/note-list-item/NoteListItem.vue";

export default {
  name: "NoteList",
  components: {
    NoteListItem
  },
  props: {
    notes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      highestZIndex: 1
    }
  },
  methods: {
    itemSelected() {
      this.highestZIndex++;
    }
  }
};
</script>
