import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../gameboard.service';

/**
 * In MVC architectural pattern this class represents the controller associated with
 * header view (the html file)
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private gameBoardService: GameBoardService) { }

  ngOnInit() {
  }

  /**
   * Change the difficulty and create a new game. Also stop the chrono and reset
   * revealed mines.
   * @param newDiff the new difficulty
   * @param newRows the new number of rows
   * @param newCols the new number of columns
   * @param newMines the new number of mines
   */
  changeDifficulty(newDiff: string, newRows, newCols, newMines) {
    this.gameBoardService.setDifficulty(newDiff);
    this.gameBoardService.setNrows(newRows);
    this.gameBoardService.setNcolumns(newCols);
    this.gameBoardService.setTotalMines(newMines);
    this.gameBoardService.initializeEmptyGrid();
    this.gameBoardService.setFirstClick(true);
    this.gameBoardService.setWinning(false);
    this.gameBoardService.setClickEnabled(true);
    this.gameBoardService.setRevealedMines(newMines);
    this.gameBoardService.revMines.emit(this.gameBoardService.getTotalMines());
    this.gameBoardService.gridChange.next(this.gameBoardService.getGrid());
    this.gameBoardService.stopChrono();
    this.gameBoardService.zeroChrono();
  }

  /**
   * Create a new game with beginner difficulty
   */
  onBeginnerClick() {
    this.changeDifficulty('Beginner', 9, 9, 10);
  }

  /**
   * Create a new game with intermediate difficulty
   */
  onIntermediateClick() {
    this.changeDifficulty('Intermediate', 16, 16, 40);
  }

  /**
   * Create a new game with expert difficulty
   */
  onExpertClick() {
    this.changeDifficulty('Expert', 16, 30, 99);
  }

}
