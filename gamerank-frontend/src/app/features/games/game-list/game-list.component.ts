import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game.service';
import { Game } from '../../../models/game';

@Component({
  selector: 'app-game-list',
  standalone: true,
  templateUrl: './game-list.component.html'
})
export class GameListComponent implements OnInit {

  games: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (data) => {
        console.log("API RESULT:", data);
        this.games = data;
      },
      error: (err) => {
        console.error("API ERROR:", err);
      }
    });
  }
}
