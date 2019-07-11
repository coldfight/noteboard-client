<template>
  <div class="noteboard" :style="{width, height}">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Noteboard extends Vue {
  /**
   * "data"
   */
  height: string | null =  '800px';
  width: string | null = '1024px';
}
</script>

<style scoped>
.noteboard {
  padding: 50px 10px;
}
</style>
