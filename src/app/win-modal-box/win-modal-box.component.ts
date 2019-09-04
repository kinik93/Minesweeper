import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameBoardService } from '../gameboard.service';
import { HttpClient } from '@angular/common/http';

/**
 * This class represents the type of each rank item which is saved
 */
export class RankItem {

  /**
   * Instanciate a new RankItem
   * @param name the name of the player
   * @param time the time spent by the player to win the game
   * @param difficulty the difficulty of the game the player played
   */
  constructor(public name: string, public time: number, public difficulty: string) {}
}

/**
 * In MVC architectural pattern this class represents the controller associated with
 * winner modal box view (the html file)
 */
@Component({
  selector: 'app-win-modal-box',
  templateUrl: './win-modal-box.component.html',
  styleUrls: ['./win-modal-box.component.css']
})
export class WinModalBoxComponent implements OnInit {

  inputName = ''; // the name of the winner of the game

  constructor(public router: Router,
              private gameBoardService: GameBoardService,
              private http: HttpClient) { }

  ngOnInit() {
  }

  /**
   * Save data for ranking table making a post request to firebase server.
   *
   * A little time break has been added to allow ranktable component to load
   * the right items.
   */
  onSaveClick() {
    const postData = new RankItem(this.inputName,
                                  this.gameBoardService.getCounterTime(),
                                  this.gameBoardService.getDifficulty());
    console.log(postData  );
    this.http.post<RankItem>('https://ng-minesweeper.firebaseio.com/ranks.json',
      postData
    ).subscribe(responseData => {
      console.log(responseData);
    });
    this.gameBoardService.setWinning(false);
    this.gameBoardService.setClickEnabled(false);

    setTimeout(() => {
      this.router.navigate(['rankings']);
    }, 1000);
  }
}
