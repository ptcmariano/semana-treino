✅ FEATURE: Gamificação Local
🧠 1. MODELAGEM E STORAGE
1.1 Criar tipo Gamification e PointsHistory
Descrição:
Criar interfaces TypeScript no projeto (ex: types/gamification.ts).

Inclui:

Gamification
PointsHistory
Enum ou union type para tipos de pontos

1.2 Criar chave weekly_gamification no localStorage
Descrição:
Implementar:

loadGamification()
saveGamification()
Fallback seguro caso não exista
Tratamento de JSON inválido


1.3 Criar função initializeGamification()
Descrição:
Caso não exista no storage, criar estrutura inicial:

ts
{
  points: 0,
  level: 0,
  history: []
}


⚙️ 2. REGRAS DE PONTUAÇÃO
2.1 Adicionar +10 ao marcar exercício como feito
Descrição:
Modificar markDone() no useWorkoutStore.

Ao marcar como done=true:

Adicionar 10 pontos
Inserir no histórico
Recalcular nível

Decisões:
NÃO pontuar se já estiver marcado no mesmo dia, deve considerar ao pontuar um exercicio que já foi feito a pelo menos 24h
NÃO pontuar ao desmarcar

2.2 Detectar conclusão total da semana (+10 bônus para cada exercício completo da semana)

Descrição:
Quando clicar no botão limpar semana:

Se todos os exercícios estiverem marcados como feitos:

+10 pontos para cada exercício completo da semana


Inserir histórico weekly_complete com a data de conclusão da semana

Decisões:
Evitar dar bônus com menos de 6 dias que ja foi concluida a outra semana

Precisa lógica de comparação da ultima semana concluida com a execução atual do "limpar semana"


📊 3. SISTEMA DE NÍVEL
3.1 Implementar cálculo automático de nível
Regra:

ts
level = Math.floor(points / 100)

Pode:

Calcular dinamicamente

3.2 Criar helper getNextLevelProgress()
Retornar:

ts
{
  currentLevel,
  pointsIntoLevel,
  pointsToNextLevel
}

Para usar na barra de progresso.

🔄 4. INTEGRAÇÃO COM STORE
4.1 Integrar gamificação no useWorkoutStore

Adicionar:
estado gamification
funções:
addPoints()
addHistoryEntry()
handleWeeklyCompletion()

4.2 Garantir persistência atômica
Ao marcar exercício:

salvar exercises
salvar gamification
Evitar inconsistência caso erro.

🖥 5. NOVA TELA /progress
5.1 Criar rota /progress
Estrutura:

app/progress/page.tsx

5.2 Criar Card de Pontos Totais
Mostrar:

Pontos
Nível

5.3 Criar Barra de Progresso para próximo nível
Exibir:

ts
(points % 100) / 100

UI:

barra animada
mostrar “Faltam X pontos”

5.4 Criar Lista de Extrato (PointsHistory)
Mostrar:

descrição
pontos (+10, +50…)
data formatada
Ordenar por createdAt DESC


🎯 6. AJUSTES DE UX
6.1 Feedback visual ao ganhar pontos

6.2 Badge de nível na tela principal

7. Criar testes de verificar pontuação
deve abrir a tela de progresso e mostrar os pontos e o nível
user playwright
