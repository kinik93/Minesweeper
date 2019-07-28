import { Cell, Point } from './game-board/cell.model';

export class GameBoardService {
  grid: Cell[][] = [];
  nRows: number;
  nColumns: number;
  nMines: number;

  constructor() {
    this.nRows = 9;
    this.nColumns = 9;
    this.nMines = 10;

    this.startGame();
  }

  /**
   * @returns Return the number of rows of the grid
   */
  getNrows() {
    return this.nRows;
  }

  /**
   * Set the number of rows of the grid
   * @param n the new number of rows
   */
  setNrows(n) {
    this.nRows = n;
  }

  getNcolumns() {
    return this.nColumns;
  }

  setNcolumns(n) {
    this.nColumns = n;
  }

  getGrid() {
    return this.grid;
  }

  startGame() {
    this.initializeEmptyGrid();
    this.plantMines();
    this.setAllAdjMines();
  }

  initializeEmptyGrid() {
    for (let i = 0; i < this.nRows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.nColumns; j++) {
        this.grid[i][j] = new Cell(new Point(i, j), false, false, false, 0);
      }
    }
  }

  checkMine(position: Point) {
    if (this.grid[position.x][position.y].getIsMine()) {
      return true;
    }
    return false;
  }

  plantMines() {
    let i = 0;

    while (i < this.nMines) {
      const randomPoint = new Point(Math.floor(Math.random() * this.nRows),
                                    Math.floor(Math.random() * this.nColumns));
      console.log(randomPoint);
      if (this.checkMine(randomPoint) === false) {
        this.grid[randomPoint.getX()][randomPoint.getY()].setIsMine(true);
        i = i + 1;
      }
    }
  }

  setAllAdjMines() {
    for (let i = 0; i < this.nRows; i++) {
      for (let j = 0; j < this.nColumns; j++) {
        if (!this.grid[i][j].getIsMine()) {
          this.grid[i][j].setAdjMines(this.countAdjMines(i, j));
        }
      }
    }
  }

  countAdjMines(x: number, y: number) {
    let count = 0;
    for (let i = x - 1 ; i < x + 2; i++) {
      for (let j = y - 1 ; j < y + 2; j++) {
        if (i !== x || j !== y) {
          if (i >= 0 && i < this.nRows && j >= 0 && j < this.nColumns) {
            if (this.grid[i][j].getIsMine()) {
              count++;
            }
          }
        }
      }
    }
    return count;
  }

  revealZeroCells(x: number, y: number) {
    for (let i = x - 1 ; i < x + 2; i++) {
      for (let j = y - 1 ; j < y + 2; j++) {
        if (i >= 0 && i < this.nRows && j >= 0 && j < this.nColumns) {
          if (this.grid[i][j].getAdjMines() === 0 && !this.grid[i][j].getIsRevealed()) {
            this.grid[i][j].setIsRevealed(true);
            this.revealZeroCells(i, j);
          } else if (this.grid[i][j].getAdjMines() > 0 && !this.grid[i][j].getIsRevealed()) {
            this.grid[i][j].setIsRevealed(true);
          }
        }
      }
    }
  }
}
