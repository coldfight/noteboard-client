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
  },
  ADD_NOTE(state, note) {
    state.notes.push(note);
  },
  REMOVE_NOTE(state, note) {
    let arrayIndex = state.notes
      .map(note => note.firebaseId)
      .indexOf(note.firebaseId);
    state.notes.splice(arrayIndex, 1);
  },
  UPDATE_NOTE(state, note) {
    let arrayIndex = state.notes
      .map(note => note.firebaseId)
      .indexOf(note.firebaseId);
    state.notes[arrayIndex] = note;
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
        _.each(response.data, (item, firebaseId) => {
          (item.firebaseId = firebaseId), notes.push(item);
        });
        context.commit("SET_NOTES", notes);
      }
    }
    context.commit("DECREMENT_LOADER");
  },
  /**
   * @param context
   * @param noteObj Expects three object properties: 'title', 'content', 'color', 'boardId'
   */
  async ADD_NOTE(context, noteObj) {
    context.commit("INCREMENT_LOADER");
    const response = await NotesService.createNote(noteObj);
    if (response && !_.isEmpty(response.data)) {
      noteObj.firebaseId = response.data.name;
      context.commit("ADD_NOTE", noteObj);
    }
    context.commit("DECREMENT_LOADER");
  },

  async DELETE_NOTE(context, note) {
    context.commit("INCREMENT_LOADER");
    await NotesService.deleteNote(note);
    context.commit("REMOVE_NOTE", note);
    context.commit("DECREMENT_LOADER");
  },

  async UPDATE_NOTE(context, payload) {
    context.commit("INCREMENT_LOADER");
    const note = {
      ...payload.note,
      ...payload.updatedProperties
    };
    await NotesService.updateNote(note);
    context.commit("UPDATE_NOTE", note);
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
