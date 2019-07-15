<template>
  <div
    :class="['noteListItem card mb-3', textColorClass]"
    ref="item"
    :style="cardStyles"
  >
    <NoteListItemToolbar @toolbar-clicked="toggleBody" />
    <AccordionTransition>
      <NoteListItemBody v-if="showBody" :note="note" />
    </AccordionTransition>
  </div>
</template>

<script>
import NoteListItemToolbar from "@/components/notes/note-list-item/NoteListItemToolbar.vue";
import NoteListItemBody from "@/components/notes/note-list-item/NoteListItemBody.vue";
import AccordionTransition from "@/components/transitions/AccordionTransition.vue";
import util from "@/lib/util";

export default {
  name: "NoteListItem",
  components: { NoteListItemToolbar, NoteListItemBody, AccordionTransition },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showBody: true
    };
  },
  computed: {
    cardStyles() {
      return {
        backgroundColor: this.note.color
      };
    },
    textColorClass() {
      if (util.useDarkColor(this.note.color)) {
        return "text-dark";
      }
      return "text-light";
    }
  },
  methods: {
    editNote() {},
    deleteNote() {},
    toolbarClicked() {
      console.log("I Clicked the toolbar, so I should collapse the body.");
    },
    toggleBody() {
      this.showBody = !this.showBody;
    }
  },
  mounted() {
    // @todo: arrange the item based on the note's position
    // console.log(this.$refs.item);
  }
};
</script>

<style scoped>
.noteListItem {
  width: 250px;
  text-align: left;
  /* position: absolute; */
}
</style>
