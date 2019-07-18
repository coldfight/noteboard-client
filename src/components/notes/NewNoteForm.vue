<template>
  <div class="newNoteForm card" :style="cardStyles">
    <NoteListItemToolbar
      :action-buttons="['delete']"
      @delete-note="closeForm"
    />
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input
            type="text"
            :class="['form-control transparent tp-1', textColorClass]"
            name="title"
            id="title"
            placeholder="Title"
            v-model="title"
          />
        </div>

        <div class="form-group">
          <textarea
            :class="['form-control transparent tp-1', textColorClass]"
            name="content"
            id="content"
            placeholder="Content"
            v-model="content"
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
import { Slider as ColorPicker } from "vue-color";
import { mapActions } from "vuex";
import util from "@/lib/util";
import NoteListItemToolbar from "@/components/notes/note-list-item/NoteListItemToolbar.vue";

export default {
  name: "NewNoteForm",
  props: {
    boardId: {
      type: Number,
      required: true
    }
  },
  components: { NoteListItemToolbar, ColorPicker },
  computed: {
    cardStyles() {
      return {
        backgroundColor: this.colors.hex
      };
    },
    textColorClass() {
      if (util.useDarkColor(this.colors.hex)) {
        return "text-dark";
      }
      return "text-light";
    }
  },
  data() {
    return {
      title: null,
      content: null,
      colors: { hex: "#42424f" },
      colorSwatch: [".80", ".65", ".50", ".35", ".20"]
    };
  },
  methods: {
    ...mapActions("notes", {
      addNote: "ADD_NOTE"
    }),
    async submitForm() {
      let num = Math.random();
      let id = num.toString(36).substr(2, 9);
      // Validation on title, content, colors.hex
      await this.addNote({
        id,
        posX: 0,
        posY: 0,
        title: this.title,
        content: this.content,
        color: this.colors.hex,
        boardId: this.boardId
      });

      // @todo: I will assume that at this point, everything was successful...
      this.closeForm();
    },
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
