import { Routes } from '@angular/router';
import { GameListComponent } from './features/games/game-list/game-list.component';

export const routes: Routes = [
  {
    path: '',
    component: GameListComponent
  },
  // fallback para 404
  {
    path: '**',
    redirectTo: ''
  }
];
