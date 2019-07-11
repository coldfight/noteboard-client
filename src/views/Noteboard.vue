<template>
  <div class="noteboard">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Noteboard extends Vue {}
</script>

<style scoped>
.noteboard {
  padding: 50px 10px;
}
</style>
