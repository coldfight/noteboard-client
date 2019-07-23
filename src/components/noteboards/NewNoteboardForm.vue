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
    ...mapActions("noteboards", {
      addNoteboard: "ADD_NOTEBOARD"
    }),
    async submitForm() {
      await this.addNoteboard({
        name: this.name
      });
      this.closeForm();
    },
    closeForm() {
      this.$emit("close-form");
    }
  }
};
</script>
