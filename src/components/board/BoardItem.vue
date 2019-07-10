<template>
  <div class="boardItem">
    <div>ID: {{ board.id }}</div>
    <div>Name: {{ board.name }}</div>
    <div>Description: {{ board.description }}</div>
    <div :style="{ color: board.color }">Color: {{ board.color }}</div>
    <div>Privacy: {{ board.privacy }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Board from "@/entities/Board";

@Component({
  components: {}
})
export default class BoardItem extends Vue {
  @Prop({ default: null }) board!: Board;
}
</script>

<style scoped>
.boardItem {
  padding: 15px;
}
</style>
