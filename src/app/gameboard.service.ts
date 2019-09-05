import { Cell, Point } from './game-board/cell.model';
import { interval, Subscription, Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';

/**
 * In MVC architectural pattern this class represents the model class.
 */
export class GameBoardService {
  grid: Cell[][] = []; // the grid of the game
  nRows: number; // the number of rows of the game
  nColumns: number; // the number of columns of the game
  nMines: number; // total number of mines of the game
  revealedMines: number; // the number of revealed mines of the game
  firstClick: boolean;
  difficulty: string; // the difficulty of the game
  winning = false;
  counterTime = 0;
  clickEnabled = true; // check if the user can reveal cells

  gridChange = new Subject<Cell[][]>();

  revMines = new EventEmitter<number>();
  elapsedTime = new EventEmitter<number>(); // the time passed from first click on the grid
  winEvent = new EventEmitter<boolean>();

  private chronoSubscription: Subscription;

  constructor() {
    this.nRows = 9;
    this.nColumns = 9;
    this.nMines = 10;
    this.revealedMines = this.nMines;
    this.firstClick = true;
    this.difficulty = 'Beginner';

    this.initializeEmptyGrid();
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

  /**
   * @returns Return the number of columns of the grid
   */
  getNcolumns() {
    return this.nColumns;
  }

  /**
   * Set the number of columns of the grid
   * @param n the new number of columns
   */
  setNcolumns(n) {
    this.nColumns = n;
  }

  /**
   * @returns true if it's the first time you click a cell
   */
  getFirstClick() {
    return this.firstClick;
  }

  /**
   * set if it's the first time you click a cell
   * @param tmp
   */
  setFirstClick(tmp: boolean) {
    this.firstClick = tmp;
  }

  /**
   * get the total number of mines
   */
  getTotalMines() {
    return this.nMines;
  }

  /**
   * Set the total number of mines
   * @param nMines the new number of total mines
   */
  setTotalMines(nMines) {
    this.nMines = nMines;
  }

  /**
   * Get the total number of revealed mines
   */
  getRevealedMines() {
    return this.revealedMines;
  }

  /**
   * Set the total number of revealed mines
   * @param rMines the new number of revealed mines
   */
  setRevealedMines(rMines) {
    this.revealedMines = rMines;
  }

  /**
   * @returns return the grid element
   */
  getGrid() {
    return this.grid;
  }

  /**
   * @return return the difficult of actual gameplay
   */
  getDifficulty() {
    return this.difficulty;
  }

  /**
   * Set the new difficulty of the game
   * @param difficulty the new difficulty
   */
  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  /**
   * @return return true if the player wins the game
   */
  getWinning() {
    return this.winning;
  }

  /**
   * Set if the player wins the game
   * @param status the new status
   */
  setWinning(status: boolean) {
    this.winning = status;
  }

  getCounterTime() {
    return this.counterTime;
  }

  setCounterTime(tmpTime: number) {
    this.counterTime = tmpTime;
  }

  /**
   * return true if the player if the player can click on cells
   */
  getClickEnabled() {
    return this.clickEnabled;
  }

  /**
   * Set if the player can click on cells or not
   * @param tmp if it is true the user can click on cells
   */
  setClickEnabled(tmp: boolean) {
    this.clickEnabled = tmp;
  }

  /**
   * Initilize an empty grid without mines
   */
  initializeEmptyGrid() {
    for (let i = 0; i < this.nRows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.nColumns; j++) {
        this.grid[i][j] = new Cell(new Point(i, j), false, false, false, 0);
      }
    }
  }

  /**
   * Check if the cell in this position is a mine or not
   * @param position the position to be checked
   * @return true if the cell in the position passed it's a mine
   */
  checkMine(position: Point) {
    if (this.grid[position.getX()][position.getY()].getIsMine()) {
      return true;
    }
    return false;
  }

  /**
   * Check if p2 is in the adjacent zone of p1
   * @param p1 first point
   * @param p2 second point
   */
  isAdj(p1: Point, p2: Point) {
    for (let i = p1.getX() - 1 ; i < p1.getX() + 2; i++) {
      for (let j = p1.getY() - 1 ; j < p1.getY() + 2; j++) {
        if (i >= 0 && i < this.nRows && j >= 0 && j < this.nColumns) {
          if (p2.getX() === i && p2.getY() === j) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Put the mines in random position over the grid
   * @param firstClick the first point position click
   */
  plantMines(firstClick: Point) {
    let i = 0;

    while (i < this.nMines) {
      const randomPoint = new Point(Math.floor(Math.random() * this.nRows),
                                    Math.floor(Math.random() * this.nColumns));
      if (!this.isAdj(firstClick, randomPoint)) {
        if (this.checkMine(randomPoint) === false) {
          this.grid[randomPoint.getX()][randomPoint.getY()].setIsMine(true);
          i = i + 1;
        }
      }
    }
  }

  /**
   * Set all adjacent mines number over all the grid
   */
  setAllAdjMines() {
    for (let i = 0; i < this.nRows; i++) {
      for (let j = 0; j < this.nColumns; j++) {
        if (!this.grid[i][j].getIsMine()) {
          this.grid[i][j].setAdjMines(this.countAdjMines(i, j));
        }
      }
    }
  }

  /**
   * Count the adjacent mines in a certain cell
   * @param x the x position of the cell to be checked
   * @param y the y position of the cell to be checked
   * @return return the number of adjacent mines
   */
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

  /**
   * Recursive function to reveal cell with no adjacent mines. At the end of the function
   * we get a set of cell revealed and the border of this set is made by revealed cell with
   * adjacent mines greater then zero.
   * @param x the x position of cell clicked
   * @param y the y position of cell clicked
   */
  revealZeroCells(x: number, y: number) {
    for (let i = x - 1 ; i < x + 2; i++) {
      for (let j = y - 1 ; j < y + 2; j++) {
        if (i >= 0 && i < this.nRows && j >= 0 && j < this.nColumns) {
          if (!this.grid[i][j].getIsFlag()) {
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

  /**
   * Check if the player wins the game
   */
  checkVictory() {
    // count the number of cells revealed that are not mines
    let revMines = 0;
    for (let i = 0; i < this.nRows; i++) {
      for (let j = 0; j < this.nColumns; j++) {
        if (!this.grid[i][j].getIsMine() && this.grid[i][j].getIsRevealed()) {
          revMines++;
        }
      }
    }

    // depending on previous value check if the user win the game
    if (revMines === (this.nRows * this.nColumns) - this.nMines ) {
      console.log('you win');
      this.winning = true;
      this.winEvent.emit(true);
      this.stopChrono();
    }
  }

  /**
   * Reveal all grid cells which are mines
   */
  revealAllMines() {
    for (let i = 0; i < this.nRows; i++) {
      for (let j = 0; j < this.nColumns; j++) {
        if (this.grid[i][j].getIsMine()) {
          this.grid[i][j].setIsRevealed(true);
        }
      }
    }
  }

  /**
   * Start the chronometer and notify other possible components
   */
  startChrono() {
    this.chronoSubscription = interval(1000).subscribe(count => {
      this.elapsedTime.emit(count);
      this.counterTime = count;
    });
  }

  /**
   * Reset the chronometer and notify other possible components
   */
  zeroChrono() {
    this.counterTime = 0;
    this.elapsedTime.emit(0);
  }

  /**
   * Stop the chronometer
   */
  stopChrono() {
    if (this.chronoSubscription !== undefined) {
      this.chronoSubscription.unsubscribe();
    }
  }
}
