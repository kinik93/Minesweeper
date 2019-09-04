import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameBoardService } from '../gameboard.service';
import { RankItem } from '../win-modal-box/win-modal-box.component';
import { map } from 'rxjs/operators';

/**
 * In MVC architectural pattern this class represents the controller associated with
 * ranktable view (the html file)
 */
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

  /**
   * Fetch the ranking from firebase server and sort data appropiately.
   * The shorter the time the higher it's the final rank position
   * @param difficulty the difficulty of ranking to be obtained
   */
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

  /**
   * Get beginner rankings
   */
  onBeginnerClick() {
    this.fetchData('Beginner');
  }

  /**
   * Get intermediate rankings
   */
  onIntermediateClick() {
    this.fetchData('Intermediate');
  }

  /**
   * Get expert rankings
   */
  onExpertClick() {
    this.fetchData('Expert');
  }
}
