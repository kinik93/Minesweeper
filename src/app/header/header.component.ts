import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../gameboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private gameBoardService: GameBoardService) { }

  ngOnInit() {
  }

  changeDifficulty(newDiff: string, newRows, newCols, newMines) {
    this.gameBoardService.setDifficulty(newDiff);
    this.gameBoardService.setNrows(newRows);
    this.gameBoardService.setNcolumns(newCols);
    this.gameBoardService.setTotalMines(newMines);
    this.gameBoardService.initializeEmptyGrid();
    this.gameBoardService.setFirstClick(true);
    this.gameBoardService.revMines.emit(this.gameBoardService.getTotalMines());
    this.gameBoardService.gridChange.next(this.gameBoardService.getGrid());
    this.gameBoardService.stopChrono();
  }

  onBeginnerClick() {
    this.changeDifficulty('Beginner', 9, 9, 10);
  }

  onIntermediateClick() {
    this.changeDifficulty('Intermediate', 16, 16, 40);
  }

  onExpertClick() {
    this.changeDifficulty('Expert', 16, 30, 99);
  }

}
