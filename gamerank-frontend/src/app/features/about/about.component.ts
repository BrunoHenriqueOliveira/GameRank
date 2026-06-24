import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  readonly currentYear = new Date().getFullYear();

  readonly technologies = [
    {
      name: 'Angular 17',
      role: 'Frontend Framework',
      description: 'SPA com standalone components, roteamento lazy e HttpClient para consumo de APIs REST tipadas.',
      color: '#dd0031',
      icon: 'angular'
    },
    {
      name: 'Spring Boot 3',
      role: 'Backend API REST',
      description: 'API robusta com endpoints RESTful, Spring Data MongoDB, tratamento de CORS e injeção de dependência.',
      color: '#6db33f',
      icon: 'spring'
    },
    {
      name: 'MongoDB',
      role: 'Banco de Dados NoSQL',
      description: 'Persistência flexível orientada a documentos, ideal para catálogo de jogos e avaliações dinâmicas.',
      color: '#00ed64',
      icon: 'mongo'
    },
    {
      name: 'Python Flask',
      role: 'Microsserviço',
      description: 'Serviço leve e independente de recomendações, comunicando-se via HTTP com o backend principal.',
      color: '#ffd43b',
      icon: 'python'
    },
    {
      name: 'Docker Compose',
      role: 'Infraestrutura',
      description: 'Orquestração de todos os serviços em containers isolados com rede interna e variáveis de ambiente.',
      color: '#2496ed',
      icon: 'docker'
    },
    {
      name: 'TypeScript',
      role: 'Linguagem',
      description: 'Tipagem estática no frontend garantindo segurança em tempo de compilação com interfaces e generics.',
      color: '#3178c6',
      icon: 'typescript'
    }
  ];

  readonly learnings = [
    {
      icon: '⚙️',
      title: 'Arquitetura de Microsserviços',
      text: 'Separação de responsabilidades entre serviços independentes com comunicação via HTTP e contratos bem definidos.'
    },
    {
      icon: '🔗',
      title: 'Integração Frontend / Backend',
      text: 'Consumo de APIs REST com Angular HttpClient, tipagem completa com interfaces TypeScript e tratamento de erros reativos com RxJS.'
    },
    {
      icon: '🗄️',
      title: 'Persistência NoSQL',
      text: 'Modelagem de documentos no MongoDB com Spring Data, queries por referência e estratégias de coleções separadas.'
    },
    {
      icon: '🐳',
      title: 'Conteinerização com Docker',
      text: 'Criação de Dockerfiles otimizados e Docker Compose para orquestrar toda a infraestrutura reprodutível.'
    },
    {
      icon: '🧩',
      title: 'Componentização Angular',
      text: 'Criação de componentes reutilizáveis com @Input/@Output, standalone components, lifecycle hooks e change detection.'
    },
    {
      icon: '🎨',
      title: 'UI / UX Avançado',
      text: 'Design system coeso com CSS custom properties, animações com IntersectionObserver e responsividade mobile-first.'
    }
  ];

  readonly futureGoals = [
    { label: 'Autenticação JWT', desc: 'Login seguro com Spring Security e tokens JWT' },
    { label: 'Analytics Dashboard', desc: 'Gráficos interativos de avaliações e tendências' },
    { label: 'Filtros Avançados', desc: 'Paginação, ordenação e filtros no catálogo' },
    { label: 'Deploy em Nuvem', desc: 'CI/CD automático com deploy na AWS ou GCP' },
    { label: 'Testes Automatizados', desc: 'Cobertura de testes unitários e E2E com Jest e Playwright' },
    { label: 'PWA & Notificações', desc: 'Progressive Web App com suporte offline e push' },
  ];

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }, 80);
  }
}
