export class Point {
  constructor(public x: number, public y: number) { }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}

export class Cell {
  private position: Point;
  private isMine: boolean;
  private isFlag: boolean;
  private isRevealed: boolean;
  private adjMines: number;

  constructor(position: Point, isMine: boolean, isFlag: boolean, isRevealed: boolean, adjMines: number) {
    this.position = position;
    this.isMine = isMine;
    this.isFlag = isFlag;
    this.isRevealed = isRevealed;
    this.adjMines = adjMines;
  }

  getPosition() {
    return this.position;
  }

  setPosition(position) {
    this.position = position;
  }

  getIsMine() {
    return this.isMine;
  }

  setIsMine(isMine) {
    this.isMine = isMine;
  }

  getIsFlag() {
    return this.isFlag;
  }

  setIsFlag(isFlag) {
    this.isFlag = isFlag;
  }

  getAdjMines() {
    return this.adjMines;
  }

  setAdjMines(adjMines) {
    this.adjMines = adjMines;
  }

  getIsRevealed() {
    return this.isRevealed;
  }

  setIsRevealed(isRev) {
    this.isRevealed = isRev;
  }
}
