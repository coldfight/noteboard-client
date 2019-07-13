<template>
  <li class="nav-item">
    <router-link
      class="nav-link"
      :to="{ name: '@noteboardItemPage', params: { id: board.id } }"
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
