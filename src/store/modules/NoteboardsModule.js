import NoteboardsService from "@/services/api-services/NoteboardsService";

const state = {
  noteboards: []
};

const getters = {};

const mutations = {
  SET_NOTEBOARDS(state, noteboards) {
    state.noteboards = noteboards;
  }
};

const actions = {
  async GET_NOTEBOARDS(context) {
    const response = await NoteboardsService.getAll();
    if (response && response.data) {
      context.commit("SET_NOTEBOARDS", response.data);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
