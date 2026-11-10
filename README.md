# FacMap

Orientação de carreira em TI para estudantes de Sistemas de Informação da FACAPE.
Versão web (desktop + responsiva) do protótipo `interface-inova-o`.

**Stack:** React 19 · TypeScript · CSS Modules · Vite (somente front-end).

## Rodando

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # checagem de tipos + build de produção
```

## Rotas (hash router)

| Rota                   | Tela                                  | Acesso            |
| ---------------------- | ------------------------------------- | ----------------- |
| `#/`                   | Landing page                          | público           |
| `#/login`              | Login                                 | só deslogado      |
| `#/cadastro`           | Criação de conta                      | só deslogado      |
| `#/avaliacao/perfil`   | Etapa 1 — questionário                | logado            |
| `#/avaliacao/areas`    | Etapa 2 — áreas e cenário prático     | perfil respondido |
| `#/avaliacao/resultado`| Etapa 3 — resultado e prévia do PDI   | área escolhida    |
| `#/painel`             | Etapa 4 — painel do PDI/oportunidades | avaliação concluída |

## Estrutura

```
src/
  components/   Button, Badge, Icon, Logo, Modal, ProgressBar, TextField, UserChip
  context/      AuthContext (login/cadastro), AssessmentContext (respostas da avaliação)
  data/         content.ts — todos os textos, áreas e oportunidades
  pages/        Landing, Auth (Login/Signup), Assessment (3 etapas), Dashboard
  styles/       global.css — tokens de cor, reset e utilitários
  router.tsx    roteador mínimo baseado em hash
```

## Observações

- **Autenticação é simulada**: contas, sessão e respostas ficam no `localStorage`.
  Para integrar um back-end, troque as funções `login`/`signup`/`logout` em
  `src/context/AuthContext.tsx` por chamadas à API — o resto do app não muda.
- Cores dinâmicas por área usam a variável CSS `--accent` (definida via `style`)
  combinada com `color-mix()` nos módulos CSS.
