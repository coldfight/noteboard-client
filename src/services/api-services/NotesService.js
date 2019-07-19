import Axios from "axios";

const RESOURCE_NAME = "/notes";

export default {
  getAllByBoardId(boardId) {
    return Axios.get(
      `${RESOURCE_NAME}.json?orderBy="boardId"&equalTo=${boardId}`
    );
  },
  createNote(noteObj) {
    return Axios.post(`${RESOURCE_NAME}.json`, {
      ...noteObj
    });
  },
  deleteNote(note) {
    return Axios.delete(`${RESOURCE_NAME}/${note.firebaseId}.json`);
  },
  updateNote(note) {
    return Axios.put(`${RESOURCE_NAME}/${note.firebaseId}.json`, {
      ...note
    });
  }
};
