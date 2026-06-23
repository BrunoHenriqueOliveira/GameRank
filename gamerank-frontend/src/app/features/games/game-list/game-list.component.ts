import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../../../core/services/game.service';
import { Game } from '../../../models/game';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games$!: Observable<Game[]>;
  loading = true;
  error: string | null = null;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.games$ = this.gameService.getGames().pipe(
      tap(() => (this.error = null)),
      catchError((err) => {
        console.error('API ERROR:', err);
        this.error = 'Não foi possível carregar os jogos. Tente novamente mais tarde.';
        return of([]);
      }),
      finalize(() => (this.loading = false))
    );
  }

  trackById(_: number, game: Game) {
    return game.id;
  }

  goToDetail(id: string): void {
    this.router.navigate(['/games', id]);
  }

  getAverageRating(game: Game): number | null {
    if (!game?.reviews?.length) return null;
    const sum = game.reviews.reduce((s, r) => s + (r.rating ?? 0), 0);
    return Math.round((sum / game.reviews.length) * 10) / 10;
  }

  getRatingArray(rating: number): boolean[] {
    return [1, 2, 3, 4, 5].map(i => i <= Math.round(rating));
  }

  getGameInitial(title: string | undefined): string {
    return (title || 'G').charAt(0).toUpperCase();
  }
}
