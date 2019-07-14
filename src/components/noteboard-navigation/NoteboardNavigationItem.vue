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

<script>
export default {
  name: "NoteboardNavigationItem",
  props: {
    board: {
      type: Object,
      required: true
    }
  }
};
</script>
