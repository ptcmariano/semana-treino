Você é um agente de IA DESENVOLVEDOR DE SOFTWARE especialista em UI/UX + Next.js (App Router) com foco em mobile-first. Sua missão é projetar e implementar (código + UX) um mini-app para cadastrar e acompanhar uma lista semanal de exercícios, persistindo tudo em localStorage.

### Objetivo do produto
Criar 3 telas com navegação inferior fixa (3 botões grandes):
1) Lista
2) Limpar Semana
3) Configurações

O app deve ser extremamente simples, rápido no mobile, com botões grandes, acessível (a11y) e com estados persistentes via localStorage.

---

## Requisitos funcionais (o que precisa existir)

### Tela 1: “Lista”
- Exibir um HEADER com um título configurável (o texto vem da Tela 3, persistido).
- Exibir um formulário com:
  - 1 input (string) para adicionar exercício semanal
  - 1 botão grande “Adicionar”
- Exibir a lista de exercícios (cada item mostra somente o nome do exercício como string).
- Cada exercício deve ter um botão grande de “check”.
  - Ao clicar no check: o texto do exercício deve ser “riscado” (estado concluído).
  - Ao ser riscado (marcado como concluído), o item deve ser movido para o final do array (último índice).
  - O estado concluído deve persistir no localStorage.
- A lista deve atualizar imediatamente após qualquer ação (adicionar, marcar).

### Tela 2: “Limpar Semana”
- Exibir um botão grande “Limpar semana”.
- Ao clicar: desmarcar (setar como não concluído) TODOS os exercícios que estão “feitos” no localStorage.
- NÃO deve apagar os exercícios; apenas resetar `done=false` para todos.
- Persistir a mudança no localStorage e refletir na Tela 1 ao voltar.

### Tela 3: “Configurações”
- Exibir um formulário com:
  - 1 input para escolher/editar o texto do HEADER da Tela 1
  - 1 botão grande “Salvar”
- Ao salvar: persistir no localStorage e refletir na Tela 1.

---

## Regras de UX/UI (mobile-first, botões grandes)
- Layout mobile-first (priorizar telas pequenas; depois adaptar).
- Navegação inferior fixa (bottom bar) com 3 botões grandes, fáceis de tocar.
- Espaçamento e hierarquia clara: header -> form -> lista -> bottom nav.
- Estados visuais claros:
  - item concluído: texto riscado + cor mais “suave”
  - botão check com feedback visual (pressed/active)
- Acessibilidade:
  - botões com `aria-label`
  - foco visível (keyboard)
  - contraste mínimo aceitável
- Prever “safe area” no iOS (padding-bottom).

---

## Questões técnicas obrigatórias (como deve funcionar por baixo)

### Stack/arquitetura
- Next.js com App Router.
- Componentes “client” onde houver acesso ao `localStorage`.
- Use TypeScript e Tailwind.

### Modelo de dados (localStorage)
Defina chaves e formato mas mantenha simples:
- Chave: `weekly_exercises`
  - Array de itens:
    - `id: string` (uuid ou timestamp)
    - `name: string`
    - `done: boolean`
    - (opcional) `createdAt: number` e/ou `doneAt: number` para ajudar ordenação
- Chave: `weekly_settings`
  - Objeto:
    - `headerText: string`

### Funções principais (você deve definir e implementar)
1) `loadExercises(): Exercise[]`
2) `saveExercises(exercises: Exercise[]): void`
3) `addExercise(name: string): void`
   - trim
   - não permitir vazio
   - (decisão) evitar duplicados? se sim, explicar regra.
4) `markDone(exerciseId: string): void`
   - set `done=true`
   - riscar no UI
   - mover item para o final do array
   - salvar no localStorage
5) `clearWeek(): void`
   - para todos: `done=false`
   - salvar no localStorage
6) `loadSettings()` / `saveSettings()`
   - persistir `headerText`
   - aplicar fallback default se não existir

### Regras de ordenação (detalhar no código)
- Ao marcar como feito:
  - remover o item da posição atual e inserir no final do array.
- Itens não feitos mantêm sua ordem relativa.
- Se você permitir “desmarcar” (não está explícito), documente e escolha a regra de ordenação (ex: voltar para o topo por `createdAt`). Se não permitir, deixe claro no UI (check apenas marca).

### Hydration / SSR
- localStorage só existe no client:
  - usar `useEffect` para carregar dados após montar
  - prever estado inicial (loading/empty) para evitar flicker
- Tratar parse errors de JSON com fallback seguro (não quebrar a tela).

### Rotas/telas
- Defina rotas claras (exemplo):
  - `/` -> Lista
  - `/clear-week` -> Limpar Semana
  - `/settings` -> Configurações
- Bottom nav deve aparecer em todas as telas (idealmente no layout).

---

## Entregáveis (o que você deve produzir na resposta)
1) A estrutura de pastas/rotas do Next.js (App Router).
2) Tipos/interfaces TypeScript do modelo de dados.
3) Implementação dos componentes e funções principais.
4) Critérios de aceite (checklist) para validar que está pronto.

---

## Habilidades que você (agente) deve demonstrar
- UI/UX mobile-first (hierarquia visual, botões grandes, usabilidade)
- Next.js App Router (layouts, rotas, client components)
- React hooks (useState/useEffect) com persistência em localStorage
- TypeScript (tipagem de estado/dados)
- Robustez (tratamento de erros de storage, estado vazio, edge cases)
- Código limpo e organizado (componentização e responsabilidades)

---

## Restrições
- Não usar backend.
- Não usar banco de dados.
- Persistência apenas em localStorage.
- O app deve funcionar offline (apenas com o que já está no browser).
- Linguagem do UI: PT-BR.

---

## Antes de finalizar
Se houver ambiguidade, faça pelo menos 5 perguntas objetivas e documente no doc/decisoes.md

Agora execute: planeje e implemente a solução completa conforme acima.