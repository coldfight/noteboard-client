import { mapState } from "vuex";

export default {
  props: {
    mouseClientPosition: {
      type: Object,
      default: () => {
        return { x: 0, y: 0 };
      }
    }
  },
  watch: {
    globalMousePressed(newValue, oldValue) {
      if (this.readyToDrag && oldValue && !newValue) {
        this.readyToDrag = false;
      }
    },
    mouseClientPosition(newMousePosition, oldMousePosition) {
      if (this.readyToDrag && this.globalMousePressed) {
        this.updatePosition(newMousePosition, oldMousePosition);
      }
    }
  },
  computed: {
    ...mapState({
      globalMousePressed: "mousePressed"
    })
  },
  data() {
    return {
      readyToDrag: false
    };
  },
  methods: {
    toolbarHeld() {
      this.readyToDrag = true;
    },
    updatePosition() {
      throw new Error("mouseDrag:methods:updatePosition must be overridden.");
    }
  }
};
