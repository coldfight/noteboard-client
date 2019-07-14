import Axios from "axios";

const RESOURCE_NAME: string = "/notes";

export default {
  getAllByBoardId(boardId: number) {
    return Axios.get(
      `${RESOURCE_NAME}.json?orderBy="boardId"&equalTo=${boardId}`
    );
  }
};
