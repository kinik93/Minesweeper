import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../gameboard.service';
import { Cell, Point } from './cell.model';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  grid: Cell[][] = [];
  nRows: number;
  nColumns: number;
  rowArray: number[] = [];
  colArray: number[] = [];

  elapsedTime: number;

  constructor(private gameBoardService: GameBoardService) { }

  ngOnInit() {
    this.nRows = this.gameBoardService.getNrows();
    this.nColumns = this.gameBoardService.getNcolumns();
    this.rowArray = Array.from({length: this.nRows}, (x, i) => i);
    this.colArray = Array.from({length: this.nColumns}, (x, i) => i);
    this.grid = this.gameBoardService.getGrid();

    //this.elapsedTime = this.gameBoardService.elapsedTime;
  }

  onCellClick(x: number, y: number) {
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
        alert("You Loose");
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

  onRightCellClick(event, x: number, y: number) {
    event.preventDefault();
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

