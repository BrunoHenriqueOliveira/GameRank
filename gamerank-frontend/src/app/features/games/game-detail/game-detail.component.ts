import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { GameService } from '../../../core/services/game.service';
import { Game, Review } from '../../../models/game';

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
  imports: [CommonModule, RouterLink],
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
    const id = this.route.snapshot.paramMap.get('id')!;
    forkJoin({
      game: this.gameService.getGameById(id),
      reviews: this.gameService.getReviews(id)
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

  private classifySentiment(rating: number): 'POSITIVO' | 'NEUTRO' | 'NEGATIVO' {
    if (rating >= 4) return 'POSITIVO';
    if (rating === 3) return 'NEUTRO';
    return 'NEGATIVO';
  }

  private computeAnalysis(): void {
    if (!this.enrichedReviews.length) { this.aiAnalysis = null; return; }

    const total = this.enrichedReviews.length;
    const sum = this.enrichedReviews.reduce((s, r) => s + r.rating, 0);
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
    if (avg >= 4.5) return `${title} é amplamente aclamado pela comunidade. A experiência é considerada excepcional, com destaque para a qualidade geral da produção. A grande maioria dos jogadores recomenda fortemente.`;
    if (avg >= 4.0) return `${title} recebe avaliações muito positivas da comunidade. Os jogadores destacam a qualidade geral da experiência, com alguns pontos de melhoria identificados. Um título sólido que vale a pena conferir.`;
    if (avg >= 3.5) return `${title} inclina-se para o positivo, embora divida algumas opiniões. A maioria dos jogadores encontra valor, mas há críticas consistentes que a desenvolvedora poderia endereçar em futuras atualizações.`;
    if (avg >= 2.5) return `${title} apresenta recepção mista. Aspectos positivos são reconhecidos, porém a comunidade aponta problemas significativos. Recomendado com ressalvas, especialmente para fãs do gênero.`;
    return `${title} recebe críticas predominantemente negativas. A comunidade identifica problemas substanciais que prejudicam a experiência. Aguarde melhorias antes de adquirir.`;
  }

  getYear(title: string): number | null {
    return this.releaseYears[title] ?? null;
  }

  getRatingArray(rating: number): boolean[] {
    return [1, 2, 3, 4, 5].map(i => i <= Math.round(rating));
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
