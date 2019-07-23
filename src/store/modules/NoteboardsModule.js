import _ from "lodash";
import NoteboardsService from "@/services/api-services/NoteboardsService";

const state = {
  loadingCount: 0,
  noteboards: [],
  currentNoteboard: null
};

const getters = {
  LOADED: state => {
    return state.loadingCount === 0;
  }
};

const mutations = {
  INCREMENT_LOADER(state) {
    state.loadingCount++;
  },
  DECREMENT_LOADER(state) {
    state.loadingCount--;
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
    context.commit("INCREMENT_LOADER");
    const response = await NoteboardsService.getAll();
    if (response && response.data) {
      context.commit("SET_NOTEBOARDS", response.data);
    }
    context.commit("DECREMENT_LOADER");
  },
  async GET_NOTEBOARD_BY_ID(context, id) {
    // Clear the currentNoteboard before retrieving the new one.
    context.commit("SET_CURRENT_NOTEBOARD", null);
    context.commit("INCREMENT_LOADER");
    const response = await NoteboardsService.getNoteboard(id);
    if (response && !_.isEmpty(response.data)) {
      context.commit(
        "SET_CURRENT_NOTEBOARD",
        response.data
      );
    }
    context.commit("DECREMENT_LOADER");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
