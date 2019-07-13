<template>
  <div class="noteListItem card text-center">
    <div class="card-header">{{ note.title }}</div>
    <div class="card-body">
      <!-- <h4 class="card-title">Special title treatment</h4> -->
      <p class="card-text">{{ note.content }}</p>
      <!-- <a href="#!" class="btn btn-dark">Go somewhere</a> -->
    </div>
    <div class="card-footer text-muted">2 days ago</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Note from "@/entities/Note";

@Component({
  components: {}
})
export default class NoteListItem extends Vue {
  /**
   * "props"
   */
  @Prop({ required: true }) note!: Note;
}
</script>

<style scoped>
.noteListItem {
  width: 250px;
  /* text-align: left; */
  /* position: absolute; */
}
</style>
