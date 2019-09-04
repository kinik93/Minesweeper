/**
 * This class represent a 2D point with (x, y) position
 */
export class Point {
  constructor(private x: number, private y: number) { }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}

/**
 * This class represents a cell of the grid of minesweeper game
 */
export class Cell {
  private position: Point;
  private isMine: boolean;
  private isFlag: boolean;
  private isRevealed: boolean;
  private adjMines: number;

  /**
   * Create a new cell of the grid
   * @param position the 2D position of the cell
   * @param isMine true if the cell is a mine
   * @param isFlag true if the cell is a flag
   * @param isRevealed true if the cell is revealed
   * @param adjMines the number of adjacent mines
   */
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
