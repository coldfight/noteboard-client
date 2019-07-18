import { mapState } from "vuex";

export default {
  watch: {
    globalMousePressed(newValue, oldValue) {
      // console.log("NoteListItem: globalMousePressed()", newValue, oldValue);
      if (this.readyToDrag && oldValue && !newValue) {
        this.readyToDrag = false;
      }
    }
  },
  computed: {
    ...mapState({
      globalMousePressed: "mousePressed"
    }),
  },
  data() {
    return {
      readyToDrag: false
    };
  },
  methods: {
    toolbarHeld() {
      this.readyToDrag = true;
    }
  }
}