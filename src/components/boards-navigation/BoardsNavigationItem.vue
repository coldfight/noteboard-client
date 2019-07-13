<template>
  <li class="nav-item">
    <router-link
      class="nav-link"
      :to="{ name: '@noteboardsItemPage', params: { id: board.id } }"
      :title="board.description"
      >{{ board.name }}</router-link
    >
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Board from "@/entities/Board";

@Component({
  components: {}
})
export default class BoardsNavigationItem extends Vue {
  /**
   * "props"
   */
  @Prop({ default: null }) board!: Board;
}
</script>
