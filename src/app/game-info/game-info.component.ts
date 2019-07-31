import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../gameboard.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {

  revMines: number;
  elapsedTime: number;

  constructor(private gameBoardService: GameBoardService) {
    this.elapsedTime = this.gameBoardService.getCounterTime();
  }

  ngOnInit() {
    this.revMines = this.gameBoardService.getRevealedMines();

    this.gameBoardService.revMines.subscribe(
      (nRevStatus: number) => (this.revMines = nRevStatus)
    );

    this.gameBoardService.elapsedTime.subscribe(
      (tmpTime: number) => (this.elapsedTime = tmpTime)
    );
  }

  onReloadClick() {
    this.gameBoardService.initializeEmptyGrid();
    this.gameBoardService.setFirstClick(true);
    this.gameBoardService.stopChrono();
    this.gameBoardService.setRevealedMines(this.gameBoardService.getTotalMines());
    this.revMines = this.gameBoardService.getTotalMines();
    this.elapsedTime = 0;
  }
}
