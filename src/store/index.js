import Vue from "vue";
import Vuex from "vuex";
import noteboards from "./modules/NoteboardsModule";
import notes from "./modules/NotesModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    noteboards,
    notes
  }
});
