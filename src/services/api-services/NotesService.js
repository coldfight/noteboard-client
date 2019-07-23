import Axios from "axios";

const RESOURCE_NAME = "/api/notes";

export default {
  getAllByNoteboardId(noteboardId) {
    return Axios.get(
      `${RESOURCE_NAME}?noteboard.id=${noteboardId}`
    );
  },
  createNote(noteObj) {
    return Axios.post(`${RESOURCE_NAME}`, {
      ...noteObj
    });
  },
  deleteNote(note) {
    return Axios.delete(`${RESOURCE_NAME}/${note.id}`);
  },
  updateNote(note) {
    return Axios.put(`${RESOURCE_NAME}/${note.id}`, {
      ...note
    });
  }
};
