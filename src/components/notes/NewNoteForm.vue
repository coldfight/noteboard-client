<template>
  <div class="newNoteForm card" style="background-color: #42424f;">
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

        <div class="form-group">
          <ColorPicker v-model="colors" :swatches="colorSwatch" />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import {Slider as ColorPicker} from  "vue-color";

import NoteListItemToolbar from "@/components/notes/note-list-item/NoteListItemToolbar.vue";

export default {
  name: "NewNoteForm",
  components: { NoteListItemToolbar, ColorPicker },
  data() {
    return {
      colors: {},
      colorSwatch: ['0.9', '.80', '.65', '.50', '.35', '.20', '0.1']
    }
  },
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
