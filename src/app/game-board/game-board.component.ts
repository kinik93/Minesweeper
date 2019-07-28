import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../gameboard.service';
import { Cell } from './cell.model';

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

  constructor(private gameBoardService: GameBoardService) { }

  ngOnInit() {
    this.nRows = this.gameBoardService.getNrows();
    this.nColumns = this.gameBoardService.getNcolumns();
    this.rowArray = Array.from({length: this.nRows}, (x, i) => i);
    this.colArray = Array.from({length: this.nColumns}, (x, i) => i);
    this.grid = this.gameBoardService.getGrid();
  }

  onCellClick(x: number, y: number) {
    if (!this.grid[x][y].getIsRevealed() && !this.grid[x][y].getIsFlag()) {
      if (this.grid[x][y].getIsMine()) {
        this.grid[x][y].setIsRevealed(true);
        alert("You Loose");
      } else {
        if (this.grid[x][y].getAdjMines() === 0) {
          this.gameBoardService.revealZeroCells(x, y);
        } else {
          this.grid[x][y].setIsRevealed(true);
        }
      }
    }
  }

  onRightCellClick(event, x: number, y: number) {
    event.preventDefault();
    this.grid[x][y].setIsFlag(!this.grid[x][y].getIsFlag());
  }

}

