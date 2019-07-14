<template>
  <nav class="navbar navbar-dark bg-primary">
    <router-link :to="{ name: '@noteboardsPage' }" class="navbar-brand"
      >Noteboard</router-link
    >
    <form @submit.prevent="search" class="form-inline">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        v-model="searchTerm"
      />
      <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    search() {
      // @todo: YOu want to pass this.searchTerm  to something... not sure what yet.
      // @todo: We will search All boards and notes
      console.log("You searched for: ", this.searchTerm);
    }
  }
};
</script>
