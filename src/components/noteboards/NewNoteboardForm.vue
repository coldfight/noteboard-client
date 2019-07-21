<template>
  <div class="newNoteboardForm">
    <form @submit.prevent="submitForm">
      <h5 class="border-bottom pb-2">Create New Noteboard</h5>
      <div class="form-group">
        <input
          type="text"
          class="form-control transparent tp-1"
          name="name"
          id="name"
          autocomplete="off"
          placeholder="Noteboard Name"
          v-model="name"
        />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Create</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NewNoteboardForm",
  data() {
    return {
      name: null
    };
  },
  computed: {
    formStyles() {
      return {
        top: 0,
        left: 0
      };
    }
  },
  methods: {
    ...mapActions("notes", {
      //   addNote: "ADD_NOTE"
    }),
    close() {
      this.$emit("close-form");
    },
    async submitForm() {
      //   let num = Math.random();
      //   let id = num.toString(36).substr(2, 9);
      //   // Validation on title, content, colors.hex
      //   await this.addNote({
      //     id,
      //     posX: 0,
      //     posY: 0,
      //     title: this.title,
      //     content: this.content,
      //     color: this.colors.hex,
      //     boardId: this.boardId
      //   });
      //   // @todo: I will assume that at this point, everything was successful...
      //   this.closeForm();
    },
    closeForm() {
      this.$emit("close-form");
    }
  }
};
</script>
