<template>
  <transition appear name="modal" mode="out-in">
    <slot />
  </transition>
</template>

<script>
export default {
  name: "ModalTransition"
};
</script>

<style scoped>
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
