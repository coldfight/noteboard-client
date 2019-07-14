import Vue from "vue";
import Vuex from "vuex";
import NoteboardsModule from "./modules/NoteboardsModule";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    noteboards: NoteboardsModule
  }
});
