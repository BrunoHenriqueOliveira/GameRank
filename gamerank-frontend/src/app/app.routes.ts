import { Routes } from '@angular/router';
import { GameListComponent } from './features/games/game-list/game-list.component';
import { GameDetailComponent } from './features/games/game-detail/game-detail.component';
import { AboutComponent } from './features/about/about.component';

export const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'games/:id', component: GameDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
