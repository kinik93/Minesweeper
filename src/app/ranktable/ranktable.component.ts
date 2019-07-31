import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameBoardService } from '../gameboard.service';
import { RankItem } from '../win-modal-box/win-modal-box.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ranktable',
  templateUrl: './ranktable.component.html',
  styleUrls: ['./ranktable.component.css']
})
export class RanktableComponent implements OnInit {

  loadedRanks: RankItem[] = [];
  diff: string;

  constructor(private http: HttpClient, private gameboardService: GameBoardService) {
    this.diff = this.gameboardService.getDifficulty();
  }

  fetchData(difficulty: string) {
    this.http.get('https://ng-minesweeper.firebaseio.com/ranks.json').pipe(map(
      resData => {
        const rankArray = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].difficulty === difficulty){
              rankArray.push({...resData[key]});
            }
          }
        }
        return rankArray;
      }

    ))
      .subscribe(ranks => {
        this.loadedRanks = ranks;
        this.loadedRanks.sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
    });
  }

  ngOnInit() {
    this.fetchData(this.diff);
  }

  onBeginnerClick() {
    this.fetchData('Beginner');
  }

  onIntermediateClick() {
    this.fetchData('Intermediate');
  }

  onExpertClick() {
    this.fetchData('Expert');
  }
}
