<template>
  <div class="noteList">
    <NoteListItem v-for="note in notes" :key="note.id" :note="note" />
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
