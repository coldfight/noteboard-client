<template>
  <div class="boardItemNavigation">
      <div v-for="board in boards" :key="board.id">
          <router-link :to="{name: '@boardItem', params: {id: board.id}}">{{ board.name }}</router-link>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Board from "@/entities/Board";

@Component({
  components: {}
})
export default class BoardItemNavigation extends Vue {
  @Prop({ default: null }) boards!: Array<Board>;
}
</script>

<style scoped>
</style>
