# Project TODO — Updated after architecture analysis

## Concluido (do template original)

- [x] Definir tokens de cor, tipografia e superficies da identidade preto, roxo neon e azul-ciano
- [x] Configurar estrutura global dark-only, fontes de display, corpo e monoespaçada
- [x] Criar header fixo em vidro com monograma MC, navegação por âncoras, CTA de WhatsApp
- [x] Criar menu mobil acessivel em painel de vidro com fechamento por selecao
- [x] Desenvolver hero assimetrico com headline, CTAs e terminal de automacao
- [x] Implementar animacoes discretas, respeitando prefers-reduced-motion
- [x] Criar secao Sobre com conteudo editavel e marcador de foto
- [x] Criar secao de servicos com quatro cards a partir de dados tipados
- [x] Criar secao do processo com as quatro etapas
- [x] Criar tres estudos de caso editaveis com fluxo Problema/Solucao/Resultado
- [x] Criar secao de garantias de entrega sem metricas inventadas
- [x] Criar formulario de contato com validacao, honeypot e rate limiting
- [x] Criar procedimento server-side publico com validacao e envio de email
- [x] Configurar URLs de WhatsApp com mensagem pre-preenchida
- [x] Separar componentes genericos em ui/, composicaoes em sections/, dados em lib/data
- [x] Adicionar JSDoc com tag @reutilizavel e catalogo em README.md
- [x] Criar fundacao de SEO: titulo, descricao, Open Graph, Twitter Card, schema.org
- [x] Criar README com instrucoes de execucao e publicacao
- [x] Consolidar itens [EDITAR] em documento de revisao pre-publicacao
- [x] Criar e executar testes Vitest para validacao de contato
- [x] Manter envio via Resend opcional
- [x] Exibir estado honesto de configuracao pendente

## CI/CD e Processos (concluido nesta sessao)

- [x] Configurar GitHub Actions workflow (.github/workflows/ci.yml) — 4 jobs paralelos: lint, typecheck, test (server + client), build
- [x] Adicionar scripts format:check, test:watch, test:coverage, test:server, test:client
- [x] Configurar husky v9 hooks (.husky/pre-commit, .husky/commit-msg)
- [x] Configurar lint-staged no package.json
- [x] Configurar commitlint com conventional commits (commitlint.config.mjs)
- [x] Atualizar .prettierignore
- [x] Configurar testes de componentes no vitest (vitest.client.config.ts + jsdom + setup)

## Codigo e Qualidade (concluido nesta sessao)

- [x] Corrigir bug no Stack.tsx (adicionado accentClasses faltando)
- [x] Corrigir Portfolio.tsx (imports faltando, fechamento da funcao)
- [x] Limpar codigo morto (ComponentShowcase, DashboardLayout, AIChatBox, Map, ManusDialog)
- [x] Adicionar teste de componente para Contact form (7 testes)
- [x] Revisar itens [EDITAR] (todos documentados em EDITAR.md)
- [x] Fix package.json dependency versions (commitlint, jsdom, @testing-library/react)

## Verificacao final

- [x] pnpm check — passed (0 errors)
- [x] pnpm test:server — 5 tests passed
- [x] pnpm test:client — 7 tests passed
