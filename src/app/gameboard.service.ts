import { Cell, Point } from './game-board/cell.model';
import { interval, Subscription, Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';

export class GameBoardService {
  grid: Cell[][] = [];
  nRows: number;
  nColumns: number;
  nMines: number;
  revealedMines: number;
  firstClick: boolean;
  difficulty: string;

  gridChange = new Subject<Cell[][]>();

  revMines = new EventEmitter<number>();
  elapsedTime = new EventEmitter<number>();

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

  getNcolumns() {
    return this.nColumns;
  }

  setNcolumns(n) {
    this.nColumns = n;
  }

  getFirstClick() {
    return this.firstClick;
  }

  setFirstClick(tmp: boolean) {
    this.firstClick = tmp;
  }

  getTotalMines() {
    return this.nMines;
  }

  setTotalMines(nMines) {
    this.nMines = nMines;
  }

  getRevealedMines() {
    return this.revealedMines;
  }

  setRevealedMines(rMines) {
    this.revealedMines = rMines;
  }

  getGrid() {
    return this.grid;
  }

  getDifficulty() {
    return this.difficulty;
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
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

  /**
   * Check if p2 is in the adjacent zone of p2
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

  checkVictory() {
    let revMines = 0;
    for (let i = 0; i < this.nRows; i++) {
      for (let j = 0; j < this.nColumns; j++) {
        if (!this.grid[i][j].getIsMine() && this.grid[i][j].getIsRevealed()) {
          revMines++;
        }
      }
    }
    if (revMines === (this.nRows * this.nColumns) - this.nMines ) {
      alert('You win');
      this.stopChrono();
    }
  }

  revealAllMines() {
    for (let i = 0; i < this.nRows; i++) {
      for (let j = 0; j < this.nColumns; j++) {
        if (this.grid[i][j].getIsMine()) {
          this.grid[i][j].setIsRevealed(true);
        }
      }
    }
  }

  startChrono() {
    this.chronoSubscription = interval(1000).subscribe(count => {
      this.elapsedTime.emit(count);
    });
  }

  zeroChrono(){
    this.elapsedTime.emit(0);
  }

  stopChrono() {
    if (this.chronoSubscription !== undefined) {
      this.chronoSubscription.unsubscribe();
    }
  }
}
