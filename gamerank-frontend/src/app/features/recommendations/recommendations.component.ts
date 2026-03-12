import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../../core/services/recommendation.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  templateUrl: './recommendations.component.html'
})
export class RecommendationsComponent implements OnInit {

  games: Game[] = [];

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.recommendationService.getRecommendations().subscribe(data => {
      this.games = data;
    });
  }
}
