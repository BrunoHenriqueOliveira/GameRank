import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  // Observable stream of games (use async pipe in template)
  games$!: Observable<Game[]>;

  // UI state
  loading = true;
  error: string | null = null;

  // Track expanded cards by id for review expansion
  private expanded = new Set<string>();

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loading = true;

    // Prefer returning Observable and using async pipe in template:
    this.games$ = this.gameService.getGames().pipe(
      tap(() => (this.error = null)),
      catchError((err) => {
        console.error('API ERROR:', err);
        this.error = 'Unable to load games. Please try again later.';
        // Return empty array so template can handle empty state
        return of([]);
      }),
      finalize(() => (this.loading = false))
    );
  }

  // trackBy function for ngFor performance
  trackById(_: number, game: Game) {
    return game.id;
  }

  // Toggle expanded state for a game card
  toggleExpand(id: string) {
    if (this.expanded.has(id)) {
      this.expanded.delete(id);
    } else {
      this.expanded.add(id);
    }
  }

  isExpanded(id: string) {
    return this.expanded.has(id);
  }

  // Calculate average rating (1 decimal) or return null if no reviews
  getAverageRating(game: Game): number | null {
    if (!game?.reviews?.length) return null;
    const sum = game.reviews.reduce((s, r) => s + (r.rating ?? 0), 0);
    return Math.round((sum / game.reviews.length) * 10) / 10;
  }

  // Helper to get first N reviews (used for preview)
  visibleReviews(game: Game, n = 3) {
    return game.reviews ? game.reviews.slice(0, n) : [];
  }

  // Helper para arredondar rating no template
  roundRating(value: number): number {
    return Math.round(value);
  }

  // Helper para gerar array de números para stars
  getRatingArray(rating: number): boolean[] {
    return [1, 2, 3, 4, 5].map(i => i <= rating);
  }

  // Helper para pegar primeira letra do título ou fallback
  getGameInitial(title: string | undefined): string {
    return (title || 'G')?.charAt(0).toUpperCase() || 'G';
  }
  protected readonly Math = Math;
}
