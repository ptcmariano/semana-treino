# Decisões de Projeto - Semana de Treino

Este documento registra as decisões tomadas durante a implementação do mini-app de acordo com as instruções em `doc/comando.md`.

## 1. Persistência e Hidratação
- Utilizamos um hook customizado `useWorkoutStore` para centralizar a lógica de estado e sincronização com `localStorage`.
- Foi implementado um estado `isLoaded` para evitar problemas de hidratação (flicker de SSR/Client mismatch), garantindo que o `localStorage` seja lido apenas após a montagem do componente no cliente.

## 2. Reordenação de Itens
- Conforme solicitado, ao marcar um exercício como concluído, ele é movido para o final da lista.
- Itens novos são adicionados ao topo da lista (antes dos itens concluídos) para facilitar a visualização do que foi acabado de criar.
- Se um item for desmarcado, ele permanece em sua posição relativa entre os itens não concluídos.

## 3. UI/UX
- Framework: Tailwind CSS v4.
- Design: Dark mode moderno com glassmorphism, gradientes e bordas sutis. 
- Acessibilidade: Uso de `aria-label` em todos os botões interativos e contrastes adequados.
- Mobile-first: Botões grandes (mínimo 64px de altura para botões principais), padding-bottom seguro para iOS (`pb-safe`) e navegação facilitada pelo polegar.

## 4. Tecnologias
- Next.js 15 (App Router).
- Lucide React para ícones consistentes.
- TypeScript para segurança de tipos.

## 5. Perguntas/Ambigüidades Resolvidas
1. **P:** O que acontece ao desmarcar um item concluído?
   **R:** O sistema permite desmarcar. O item permanece no array, mantendo sua ordem relativa entre os pendentes (não volta necessariamente para o topo, mas sai da seção de concluídos).
2. **P:** Devemos evitar exercícios duplicados?
   **R:** Sim, foi implementada uma verificação case-insensitive para evitar que o usuário adicione o mesmo treino duas vezes acidentalmente.
3. **P:** Como lidar com o "Empty State"?
   **R:** Implementamos uma ilustração visual e mensagem amigável quando a lista está vazia.
4. **P:** O header deve ser editável?
   **R:** Sim, implementado na tela de Configurações conforme solicitado.
5. **P:** O layout deve ser restrito ao mobile?
   **R:** O design é mobile-first, mas foi centralizado com `max-w-lg` em telas maiores para manter a usabilidade "app-like".
