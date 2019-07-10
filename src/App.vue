<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/common/Header.vue";

@Component({
  components: {
    AppHeader: Header
  }
})
export default class Home extends Vue {}
</script>
