import _ from "lodash";
import NotesService from "@/services/api-services/NotesService";

const state = {
  notes: [],
  loaded: false
};

const getters = {};

const mutations = {
  SET_LOADED(state, loaded) {
    state.loaded = loaded;
  },
  SET_NOTES(state, notes) {
    state.notes = notes;
  }
};

const actions = {
  async GET_NOTES(context, noteboardId) {
    // Clear the list of notes before retrieving new ones.
    context.commit("SET_NOTES", []);
    context.commit("SET_LOADED", false);
    if (noteboardId) {
      const response = await NotesService.getAllByBoardId(noteboardId);
      if (response && !_.isEmpty(response.data)) {
        // @todo: this weirdness because of firebase.. update once we use a real database
        const notes = [];
        _.each(response.data, item => notes.push(item));
        context.commit("SET_NOTES", notes);
        return;
      }
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
