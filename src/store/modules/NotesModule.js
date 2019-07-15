import _ from "lodash";
import NotesService from "@/services/api-services/NotesService";

const state = {
  notes: [],
  loadingCount: 0
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
  SET_NOTES(state, notes) {
    state.notes = notes;
  }
};

const actions = {
  async GET_NOTES(context, noteboardId) {
    // Clear the list of notes before retrieving new ones.
    context.commit("SET_NOTES", []);
    context.commit("INCREMENT_LOADER");
    if (noteboardId) {
      const response = await NotesService.getAllByBoardId(noteboardId);
      if (response && !_.isEmpty(response.data)) {
        // @todo: this weirdness because of firebase.. update once we use a real database
        const notes = [];
        _.each(response.data, item => notes.push(item));
        context.commit("SET_NOTES", notes);
      }
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
