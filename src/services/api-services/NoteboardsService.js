import Axios from "axios";

const RESOURCE_NAME = "/boards";

export default {
  getAll() {
    return Axios.get(`${RESOURCE_NAME}.json`);
  },

  getBoard(id) {
    return Axios.get(`${RESOURCE_NAME}.json?orderBy="id"&equalTo=${id}`);
  }
};
