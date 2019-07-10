class Board {
  id: number;
  name: string;
  description: string;
  color: string;
  privacy: string;

  constructor(id: number, name: string = "", description: string = "", color: string = "", privacy: string = "") {
    this.id = id;
    this.name = name;
    this.description = description;
    this.color = color;
    this.privacy = privacy;
  }
}

export default Board;