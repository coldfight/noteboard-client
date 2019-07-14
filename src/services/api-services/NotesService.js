import Axios from "axios";

const RESOURCE_NAME = "/notes";

export default {
  getAllByBoardId(boardId) {
    return Axios.get(
      `${RESOURCE_NAME}.json?orderBy="boardId"&equalTo=${boardId}`
    );
  }
};
