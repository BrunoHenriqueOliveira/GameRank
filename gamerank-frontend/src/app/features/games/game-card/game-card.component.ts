import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrichedGame } from '../../../models/game';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  @Input() game!: EnrichedGame;
  @Output() clicked = new EventEmitter<void>();
  @Output() rateClicked = new EventEmitter<number>();

  hoverStar = 0;

  get initial(): string {
    return (this.game.title || '?').charAt(0).toUpperCase();
  }

  get filledStars(): number {
    return this.game.avgRating ? Math.round(this.game.avgRating / 2) : 0;
  }

  get activeStars(): number {
    return this.hoverStar > 0 ? this.hoverStar : this.filledStars;
  }

  get hoverLabel(): string {
    const labels = ['', 'Péssimo', 'Fraco', 'Regular', 'Bom', 'Excelente'];
    return labels[this.hoverStar] ?? '';
  }

  get starsFilled(): boolean[] {
    if (!this.game.avgRating) return Array(5).fill(false);
    const n = Math.round(this.game.avgRating / 2);
    return [1, 2, 3, 4, 5].map(i => i <= n);
  }

  onStarHover(star: number): void { this.hoverStar = star; }
  onStarLeave(): void              { this.hoverStar = 0; }

  onStarClick(star: number, event: MouseEvent): void {
    event.stopPropagation();
    this.rateClicked.emit(star);
  }

  get sentimentClass(): string {
    const s = this.game.aiSentiment;
    if (s === null) return 'chip-none';
    if (s >= 70)   return 'chip-pos';
    if (s >= 40)   return 'chip-mid';
    return 'chip-neg';
  }

  get sentimentText(): string {
    return this.game.aiSentiment !== null ? `${this.game.aiSentiment}%` : '—';
  }

  get badgeBg():     string { return this.game.accentColor + '1a'; }
  get badgeBorder(): string { return this.game.accentColor + '40'; }
}
