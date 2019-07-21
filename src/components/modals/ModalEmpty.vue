<template>
  <ModalTransition>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container bg-dark">
          <a
            class="close-button"
            @click.prevent="closeModal"
            href="#"
            z-index="1000"
          >
            <span class="oi oi-circle-x" aria-hidden="true"></span>
          </a>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
  </ModalTransition>
</template>

<script>
import ModalTransition from "@/components/transitions/ModalTransition.vue";

export default {
  name: "ModalEmpty",
  components: {
    ModalTransition
  },
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
}

.close-button {
  position: absolute;
  top: -12px;
  right: -12px;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
</style>
