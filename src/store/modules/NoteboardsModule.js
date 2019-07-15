import _ from "lodash";
import NoteboardsService from "@/services/api-services/NoteboardsService";

const state = {
  loaded: false,
  noteboards: [],
  currentNoteboard: null
};

const getters = {};

const mutations = {
  SET_LOADED(state, loaded) {
    state.loaded = loaded;
  },
  SET_NOTEBOARDS(state, noteboards) {
    state.noteboards = noteboards;
  },
  SET_CURRENT_NOTEBOARD(state, currentNoteboard) {
    state.currentNoteboard = currentNoteboard;
  }
};

const actions = {
  async GET_NOTEBOARDS(context) {
    // Clear the list of noteboards before retrieving new ones
    context.commit("SET_NOTEBOARDS", []);
    context.commit("SET_LOADED", false);
    const response = await NoteboardsService.getAll();
    if (response && response.data) {
      context.commit("SET_NOTEBOARDS", response.data);
    }
    context.commit("SET_LOADED", true);
  },
  async GET_NOTEBOARD_BY_ID(context, id) {
    // Clear the currentNoteboard before retrieving the new one.
    context.commit("SET_CURRENT_NOTEBOARD", null);
    context.commit("SET_LOADED", false);
    const response = await NoteboardsService.getBoard(id);
    if (response && !_.isEmpty(response.data)) {
      // @todo: this weirdness because of firebase.. update once we use a real database
      context.commit(
        "SET_CURRENT_NOTEBOARD",
        response.data[_.keys(response.data)[0]]
      );
    }
    context.commit("SET_LOADED", true);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
