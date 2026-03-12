import { Component } from '@angular/core';
import { GameListComponent } from './features/games/game-list/game-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameListComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
