<template>
  <div class="boardsNavigation">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li v-for="board in boards" :key="board.id" class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: '@boardItem', params: { id: board.id } }"
            >{{ board.name }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Board from "@/entities/Board";

@Component({
  components: {}
})
export default class BoardsNavigation extends Vue {
  /**
   * "props"
   */
  @Prop({ default: null }) boards!: Array<Board>;

  beforeMount() {}
}
</script>
