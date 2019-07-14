<template>
  <AccordionTransition>
    <router-view></router-view>
  </AccordionTransition>
</template>

<script>
import AccordionTransition from "@/components/transitions/AccordionTransition.vue";

export default {
  components: {
    AccordionTransition
  }
};
</script>
