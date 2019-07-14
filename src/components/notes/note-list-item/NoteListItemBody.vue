<template>
  <div class="card-body">
    <blockquote class="card-blockquote">
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
