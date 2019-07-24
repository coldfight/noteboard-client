<template>
  <div class="newNoteForm card" :style="cardStyles">
    <NoteListItemToolbar
      :action-buttons="['delete']"
      @toolbar-held="toolbarHeld"
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
            autocomplete="off"
            placeholder="Title"
            v-model="title"
          />
          <p v-if="hasError('name')" class="text-danger font-weight-light">
            {{ getError("name") }}
          </p>
        </div>

        <div class="form-group">
          <textarea
            :class="['form-control transparent tp-1', textColorClass]"
            name="content"
            id="content"
            placeholder="Content"
            v-model="content"
          ></textarea>
          <p v-if="hasError('content')" class="text-danger font-weight-light">
            {{ getError("content") }}
          </p>
        </div>

        <div class="form-group">
          <ColorPicker v-model="colors" :swatches="colorSwatch" />
        </div>

        <button type="submit" class="btn btn-primary btn-block">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import { Slider as ColorPicker } from "vue-color";
import _ from "lodash";
import { mapActions } from "vuex";
import util from "@/lib/util";
import NoteListItemToolbar from "@/components/notes/note-list-item/NoteListItemToolbar.vue";
import MouseDragMixin from "@/mixins/mouseDrag.js";

export default {
  name: "NewNoteForm",
  props: {
    noteboardId: {
      type: Number,
      required: true
    }
  },
  mixins: [MouseDragMixin],
  components: { NoteListItemToolbar, ColorPicker },
  computed: {
    cardStyles() {
      return {
        backgroundColor: this.colors.hex,
        top: `${this.position.x}px`,
        left: `${this.position.y}px`
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
      title: "",
      content: "",
      colors: { hex: "#42424f" },
      position: {
        x: 0,
        y: 0
      },
      colorSwatch: [".80", ".65", ".50", ".35", ".20"],
      errors: {}
    };
  },
  methods: {
    ...mapActions("notes", {
      addNote: "ADD_NOTE"
    }),
    updatePosition(newMousePosition, oldMousePosition) {
      this.position = {
        x: Math.max(
          0,
          this.position.x + (newMousePosition.x - oldMousePosition.x)
        ),
        y: Math.max(
          0,
          this.position.y + (newMousePosition.y - oldMousePosition.y)
        )
      };
    },
    async submitForm() {
      try {
        await this.addNote({
          posX: 0,
          posY: 0,
          title: this.title,
          content: this.content,
          color: this.colors.hex,
          noteboard: this.noteboardId
        });
        this.closeForm();
      } catch (err) {
        this.errors = {};
        if (_.hasIn(err, "response.data.violations")) {
          _.each(err.response.data.violations, violation => {
            this.errors[violation.propertyPath] = violation.message;
          });
        }
      }
    },
    hasError(key) {
      return this.errors && _.hasIn(this.errors, key);
    },
    getError(key) {
      if (this.hasError(key)) {
        return this.errors[key];
      }
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
