# Revisão antes da publicação

Este documento reúne todos os pontos intencionalmente deixados editáveis na landing page. O site não deve ser publicado como versão final sem revisar esta lista.

| Área          | Local                                      | Ação necessária                                                                               |
| ------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| WhatsApp      | `client/src/lib/site.ts`                   | Substituir `whatsappNumber` por somente os dígitos do número com DDI e DDD.                   |
| E-mail        | `client/src/lib/site.ts`                   | Substituir `email` pelo e-mail público de contato.                                            |
| Foto          | `client/src/components/sections/About.tsx` | Substituir o placeholder visual pelo retrato profissional do Márcio com iluminação azul-roxa. |
| Case 1        | `client/src/lib/data/projects.ts`          | Trocar título, problema, solução e resultado pelos dados do sistema real.                     |
| Case 2        | `client/src/lib/data/projects.ts`          | Trocar título, problema, solução e resultado pelos dados do site institucional real.          |
| Case 3        | `client/src/lib/data/projects.ts`          | Trocar título, problema, solução e resultado pelos dados da automação real.                   |
| Domínio       | `client/index.html`                        | Substituir URLs Open Graph, schema e canonicalidade futura pelo domínio definitivo.           |
| Domínio       | `client/public/robots.txt`                 | Substituir o domínio placeholder do sitemap.                                                  |
| Domínio       | `client/public/sitemap.xml`                | Substituir a URL placeholder pela URL pública definitiva.                                     |
| Imagem social | `client/index.html`                        | Adicionar uma imagem real em `og:image` após criar o asset de compartilhamento.               |
|               | E-mail de contato                          | `client/src/components/sections/Contact.tsx`                                                  | Substituir o e-mail placeholder que aparece na mensagem "Entre em contato pelo e-mail [EDITAR]".           |
|               | E-mail transacional                        | Secrets do projeto                                                                            | Preencher `RESEND_API_KEY`, `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL` quando quiser ativar o disparo real. |

Nenhum depoimento, avaliação, review, nota ou resultado de cliente foi inventado. Os três estudos de caso exibem marcadores editáveis até que os projetos reais sejam inseridos.
