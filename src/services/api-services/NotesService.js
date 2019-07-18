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
  deleteNote(noteFirebaseId) {
    return Axios.delete(`${RESOURCE_NAME}/${noteFirebaseId}.json`);
  }
};
