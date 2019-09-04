import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../gameboard.service';

/**
 * In MVC architectural pattern this class represents the controller associated with
 * gameinfo view (the html file)
 */
@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {

  revMines: number; // the number of mines revealed in current game
  elapsedTime: number; // the time passed from the first click in current game

  constructor(private gameBoardService: GameBoardService) {
    this.elapsedTime = this.gameBoardService.getCounterTime();
  }

  /**
   * Ensures that chronometer and revealed mines are updated.
   */
  ngOnInit() {
    this.revMines = this.gameBoardService.getRevealedMines();

    this.gameBoardService.revMines.subscribe(
      (nRevStatus: number) => (this.revMines = nRevStatus)
    );

    this.gameBoardService.elapsedTime.subscribe(
      (tmpTime: number) => (this.elapsedTime = tmpTime)
    );
  }

  /**
   * Start a new game with the current difficulty. Stop and reset the chronometer and
   * set the revealed mines to the initial right value.
   */
  onReloadClick() {
    this.gameBoardService.initializeEmptyGrid();
    this.gameBoardService.setFirstClick(true);
    this.gameBoardService.stopChrono();
    this.gameBoardService.setRevealedMines(this.gameBoardService.getTotalMines());
    this.gameBoardService.setClickEnabled(true);
    this.revMines = this.gameBoardService.getTotalMines();
    this.elapsedTime = 0;
  }
}
