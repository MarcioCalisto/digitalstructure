# Project TODO — Updated after architecture analysis

## Concluido (do template original)
- [x] Definir tokens de cor, tipografia e superficies da identidade preto, roxo neon e azul-ciano
- [x] Configurar estrutura global dark-only, fontes de display, corpo e monoespacada
- [x] Criar header fixo em vidro com monograma MC, navegacao por ancas, CTA de WhatsApp
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
- [x] Separar componentes genericos em ui/, composicoes em sections/, dados em lib/data
- [x] Adicionar JSDoc com tag @reutilizavel e catalogo em README.md
- [x] Criar fundacao de SEO: titulo, descricao, Open Graph, Twitter Card, schema.org
- [x] Criar README com instrucoes de execucao e publicacao
- [x] Consolidar itens [EDITAR] em documento de revisao pre-publicacao
- [x] Criar e executar testes Vitest para validacao de contato
- [x] Manter envio via Resend opcional
- [x] Exibir estado honesto de configuracao pendente

## CI/CD e Processos (concluido nesta sessao)
- [x] Configurar GitHub Actions workflow (.github/workflows/ci.yml)
- [x] Adicionar scripts format:check, test:watch, test:coverage
- [x] Configurar husky v9 hooks (.husky/pre-commit, .husky/commit-msg)
- [x] Configurar lint-staged no package.json
- [x] Configurar commitlint com conventional commits (commitlint.config.mjs)
- [x] Atualizar .prettierignore

## Proximas tarefas
- [ ] Corrigir bug no Stack.tsx (stack.ts faltava categoria) — CONCLUIDO
- [ ] Adicionar testes de componentes (React Testing Library)
- [ ] Limpar codigo morto (ComponentShowcase, DashboardLayout, AIChatBox, Map, ManusDialog)
- [ ] Revisar itens [EDITAR] pendentes (site.ts, projects.ts, index.html, etc)
- [ ] Adicionar testes de integracao para tRPC procedures
- [ ] Considerar testes E2E com Playwright