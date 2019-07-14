import Axios from "axios";

const RESOURCE_NAME: string = "/boards";

export default {
  getAll() {
    return Axios.get(`${RESOURCE_NAME}.json`);
  },

  getBoard(id: number) {
    return Axios.get(`${RESOURCE_NAME}.json?orderBy="id"&equalTo=${id}`);
  }
};
