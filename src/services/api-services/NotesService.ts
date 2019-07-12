import Axios from "axios";

const RESOURCE_NAME: string = "/notes";

export default {
  getAllForBoard(boardId: number) {
    return Axios.get(`${RESOURCE_NAME}.json?orderBy="board_id"&equalTo=${boardId}`);
  }
};
