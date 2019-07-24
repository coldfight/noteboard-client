<template>
  <div class="card-body">
    <blockquote class="card-blockquote">
      <!--  @todo: Transition card flip -->
      <template v-if="editMode">
        <NoteForm :note="note" @update-note="updateNote" />
      </template>
      <template v-else>
        <h5 v-if="note.title">{{ note.title }}</h5>
        <p>{{ note.content }}</p>
      </template>
    </blockquote>
  </div>
</template>

<script>
import NoteForm from "@/components/notes/forms/NoteForm.vue";

export default {
  name: "NoteListItemBody",
  components: {
    NoteForm
  },
  props: {
    note: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateNote(payload) {
      this.$emit("update-note", payload);
    }
  }
};
</script>

<style scoped>
.card-blockquote p,
.card-blockquote {
  margin: 0;
}
</style>
