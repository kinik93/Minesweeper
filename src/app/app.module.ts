import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { HeaderComponent } from './header/header.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { HelperComponent } from './helper/helper.component';

const appRoutes: Routes = [
  { path: '', component: GameBoardComponent},
  { path: 'help', component: HelperComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    HeaderComponent,
    GameInfoComponent,
    DropdownDirective,
    HelperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
