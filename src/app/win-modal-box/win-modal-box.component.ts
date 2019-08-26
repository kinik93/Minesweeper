import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameBoardService } from '../gameboard.service';
import { HttpClient } from '@angular/common/http';

export class RankItem {
  constructor(public name: string, public time: number, public difficulty: string) {}
}

@Component({
  selector: 'app-win-modal-box',
  templateUrl: './win-modal-box.component.html',
  styleUrls: ['./win-modal-box.component.css']
})
export class WinModalBoxComponent implements OnInit {

  inputName = '';

  constructor(public router: Router,
              private gameBoardService: GameBoardService,
              private http: HttpClient) { }

  ngOnInit() {
  }

  /**
   * Save data for ranking table to firebase server
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

    setTimeout(() => {
      this.router.navigate(['rankings']);
    }, 1000);
  }
}
