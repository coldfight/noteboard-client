<template>
  <div
    :class="['noteListItem card mb-3', textColorClass]"
    ref="item"
    :style="cardStyles"
  >
    <div class="card-body">
      <blockquote class="card-blockquote">
        <p>{{ note.content }}</p>
      </blockquote>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Note from "@/entities/Note";
import Util from "@/lib/util";

@Component({
  components: {}
})
export default class NoteListItem extends Vue {
  /**
   * "props"
   */
  @Prop({ required: true }) note!: Note;

  /**
   * "computed"
   */
  get cardStyles(): object {
    return {
      backgroundColor: this.note.color,
    };
  }

  get textColorClass(): string {
    if (Util.useDarkColor(this.note.color)) {
      return "text-dark";
    }
    return "text-light";
  }

  mounted() {
    console.log(this.$refs.item);
  }
}
</script>

<style scoped>
.noteListItem {
  width: 250px;
  text-align: left;
  /* position: absolute; */
}
</style>

<style scoped>
.card-blockquote p,
.card-blockquote {
  margin: 0;
}
.noteListItem {
  /* position: absolute; */
}
</style>
