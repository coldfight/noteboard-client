export default {
  PRESS_MOUSE(context) {
    context.commit("SET_MOUSE_PRESSED", true);
  },
  RELEASE_MOUSE(context) {
    context.commit("SET_MOUSE_PRESSED", false);
  },
}