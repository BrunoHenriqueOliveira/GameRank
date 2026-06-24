import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../../core/services/game.service';
import { Game, EnrichedGame } from '../../../models/game';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { GameCardComponent } from '../game-card/game-card.component';

interface GenreCover { gradient: string; accent: string; }

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, GameCardComponent],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  allGames: EnrichedGame[] = [];
  filteredGames: EnrichedGame[] = [];
  loading = true;
  searchQuery = '';

  private readonly RELEASE_YEARS: Record<string, number> = {
    'Halo Infinite': 2021, 'Forza Horizon 5': 2021, 'Gears 5': 2019,
    'Gears of war': 2006, 'Sea of Thieves': 2018, 'Microsoft Flight Simulator': 2020,
    'Ori and the Will of the Wisps': 2020, 'Psychonauts 2': 2021, 'Grounded': 2022,
    'The Outer Worlds': 2019, 'Starfield': 2023, 'Forza Motorsport': 2023,
    'Age of Empires IV': 2021, 'Pentiment': 2022, 'Hi-Fi Rush': 2023,
    "Senua's Saga: Hellblade II": 2024, 'Minecraft Legends': 2023,
    'God of War': 2018, 'Halo': 2001, 'Doom': 2016,
  };

  private readonly GENRE_COVERS: Record<string, GenreCover> = {
    'FPS':                    { gradient: 'linear-gradient(160deg,#061428 0%,#0d2a50 50%,#061a36 100%)', accent: '#00c2ff' },
    'RPG':                    { gradient: 'linear-gradient(160deg,#1a0533 0%,#3d1266 50%,#250845 100%)', accent: '#a78bfa' },
    'Ação':                   { gradient: 'linear-gradient(160deg,#1a0505 0%,#4a1010 50%,#2d0a0a 100%)', accent: '#f87171' },
    'Action':                 { gradient: 'linear-gradient(160deg,#1a0505 0%,#4a1010 50%,#2d0a0a 100%)', accent: '#f87171' },
    'Corrida':                { gradient: 'linear-gradient(160deg,#030c1f 0%,#061e42 50%,#030e2a 100%)', accent: '#38bdf8' },
    'Aventura':               { gradient: 'linear-gradient(160deg,#041a10 0%,#0e4526 50%,#082e18 100%)', accent: '#34d399' },
    'Plataforma':             { gradient: 'linear-gradient(160deg,#1a0a2e 0%,#3d1f66 50%,#280f47 100%)', accent: '#c084fc' },
    'Sobrevivência':          { gradient: 'linear-gradient(160deg,#1a0f00 0%,#3d2500 50%,#2d1a00 100%)', accent: '#fb923c' },
    'Simulação':              { gradient: 'linear-gradient(160deg,#050f1a 0%,#0a2535 50%,#071828 100%)', accent: '#67e8f9' },
    'Estratégia':             { gradient: 'linear-gradient(160deg,#041a0c 0%,#0e4520 50%,#082e14 100%)', accent: '#4ade80' },
    'Ação/Ritmo':             { gradient: 'linear-gradient(160deg,#1a052d 0%,#4a1466 50%,#2d0a45 100%)', accent: '#e879f9' },
    'Third-person shooter':   { gradient: 'linear-gradient(160deg,#0c1220 0%,#182a45 50%,#0f1c30 100%)', accent: '#94a3b8' },
  };

  private readonly DEFAULT_COVER: GenreCover = {
    gradient: 'linear-gradient(160deg,#0d1117 0%,#1a2236 50%,#0d1117 100%)',
    accent: '#00c2ff'
  };

  private readonly COVER_IMAGES: Record<string, string> = {
    'Halo Infinite':                    'assets/covers/halo-infinite.jpg',
    'Forza Horizon 5':                  'assets/covers/forza-horizon-5.jpg',
    'Gears 5':                          'assets/covers/gears-5.jpg',
    'Gears of war':                     'assets/covers/gears-of-war.jpg',
    'Sea of Thieves':                   'assets/covers/sea-of-thieves.jpg',
    'Microsoft Flight Simulator':       'assets/covers/microsoft-flight-simulator.jpg',
    'Ori and the Will of the Wisps':    'assets/covers/ori-will-of-the-wisps.jpg',
    'Psychonauts 2':                    'assets/covers/psychonauts-2.jpg',
    'Grounded':                         'assets/covers/grounded.jpg',
    'The Outer Worlds':                 'assets/covers/the-outer-worlds.jpg',
    'Starfield':                        'assets/covers/starfield.jpg',
    'Forza Motorsport':                 'assets/covers/forza-motorsport.jpg',
    'Age of Empires IV':                'assets/covers/age-of-empires-4.jpg',
    'Pentiment':                        'assets/covers/pentiment.jpg',
    'Hi-Fi Rush':                       'assets/covers/hi-fi-rush.jpg',
    "Senua's Saga: Hellblade II":       'assets/covers/hellblade-2.jpg',
    'Minecraft Legends':                'assets/covers/minecraft-legends.jpg',
    'God of War':                       'assets/covers/god-of-war.jpg',
    'Halo':                             'assets/covers/halo.jpg',
    'Doom':                             'assets/covers/doom.jpg',
  };

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (games) => {
        this.allGames = games.map(g => this.enrich(g));
        this.filteredGames = this.allGames;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSearch(query: string): void {
    const q = query.toLowerCase().trim();
    this.filteredGames = q
      ? this.allGames.filter(g =>
          g.title.toLowerCase().includes(q) ||
          (g.genre ?? '').toLowerCase().includes(q) ||
          (g.developer ?? '').toLowerCase().includes(q)
        )
      : this.allGames;
  }

  goToDetail(id: string): void {
    this.router.navigate(['games', id]);
  }

  trackById(_: number, g: EnrichedGame): string { return g.id; }

  private enrich(g: Game): EnrichedGame {
    const reviews     = g.reviews ?? [];
    const total       = reviews.length;
    const sum         = reviews.reduce((s, r) => s + r.rating, 0);
    const avgRating   = total > 0 ? Math.round((sum / total) * 10) / 10 : null;
    const positives   = reviews.filter(r => r.rating >= 7).length;
    const aiSentiment = total > 0 ? Math.round((positives / total) * 100) : null;
    const cover       = this.GENRE_COVERS[g.genre] ?? this.DEFAULT_COVER;

    return {
      ...g,
      avgRating,
      aiSentiment,
      releaseYear: this.RELEASE_YEARS[g.title] ?? null,
      coverGradient: cover.gradient,
      accentColor: cover.accent,
      coverImage: this.COVER_IMAGES[g.title] ?? null,
    };
  }
}
