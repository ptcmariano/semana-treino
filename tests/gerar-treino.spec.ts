import { test, expect } from '@playwright/test';

test('deve gerar novo treino ao clicar no botão Gerar treino', async ({ page }) => {
  await page.goto('http://localhost:3000/semana-treino/clear-week/');

  const gerarBtn = page.getByRole('button', { name: 'Gerar treino coach' });
  await expect(gerarBtn).toBeVisible();

  await gerarBtn.click();

  await expect(page).toHaveURL(/\/semana-treino\/$/);

  const exerciciosEsperados = [
    "Supino reto (Peito)",
    "Supino inclinado (Peito)",
    "Tríceps pulley (Tríceps)",
    "Agachamento livre (Pernas)",
    "Prancha isométrica (Abdômen)"
  ];

  for (const exercicio of exerciciosEsperados) {
    await expect(page.getByText(exercicio)).toBeVisible();
  }
});
