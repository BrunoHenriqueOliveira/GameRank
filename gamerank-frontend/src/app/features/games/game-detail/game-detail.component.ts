import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { GameService } from '../../../core/services/game.service';
import { Game, Review } from '../../../models/game';
import { ReviewFormModalComponent } from '../review-form-modal/review-form-modal.component';

export interface AiAnalysis {
  sentimentPositive: number;
  sentimentNeutral: number;
  sentimentNegative: number;
  summary: string;
  pros: string[];
  cons: string[];
}

export interface EnrichedReview extends Review {
  sentiment: 'POSITIVO' | 'NEUTRO' | 'NEGATIVO';
}

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReviewFormModalComponent],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  game: Game | null = null;
  enrichedReviews: EnrichedReview[] = [];
  aiAnalysis: AiAnalysis | null = null;
  loading = true;
  error: string | null = null;
  avgRating: number | null = null;
  gameId = '';

  showModal = false;
  showToast = false;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly coverImages: Record<string, string> = {
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

  private readonly releaseYears: Record<string, number> = {
    'Halo Infinite': 2021, 'Forza Horizon 5': 2021, 'Gears 5': 2019,
    'Gears of war': 2006, 'Sea of Thieves': 2018, 'Microsoft Flight Simulator': 2020,
    'Ori and the Will of the Wisps': 2020, 'Psychonauts 2': 2021, 'Grounded': 2022,
    'The Outer Worlds': 2019, 'Starfield': 2023, 'Forza Motorsport': 2023,
    'Age of Empires IV': 2021, 'Pentiment': 2022, 'Hi-Fi Rush': 2023,
    "Senua's Saga: Hellblade II": 2024, 'Minecraft Legends': 2023,
    'God of War': 2018, 'Halo': 2001, 'Doom': 2016,
  };

  private readonly genreInsights: Record<string, { pros: string[]; cons: string[] }> = {
    'FPS': {
      pros: ['Mecânicas de tiro precisas e responsivas', 'Multiplayer competitivo e intenso', 'Level design muito bem elaborado'],
      cons: ['Curva de aprendizado elevada para iniciantes', 'Pode se tornar repetitivo a longo prazo']
    },
    'Corrida': {
      pros: ['Física de condução realista e precisa', 'Variedade impressionante de veículos', 'Visual e ambientação de alto nível'],
      cons: ['Barreira de entrada para novos jogadores', 'Presença de microtransações']
    },
    'Ação': {
      pros: ['Combate dinâmico, fluido e satisfatório', 'Progressão de personagem bem construída', 'Campanha com boa duração e ritmo'],
      cons: ['Picos de dificuldade podem frustrar', 'Alguns segmentos se tornam repetitivos']
    },
    'RPG': {
      pros: ['Narrativa profunda e muito envolvente', 'Mundo aberto rico em detalhes e lore', 'Alta personalização de personagem'],
      cons: ['Tempo total de jogo pode ser excessivo', 'Mecânicas complexas afastam iniciantes']
    },
    'Aventura': {
      pros: ['Exploração gratificante e bem recompensada', 'Narrativa imersiva e bem escrita', 'Direção de arte cuidadosa e memorável'],
      cons: ['Ritmo mais lento nem sempre agrada', 'Rejogabilidade limitada após conclusão']
    },
    'Plataforma': {
      pros: ['Controles precisos e muito responsivos', 'Design de fases criativo e desafiador', 'Trilha sonora memorável e encantadora'],
      cons: ['Duração pode ser relativamente curta', 'Seções de alta dificuldade podem frustrar']
    },
    'Sobrevivência': {
      pros: ['Loop de gameplay extremamente viciante', 'Modo cooperativo muito divertido', 'Grande quantidade de conteúdo e progressão'],
      cons: ['Curva de aprendizado muito íngreme', 'Experiência solo pode ser monótona']
    },
    'Simulação': {
      pros: ['Nível de detalhe e fidelidade impressionantes', 'Experiência imersiva única no mercado', 'Constantemente atualizado pelos desenvolvedores'],
      cons: ['Requer hardware potente para rodar bem', 'Complexidade pode afastar jogadores casuais']
    },
    'Estratégia': {
      pros: ['Profundidade estratégica elevada e recompensadora', 'Altíssima rejogabilidade com cada partida única', 'Facções e estilos de jogo bem diferenciados'],
      cons: ['Curva de aprendizado longa e exigente', 'Partidas podem ser extremamente demoradas']
    },
    'Ação/Ritmo': {
      pros: ['Gameplay único que mistura ritmo e ação', 'Trilha sonora absolutamente excepcional', 'Visual estilizado e muito marcante'],
      cons: ['Proposta nicho pode não agradar a todos', 'Ausência de modo multiplayer']
    },
  };

  constructor(private route: ActivatedRoute, private gameService: GameService) {}

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id')!;
    forkJoin({
      game: this.gameService.getGameById(this.gameId),
      reviews: this.gameService.getReviews(this.gameId)
    }).subscribe({
      next: ({ game, reviews }) => {
        this.game = game;
        this.enrichedReviews = reviews.map(r => ({
          ...r,
          sentiment: this.classifySentiment(r.rating)
        }));
        this.computeAnalysis();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Não foi possível carregar os dados do jogo.';
        this.loading = false;
      }
    });
  }

  // ── Modal ──────────────────────────────────────────────

  openModal(): void  { this.showModal = true; }
  closeModal(): void { this.showModal = false; }

  onReviewCreated(review: Review): void {
    const enriched: EnrichedReview = { ...review, sentiment: this.classifySentiment(review.rating) };
    this.enrichedReviews = [enriched, ...this.enrichedReviews];
    this.computeAnalysis();
    this.triggerToast();
  }

  private triggerToast(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.showToast = true;
    this.toastTimer = setTimeout(() => { this.showToast = false; }, 3500);
  }

  // ── Sentiment (escala 0–10) ─────────────────────────────

  private classifySentiment(rating: number): 'POSITIVO' | 'NEUTRO' | 'NEGATIVO' {
    if (rating >= 7) return 'POSITIVO';
    if (rating >= 4) return 'NEUTRO';
    return 'NEGATIVO';
  }

  private computeAnalysis(): void {
    if (!this.enrichedReviews.length) { this.aiAnalysis = null; this.avgRating = null; return; }

    const total = this.enrichedReviews.length;
    const sum   = this.enrichedReviews.reduce((s, r) => s + r.rating, 0);
    this.avgRating = Math.round((sum / total) * 10) / 10;

    const positive = this.enrichedReviews.filter(r => r.sentiment === 'POSITIVO').length;
    const neutral  = this.enrichedReviews.filter(r => r.sentiment === 'NEUTRO').length;
    const positivePct = Math.round((positive / total) * 100);
    const neutralPct  = Math.round((neutral  / total) * 100);

    const genre    = this.game?.genre ?? '';
    const insights = this.genreInsights[genre] ?? {
      pros: ['Experiência de jogo sólida e bem construída', 'Ótima relação qualidade-preço', 'Suporte contínuo dos desenvolvedores'],
      cons: ['Alguns bugs menores identificados', 'Poderia contar com mais conteúdo pós-lançamento']
    };

    this.aiAnalysis = {
      sentimentPositive: positivePct,
      sentimentNeutral:  neutralPct,
      sentimentNegative: Math.max(0, 100 - positivePct - neutralPct),
      summary: this.generateSummary(this.avgRating),
      pros: insights.pros,
      cons: insights.cons
    };
  }

  private generateSummary(avg: number): string {
    const title = this.game?.title ?? 'Este jogo';
    if (avg >= 9)   return `${title} é amplamente aclamado pela comunidade. A experiência é considerada excepcional e quase unânime entre os jogadores. Um título que define o gênero.`;
    if (avg >= 8)   return `${title} recebe avaliações muito positivas. Os jogadores destacam a qualidade geral da experiência com poucos pontos negativos. Um título sólido que vale cada centavo.`;
    if (avg >= 7)   return `${title} inclina-se para o positivo com boa aceitação da comunidade. A maioria encontra valor na experiência, com algumas críticas pontuais que não prejudicam o conjunto.`;
    if (avg >= 5)   return `${title} apresenta recepção mista. Há pontos positivos reconhecidos, mas também críticas significativas. Recomendado com ressalvas, especialmente para fãs do gênero.`;
    return `${title} recebe críticas predominantemente negativas. A comunidade aponta problemas que prejudicam a experiência. Aguarde atualizações antes de adquirir.`;
  }

  // ── Helpers ────────────────────────────────────────────

  getYear(title: string): number | null { return this.releaseYears[title] ?? null; }

  getCoverImage(title: string): string | null { return this.coverImages[title] ?? null; }

  getRatingArray(rating: number): boolean[] {
    const filled = Math.round(rating / 2);
    return [1, 2, 3, 4, 5].map(i => i <= filled);
  }

  getInitial(name: string | undefined): string {
    return (name || '?').charAt(0).toUpperCase();
  }

  getAvatarGradient(name: string | undefined): string {
    const gradients = [
      'linear-gradient(135deg,#7c3aed,#4f46e5)',
      'linear-gradient(135deg,#0891b2,#2563eb)',
      'linear-gradient(135deg,#059669,#0d9488)',
      'linear-gradient(135deg,#e11d48,#db2777)',
      'linear-gradient(135deg,#d97706,#ea580c)',
      'linear-gradient(135deg,#0284c7,#0891b2)',
      'linear-gradient(135deg,#9333ea,#7c3aed)',
      'linear-gradient(135deg,#65a30d,#16a34a)',
    ];
    const idx = ((name ?? '?').charCodeAt(0) - 65) % gradients.length;
    return gradients[Math.max(0, idx)];
  }

  formatDate(date: string | number[] | any): string {
    if (!date) return '';
    if (Array.isArray(date)) {
      const [y, m, d] = date;
      return new Date(y, m - 1, d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
