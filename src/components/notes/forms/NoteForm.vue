<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <input
        type="text"
        :class="['form-control transparent tp-1', textColorClass]"
        name="title"
        id="title"
        autocomplete="off"
        placeholder="Title"
        v-model="title"
      />
      <p v-if="hasError('name')" class="text-danger font-weight-light">{{ getError('name') }}</p>
    </div>

    <div class="form-group">
      <textarea
        :class="['form-control transparent tp-1', textColorClass]"
        name="content"
        id="content"
        placeholder="Content"
        v-model="content"
      ></textarea>
      <p v-if="hasError('content')" class="text-danger font-weight-light">{{ getError('content') }}</p>
    </div>

    <div class="form-group">
      <ColorPicker v-model="colors" :swatches="colorSwatch" />
    </div>

    <button type="submit" class="btn btn-primary btn-block">{{ note ? "Save" : "Create" }}</button>
  </form>
</template>

<script>
// @todo: Once this component is implemented, bring it in to NewNoteForm to remove code duplication.
import { Slider as ColorPicker } from "vue-color";
import util from "@/lib/util";

export default {
  name: "NoteForm",
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  components: {
    ColorPicker
  },
  data() {
    console.log(this.note)
    return {
      title: this.note ? this.note.title : "",
      content: this.note ? this.note.content : "",
      colors: { hex: (this.note ? this.note.color : "#42424f") },
      colorSwatch: [".80", ".65", ".50", ".35", ".20"],
      errors: {}
    };
  },
  computed: {
    textColorClass() {
      // @todo: on this.colors.hex change, we should notify the parent component to change its background color
      if (util.useDarkColor(this.colors.hex)) {
        return "text-dark";
      }
      return "text-light";
    }
  },
  methods: {
    submitForm() {},
    hasError (key) {
      return this.errors && _.hasIn(this.errors, key);
    },
    getError (key) {
      if (this.hasError(key)) {
        return this.errors[key];
      }
    },
  }
};
</script>

<style scoped>
.vc-slider {
  width: 100%;
}
</style>
