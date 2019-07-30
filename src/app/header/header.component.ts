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

  onBeginnerClick(){
    /*this.gameBoardService.setNrows(15);
    this.gameBoardService.setNcolumns(15);
    this.gameBoardService.initializeEmptyGrid();*/
  }

}
