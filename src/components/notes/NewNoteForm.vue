<template>
  <div class="newNoteForm card">
    <NoteListItemToolbar
      :action-buttons="['delete']"
      @delete-note="closeForm"
    />
    <div class="card-body">
      <form>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            name="title"
            id="title"
            placeholder="Title"
          />
        </div>

        <div class="form-group">
          <textarea
            class="form-control"
            name="content"
            id="content"
            placeholder="Content"
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import NoteListItemToolbar from "@/components/notes/note-list-item/NoteListItemToolbar.vue";

export default {
  name: "NewNoteForm",
  components: { NoteListItemToolbar },
  methods: {
    closeForm() {
      this.$emit("close-form");
    }
  }
};
</script>

<style scoped>
.newNoteForm {
  position: absolute;
}
</style>
