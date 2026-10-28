# Relatório de Análise Arquitetural — Portfolio Márcio Calisto

## Visão Geral

- **Tipo**: Portfolio institucional single-page (React + TypeScript)
- **Stack**: React 19, TypeScript, Vite, Tailwind CSS 4, Express, tRPC, Drizzle ORM, MySQL, Vitest
- **Deploy atual**: Vercel (via vercel.json), com build SPA + serverless
- **Status do código**: 100% committed, working tree limpo
- **Testes**: vitest (2 arquivos: contact.test.ts, auth.logout.test.ts)
- **CI/CD**: Nenhum workflow existe — sem pasta .github/

## Arquitetura Atual

### Estrutura de Pastas

```
/
├── client/                    # Frontend (SPA)
│   ├── index.html            # HTML root, SEO meta, schema.org JSON-LD
│   ├── public/               # Static assets
│   │   └── __manus__/        # Debug collector
│   └── src/
│       ├── App.tsx           # Router (wouter) — Home e NotFound
│       ├── main.tsx          # tRPC provider, QueryClient, render
│       ├── const.ts          # startLogin (OAuth manual trigger)
│       ├── index.css         # Design tokens, tema dark, glassmorphism
│       ├── _core/hooks/      # useAuth (tRPC-based auth)
│       ├── components/
│       │   ├── ui/           # 56 Radix UI primitives + utils (GlassPanel, GradientButton, etc)
│       │   ├── sections/     # 8 landing sections (Home composicionais)
│       │   └── AIChatBox.tsx, DashboardLayout, ErrorBoundary, ManusDialog, Map
│       ├── contexts/
│       │   └── ThemeContext.tsx (light/dark toggle)
│       ├── hooks/
│       │   ├── useComposition, useMobile, usePersistFn
│       ├── lib/
│       │   ├── data/         # services.ts, projects.ts, stack.ts (conteúdo tipado)
│       │   ├── site.ts       # brand config + WhatsApp URL helper
│       │   ├── trpc.ts       # tRPC client tipado
│       │   └── utils.ts      # cn() (clsx + tailwind-merge)
│       └── pages/
│           ├── Home.tsx      # Composição de seções
│           ├── ComponentShowcase.tsx  # Demo de todos os componentes UI
│           └── NotFound.tsx
├── server/                   # Backend (Express + tRPC)
│   ├── _core/                # Core framework code (Manus template)
│   │   ├── index.ts          # Server entry: Express + Vite(dev) / static(prod)
│   │   ├── context.ts        # tRPC context (auth user injection)
│   │   ├── trpc.ts           # tRPC init: publicProcedure, protectedProcedure, adminProcedure
│   │   ├── cookies.ts        # Session cookie options
│   │   ├── sdk.ts            # OAuth + JWT session SDK (355 lines)
│   │   ├── oauth.ts          # OAuth callback route
│   │   ├── vite.ts           # Vite middleware setup for dev
│   │   ├── env.ts            # ENV config object
│   │   ├── db.ts             # Drizzle ORM lazy connection + upsert/getUser/insertContact
│   │   ├── notification.ts   # Owner notifications (Forge API)
│   │   ├── storageProxy.ts   # S3 proxy routes
│   │   ├── dataApi.ts        # Generic data API proxy
│   │   ├── llm.ts            # LLM invocation (OpenAI-compatible, retry logic)
│   │   ├── imageGeneration.ts
│   │   ├── voiceTranscription.ts
│   │   ├── map.ts            # Google Maps API proxy
│   │   ├── systemRouter.ts   # tRPC: health check, notifyOwner
│   │   └── types/            # manusTypes.ts, cookie.d.ts
│   ├── routers.ts            # App tRPC router (auth + contact)
│   ├── contact.ts            # Contact form validation + Resend integration
│   ├── storage.ts            # S3 upload helpers
│   ├── contact.test.ts       # Contact tests
│   └── auth.logout.test.ts   # Auth logout test
├── shared/                   # Shared types between client/server
│   ├── const.ts              # Auth constants, OAuth state encoding
│   ├── types.ts              # Re-exports schema types
│   └── _core/errors.ts       # HttpError classes
├── drizzle/                  # DB schema + migrations
│   ├── schema.ts             # users + contacts tables (MySQL)
│   ├── relations.ts
│   ├── meta/
│   ├── migrations/
│   └── 0000_pale_wrecker.sql, 0001_reflective_vengeance.sql
├── vite.config.ts            # Vite config (React, Tailwind, Manus plugins)
├── vitest.config.ts          # Test config
├── tsconfig.json
├── tailwind.config.js
├── drizzle.config.ts
├── vercel.json               # Deploy config (SPA static build)
└── template.json             # Template definition

### Separacao de responsabilidades
- **client/src/components/ui/**: Componentes genericos reutilizaveis (56 arquivos Radix)
- **client/src/components/sections/**: Composicoes da landing page
- **client/src/lib/data/**: Conteudo tipado (servicos, projetos, stack)
- **server/_core/**: Codigo do framework Manus (infraestrutura, NAO editar)
- **server/routers.ts + contact.ts**: Codigo da aplicacao (EDITAR)
- **shared/**: Constantes e tipos compartilhados
```

## Pontos Fortes (do template)

1. **Arquitetura full-stack unificada**: Express server serve Vite dev e arquivos estaticos em prod, com tRPC para comunicacao tipada
2. **Tipagem completa**: TypeScript estrito com paths alias (@/ e @shared/\*)
3. **Componentes genericos separados**: ui/ vs sections/ com JSDoc e tag @reutilizavel
4. **SEO integrado**: schema.org JSON-LD, Open Graph, Twitter Cards, robots.txt, sitemap.xml
5. **Testes unitarios**: Vitest para logina critical path (contact, auth)
6. **Tema dark-first**: Design tokens centralizados em CSS
7. **Performance**: Vite + esbuild, lazy DB connection, tRPC batching

## Areas para Melhoria Arquitetural

### 1. CI/CD Pipeline (MAIS URGENTE)

- **Status atual**: Zero automacao. Deploy manual via Vercel dashboard
- **Problema**: Commits diretos em main sem validacao
- **Solucao proposta**: GitHub Actions workflow
  - Lint + typecheck + test em PRs
  - Auto-deploy em merge para main
  - Conventional commits enforcement

### 2. Conventional Commits

- **Status atual**: Commits genericos ("Update Portfolio.tsx", "Merge pull request")
- **Problema**: Historico dificil de ler, sem atomicidade
- **Solucao proposta**:
  - husky + lint-staged para validar antes de commitar
  - commitlint para conventional commits
  - Commits atomicos por feature/bugfix

### 3. Testing Gap

- **Status atual**: 2 arquivos de teste (contact + auth)
- **Problema**: ~150 arquivos de codigo, poucos testes
- **Solucao proposta**:
  - Testes para componentes UI (React Testing Library)
  - Testes para tRPC procedures
  - Testes de integracao para o formulario

### 4. Code Duplication

- **DashboardLayout.tsx**: Componentes de dashboard nao usados no portfolio
- **ComponentShowcase.tsx**: Demo de 1400+ linhas de componentes UI
- **AIChatBox.tsx**: Nao usado na landing page
- **Map.tsx**: Nao usado na landing page
- **ManusDialog.tsx**: Login flow nao ativo
- **Stack.tsx**: Dados hardcoded em vez de usar stack.ts

## Escopo por Area

### Frontend (client/)

- **56 componentes UI (Radix)**: Instalados mas nao todos usados. Usados: GlassPanel, GradientButton, ScrollReveal, SectionHeading, GlowIcon
- **8 secoes**: Hero, About, Services, Process, Stack, Portfolio, DeliveryPromise, Contact — todas implementadas
- **3 paginas**: Home, NotFound, ComponentShowcase — ComponentShowcase e DashboardLayout sao do template
- **Tema**: Dark-only, CSS nativo (nao usa tailwind.config.js)

### Backend (server/)

- **Framework code (\_core/)**: 13 arquivos — infraestrutura do Manus, nao editar
- **App code**: routers.ts, contact.ts, storage.ts — codigo da aplicacao
- **tRPC**: systemRouter (health, notify), authRouter (me, logout), contactRouter (send)
- **Database**: Drizzle ORM MySQL, 2 tabelas (users, contacts), 2 migrations
- **Integracoes**: OAuth, Resend email, S3 storage, Google Maps, LLM, Image gen, Voice transcription

### Deploy (vercel.json)

- **Build**: `vite build` para cliente, `esbuild` para server bundle
- **Output**: `dist/public` (cliente) + `dist/index.js` (server bundle)
- **Problemas**:
  - Server é bundleado mas deploy e SPA (nao usa server-side rendering)
  - Processos tRPC nao funcionam no deploy (sem backend serverless config)
  - Environment variables precisam ser configuradas no painel

## Gap Analysis

### Funcionalidades Planejadas vs Implementadas

| Feature                     | Status       | Arquivo                      | Observacao                                   |
| --------------------------- | ------------ | ---------------------------- | -------------------------------------------- |
| Hero com terminal de codigo | Implementado | sections/Hero.tsx            | Animacao typewriter                          |
| Sobre com foto              | Placeholder  | sections/About.tsx           | [EDITAR] na foto                             |
| Servicos (4 cards)          | Implementado | sections/Services.tsx        | Dados em lib/data/services                   |
| Processo (4 etapas)         | Implementado | sections/Process.tsx         | Hardcoded                                    |
| Stack tecnologica           | Implementado | sections/Stack.tsx           | Mas dados em lib/data/stack.ts (nao usados!) |
| Portfolio (3 cases)         | Placeholder  | sections/Portfolio.tsx       | [EDITAR] em todos os campos                  |
| Garantia de entrega         | Implementado | sections/DeliveryPromise.tsx | Sem metricas inventadas                      |
| Formulario de contato       | Implementado | sections/Contact.tsx         | Honeypot, validacao, tRPC                    |
| Envio por email             | Opcional     | server/contact.ts            | Resend, config pendente                      |
| Theme switcher              | Template     | ThemeContext.tsx             | Dark-only no portfolio                       |

### Itens [EDITAR] pendentes

1. `client/src/lib/site.ts` — whatsappNumber, email
2. `client/src/components/sections/About.tsx` — foto profissional
3. `client/src/lib/data/projects.ts` — 3 cases (todos placeholder)
4. `client/index.html` — dominio, og:image
5. `client/public/robots.txt` — sitemap URL
6. `client/public/sitemap.xml` — dominio
7. Secrets do projeto: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL

## Recomendacoes de Arquitetura

### 1. CI/CD com GitHub Actions

```yaml
# .github/workflows/ci.yml
- Lint (prettier --check)
- Typecheck (tsc --noEmit)
- Test (vitest run)
- Build (vite build + esbuild)
- Deploy (Vercel — apenas main branch)
```

### 2. Conventional Commits

- feat: adiciona nova secao X
- fix: corrige bug no formulario Y
- docs: atualiza README
- chore: atualiza dependencias
- style: formata codigo

### 3. Estrutura de branches

- main: producao (deploy automatico)
- feat/\*: features (PR para main, validada por CI)
- fix/\*: bugfixes

### 4. Lint-staged + Husky

- Pre-commit: prettier, eslint (se adicionado)
- Pre-push: testes
- Commit-msg: commitlint

### 5. Testing

- Unit: vitest (continua)
- Component: vitest + React Testing Library
- E2E: playwright (futuro)

### 6. Limpeza de codigo

- Remover ou mover ComponentShowcase, DashboardLayout, AIChatBox, Map, ManusDialog
- Estes sao do template e nao fazem parte do portfolio

## Metricas

- Total de arquivos: ~152
- Linhas de codigo (estimado): ~15.000
- Dependencias: 50+ packages
- Componentes UI (Radix): 56
- Secoes de landing: 8
- tRPC procedures: 5 (health, notify, me, logout, contact.send)
- Database tables: 2 (users, contacts)
- Test files: 2
- CI workflows: 0
