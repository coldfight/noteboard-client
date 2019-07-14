<template>
  <transition name="accordion" mode="out-in">
    <slot />
  </transition>
</template>

<script>
export default {
  name: "AccordionTransition"
};
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.35s;
  transition: padding 0.35s;
  overflow: hidden;
}
.accordion-enter,
.accordion-leave-to {
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
