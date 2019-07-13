<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppHeader from "@/components/common/AppHeader.vue";

@Component({
  components: {
    AppHeader
  }
})
export default class App extends Vue {}
</script>
