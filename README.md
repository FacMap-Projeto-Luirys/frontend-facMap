# FacMap

Orientação de carreira em TI para estudantes de Sistemas de Informação da FACAPE.
Versão web (desktop + responsiva) do protótipo `interface-inova-o`.

**Stack:** React 19 · TypeScript · CSS Modules · Vite. API em `backend-facMap` (FastAPI).

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
  context/      AuthContext (login/cadastro via API), AssessmentContext (respostas e resultado da avaliação)
  data/         content.ts — todos os textos, áreas e oportunidades
  pages/        Landing, Auth (Login/Signup), Assessment (3 etapas), Dashboard
  utils/        api.ts — cliente HTTP com o token JWT
  styles/       global.css — tokens de cor, reset e utilitários
  router.tsx    roteador mínimo baseado em hash
```

## Observações

- **Backend**: login, cadastro e avaliação usam a API do `backend-facMap` (JWT).
  Configure a URL em `.env` (`VITE_API_URL`, veja `.env.example`). O padrão é `http://localhost:8000`.
  O token fica no `localStorage`; se a API responder 401, a sessão é encerrada.
- **Resultado da avaliação**: calculado pelo backend a partir de `app/data/assessment.json`
  (afinidades, "por que", disciplina e prévia do PDI).
- Cores dinâmicas por área usam a variável CSS `--accent` (definida via `style`)
  combinada com `color-mix()` nos módulos CSS.
