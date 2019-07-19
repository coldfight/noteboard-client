import Vue from "vue";
import Vuex from "vuex";
import noteboards from "./modules/NoteboardsModule";
import notes from "./modules/NotesModule";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    noteboards,
    notes
  },
  strict: true
});
