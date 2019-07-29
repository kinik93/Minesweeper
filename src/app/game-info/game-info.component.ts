import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../gameboard.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {

  revMines: number;
  elapsedTime = 0;

  constructor(private gameBoardService: GameBoardService) {
    this.gameBoardService.revMines.subscribe(
      (nRevStatus: number) => (this.revMines = nRevStatus)
    );

    this.gameBoardService.elapsedTime.subscribe(
      (tmpTime: number) => (this.elapsedTime = tmpTime)
    );
  }

  ngOnInit() {
    this.revMines = this.gameBoardService.getRevealedMines();
  }

  onReloadClick() {
    this.gameBoardService.initializeEmptyGrid();
    this.gameBoardService.setFirstClick(true);
    this.gameBoardService.stopChrono();
    this.elapsedTime = 0;
  }
}
