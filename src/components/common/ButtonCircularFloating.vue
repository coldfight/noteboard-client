<template>
  <button :class="['btn btn-primary btn-circle', customClasses]" :style="customStyles">
    N
  </button>
</template>

<script>
const BUTTON_LARGE = "large";
const BUTTON_SMALL = "small";

export default {
  name: "ButtonCircularFloating",
  props: {
    size: {
      type: String,
      default: BUTTON_LARGE,
      validator: function(value) {
        // The value must match one of these strings
        return [BUTTON_SMALL, BUTTON_LARGE].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      customStyles: {
        position: "fixed",
        right: this.size === BUTTON_SMALL ? '15px' : '35px',
        bottom: this.size === BUTTON_SMALL ? '15px' : '35px'
      },
      customClasses: {
        'btn-xl': this.size === BUTTON_LARGE
      }
    };
  }
};
</script>

<style scoped>
.btn-circle {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
}
.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 24px;
  line-height: 1.33;
}
</style>
