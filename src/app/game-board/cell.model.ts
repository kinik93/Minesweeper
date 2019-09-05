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

  /**
   * Get the position of the cell
   */
  getPosition() {
    return this.position;
  }

  /**
   * Set the position of the cell
   * @param position the new cell position
   */
  setPosition(position) {
    this.position = position;
  }

  /**
   * Return true if the cell is a mine
   */
  getIsMine() {
    return this.isMine;
  }

  /**
   * Set if the cell is a mine or not
   * @param isMine
   */
  setIsMine(isMine) {
    this.isMine = isMine;
  }

  /**
   * Return true if the cell is a flag
   */
  getIsFlag() {
    return this.isFlag;
  }

  /**
   * Set if the cell is a flag or not
   * @param isFlag
   */
  setIsFlag(isFlag) {
    this.isFlag = isFlag;
  }

  /**
   * Get the number of adjacient mines
   */
  getAdjMines() {
    return this.adjMines;
  }

  /**
   * Set the number of adjacient mines
   * @param adjMines the new number of adjacient mines
   */
  setAdjMines(adjMines) {
    this.adjMines = adjMines;
  }

  /**
   * Return true if the cell is revealed
   */
  getIsRevealed() {
    return this.isRevealed;
  }

  /**
   * Set if the cell is revealed or not
   * @param isRev
   */
  setIsRevealed(isRev) {
    this.isRevealed = isRev;
  }
}
