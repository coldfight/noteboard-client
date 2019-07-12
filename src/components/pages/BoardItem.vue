<template>
  <div class="boardItem" style="height: 100%;">
    <!-- This transition is necessary because because it might not be loaded 
    in time for the transition to nicely display this element-->
    <transition name="fade" mode="out-in">
      <div v-if="board" class="card-body" :style="boardItemCardStyles">
        <h4 :id="`board_${board.id}`" class="card-title">{{ board.name }}</h4>
        <p class="card-text">{{ board.description }}</p>
      </div>
    </transition>
    <div v-if="!board" class="card-body" :style="{ height: '100%' }">
      <span v-if="!loaded">Loading...</span>
      <span v-else>Could not find Board</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import _ from "lodash";
import Board from "@/entities/Board";
import Util from "@/lib/util";
import BoardsService from "@/services/api-services/BoardsService";

@Component({
  components: {}
})
export default class BoardItem extends Vue {
  /**
   * "data"
   */
  board: Board | null = null;
  loaded: boolean = false;

  /**
   * "watch"
   */
  // Watch for changes to the route. If we're changing to another
  // noteboard we're going to have to pull the new data for it.
  @Watch("$route")
  onRouteChanged(value: any, oldValue: any) {
    this.retrieveBoard();
  }

  get boardItemCardStyles(): object {
    const styles = { height: "100%", backgroundColor: "", color: "" };

    if (this.board) {
      styles.backgroundColor = this.board.color;
      styles.color = this.autoColorFromBackgroundColor;
    }

    return styles;
  }

  /**
   * "computed"
   */
  get autoColorFromBackgroundColor(): string {
    if (this.board) {
      return Util.autoColorFromColor(this.board.color);
    }
    return "#ffffff";
  }

  /**
   * "lifecycle" hook methods
   */
  beforeMount() {
    this.retrieveBoard();
  }

  /**
   * "methods"
   */
  async retrieveBoard() {
    this.board = null;
    this.loaded = false;
    const response = await BoardsService.get(parseInt(this.$route.params.id));
    if (response.data && !_.isEmpty(response.data)) {
      // @todo: this weirdness because of firebase.. update once we use a real database
      this.board = response.data[_.keys(response.data)[0]];
    }
    this.loaded = true;
  }
}
</script>
