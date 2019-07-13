<template>
  <div class="noteList">
    <NoteListItem v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Note from "@/entities/Note";
import NoteListItem from "@/components/notes/NoteListItem.vue";

@Component({
  components: { NoteListItem }
})
export default class NoteList extends Vue {
  /**
   * "props"
   */
  @Prop({ default: () => [] }) notes!: Array<Note>;
}
</script>
