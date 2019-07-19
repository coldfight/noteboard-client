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
        this.mousePressReleased();
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
      // Override this function in the Components that want to update a specific component's position
    },
    mousePressReleased() {
      // Override this function in the Components that want something to happen when mousee press is released
    }
  }
};
