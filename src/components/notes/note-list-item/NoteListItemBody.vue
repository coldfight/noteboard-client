<template>
  <div class="card-body">
    <blockquote class="card-blockquote">
      <h5 v-if="note.title">{{ note.title }}</h5>
      <p>{{ note.content }}</p>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: "NoteListItemBody",
  props: {
    note: {
      type: Object,
      required: true
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
