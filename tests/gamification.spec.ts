import { test, expect } from '@playwright/test';

test.describe('Gamificação', () => {
    test.beforeEach(async ({ page }) => {
        // Limpar localStorage antes de cada teste
        await page.goto('http://localhost:3000/semana-treino/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    test('deve ganhar pontos ao marcar exercicio como feito', async ({ page }) => {
        await page.goto('http://localhost:3000/semana-treino/');

        // Adicionar um exercicio
        const input = page.getByLabel('Nome do exercício');
        await input.fill('Treino de Teste');
        await page.getByLabel('Adicionar exercício').click();

        // Verificar se o nível inicial é 0 no badge
        await expect(page.getByText('LVL').locator('..').getByText('0')).toBeVisible();

        // Marcar como feito
        await page.getByText('Treino de Teste').click();

        // Verificar se a notificação de pontos aparece
        await expect(page.getByText('+10 PONTOS!')).toBeVisible();

        // Ir para a tela de progresso
        await page.getByLabel('Progresso').click();
        await expect(page).toHaveURL(/\/progress\/$/);

        // Verificar pontos e nível na tela de progresso
        await expect(page.getByText('Pontos Totais').locator('..').getByText('10')).toBeVisible();
        await expect(page.getByText('Nível Atual').locator('..').getByText('0')).toBeVisible();
        await expect(page.getByText('Completou Treino de Teste')).toBeVisible();
    });

    test('deve ganhar bônus ao limpar a semana com todos exercícios feitos', async ({ page }) => {
        // Mocking lastWeeklyBonus to be old enough
        await page.goto('http://localhost:3000/semana-treino/');
        await page.evaluate(() => {
            const initialGamification = {
                points: 0,
                level: 0,
                history: [],
                lastWeeklyBonus: Date.now() - (7 * 24 * 60 * 60 * 1000)
            };
            localStorage.setItem('weekly_gamification', JSON.stringify(initialGamification));
        });
        await page.reload();

        // Adicionar 2 exercicios
        await page.getByLabel('Nome do exercício').fill('Ex 1');
        await page.getByLabel('Adicionar exercício').click();
        await page.getByLabel('Nome do exercício').fill('Ex 2');
        await page.getByLabel('Adicionar exercício').click();

        // Marcar ambos como feito
        await page.getByText('Ex 1').click();
        await page.getByText('Ex 2').click();

        // Ir para tela de limpar
        await page.getByLabel('Limpar').click();
        
        // Clicar em limpar semana
        await page.getByRole('button', { name: 'Limpar Semana' }).click();

        // Deve voltar para a lista e mostrar pontos (20 dos exercicios + 20 do bônus = 40)
        await expect(page).toHaveURL(/\/semana-treino\/$/);
        
        // Ir para progresso verificar
        await page.getByLabel('Progresso').click();
        await expect(page.getByText('Pontos Totais').locator('..').getByText('40')).toBeVisible();
        await expect(page.getByText('Semana completa!')).toBeVisible();
    });
});
