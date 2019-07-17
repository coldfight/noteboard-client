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

/* Use this for when you add edit a note item */
input {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
  height: 30px;
  border-radius: 5px;
  transition: background-color 0.5s ease;
  -webkit-transition: background-color 0.5s ease;
}
input:focus {
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 16px;
}
</style>
