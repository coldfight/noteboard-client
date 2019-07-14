<template>
  <div class="noteboardNavigation">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <NoteboardNavigationItem
          v-for="board in boards"
          :key="board.id"
          :board="board"
        />
        <li class="nav-item">
          <a
            href="#"
            @click.prevent="createNewBoard"
            class="nav-link pl-2 pr-2 border-top border-right border-left"
            title="New Board"
          >
            <span class="oi oi-plus" aria-hidden="true"></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NoteboardNavigationItem from "@/components/noteboard-navigation/NoteboardNavigationItem.vue";

export default {
  name: "NoteboardNavigation",
  components: {
    NoteboardNavigationItem
  },
  props: {
    boards: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    createNewBoard() {
      this.$emit("create-new-board");
    }
  }
};
</script>
