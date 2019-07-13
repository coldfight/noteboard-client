<template>
  <div class="card-body">
    <blockquote class="card-blockquote">
      <p>{{ note.content }}</p>
    </blockquote>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Note from "@/entities/Note";

@Component({
  components: { }
})
export default class NoteListItemBody extends Vue {
  /**
   * "props"
   */
  @Prop({ required: true }) note!: Note;
}
</script>

<style scoped>
.card-blockquote p,
.card-blockquote {
  margin: 0;
}
</style>
