<template>
  <div class="noteList">
    <template v-if="notes.length">
      <NoteListItem v-for="note in notes" :key="note.id" :note="note" />
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
  }
};
</script>
