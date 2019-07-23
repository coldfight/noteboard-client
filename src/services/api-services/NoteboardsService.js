import Axios from "axios";

const RESOURCE_NAME = "/api/noteboards";

export default {
  getAll() {
    return Axios.get(`${RESOURCE_NAME}`).catch(err => {
      console.log(`Could not pull the data for noteboards`, err);
    });
  },

  getNoteboard(id) {
    return Axios.get(`${RESOURCE_NAME}/${id}`).catch(err => {
      console.log(`Could not pull the data for noteboard: ${id}`, err);
    });
  },

  createNoteboard(noteboardObj) {
    return Axios.post(`${RESOURCE_NAME}`, {
      ...noteboardObj
    })
  }
};
