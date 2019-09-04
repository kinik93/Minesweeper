import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../gameboard.service';
import { Cell, Point } from './cell.model';

/**
 * In MVC architectural pattern this class represents the controller associated with
 * gameboard view (the html file)
 */
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  grid: Cell[][] = []; // the grid of the game
  nRows: number;
  nColumns: number;
  rowArray: number[] = []; // a support array variable useful for looping in the html (i.e. in the view)
  colArray: number[] = []; // a support array variable useful for looping in the html (i.e. in the view)
  winning: boolean;

  elapsedTime: number;

  constructor(private gameBoardService: GameBoardService) {
  }

  /**
   * Create a new gridboard of minesweeper game
   */
  ngOnInit() {
    this.nRows = this.gameBoardService.getNrows();
    this.nColumns = this.gameBoardService.getNcolumns();
    this.rowArray = Array.from({length: this.nRows}, (x, i) => i); // create an array from 0 to (nRows-1): [0...(nRows-1)]
    this.colArray = Array.from({length: this.nColumns}, (x, i) => i); // create an array from 0 to (nCols-1): [0...(nCols-1)]
    this.grid = this.gameBoardService.getGrid();
    this.winning = this.gameBoardService.getWinning();

    this.gameBoardService.gridChange
      .subscribe(
        (newGrid: Cell[][]) => {
          this.grid = newGrid;
          this.nRows = this.gameBoardService.getNrows();
          this.nColumns = this.gameBoardService.getNcolumns();
          this.rowArray = Array.from({length: this.nRows}, (x, i) => i);
          this.colArray = Array.from({length: this.nColumns}, (x, i) => i);
        }
      );

    this.gameBoardService.winEvent.subscribe(
      (winState: boolean) => (this.winning = winState)
    );
  }

  /**
   * Start the appropriate action on left-mouse click on a cell with position (x, y)
   * depending on the cell state.
   * @param x
   * @param y
   */
  onCellClick(x: number, y: number) {
    if (this.gameBoardService.getClickEnabled()) {
      if (this.gameBoardService.getFirstClick()) {
        this.gameBoardService.plantMines(new Point(x, y));
        this.gameBoardService.setAllAdjMines();
        this.gameBoardService.setFirstClick(false);
        this.gameBoardService.startChrono();
      }
      if (!this.grid[x][y].getIsRevealed() && !this.grid[x][y].getIsFlag()) {
        if (this.grid[x][y].getIsMine()) {
          this.gameBoardService.revealAllMines();
          this.gameBoardService.stopChrono();
          this.gameBoardService.setClickEnabled(false);
          alert('You Loose');
        } else {
          if (this.grid[x][y].getAdjMines() === 0) {
            this.gameBoardService.revealZeroCells(x, y);
          } else {
            this.grid[x][y].setIsRevealed(true);
          }
          this.gameBoardService.checkVictory();
        }
      }
    }
  }

  /**
   * Set the cell state to flag if the cell (of position (x,y)) is not revealed
   * and notify gameinfo component to update total number of revealed mines
   * @param event
   * @param x
   * @param y
   */
  onRightCellClick(event, x: number, y: number) {
    event.preventDefault(); // avoid standard menu visualization on right click
    if (this.gameBoardService.getClickEnabled()) {
      if (!this.grid[x][y].getIsRevealed()) {
        if (!this.grid[x][y].getIsFlag()) {
          this.grid[x][y].setIsFlag(true);
          this.gameBoardService.setRevealedMines(this.gameBoardService.getRevealedMines() - 1);
        } else {
          this.grid[x][y].setIsFlag(false);
          this.gameBoardService.setRevealedMines(this.gameBoardService.getRevealedMines() + 1);
        }
        this.gameBoardService.revMines.emit(this.gameBoardService.getRevealedMines());
      }
    }
  }
}

