import { Component } from '@angular/core';
import { GameBoardService } from './gameboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GameBoardService]
})
export class AppComponent {
  title = 'Minesweeper';
}
