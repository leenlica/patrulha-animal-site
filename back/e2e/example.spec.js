import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Cadastro e Login de Usuário', () => {
  test('Deve exibir mensagens de erro para campos obrigatórios', async ({ page }) => {
    await page.goto(`${BASE_URL}/cadastro.html`);
    
    await page.click('input[type="submit"]');
    
    await expect(page.locator('.error-message')).toContainText([
      'Nome é obrigatório.',
      'E-mail é obrigatório.',
      'Senha é obrigatório.',
      'Confirmação de Senha é obrigatório.'
    ]);
  });

  test('Deve cadastrar um usuário com sucesso', async ({ page }) => {
    await page.goto(`${BASE_URL}/cadastro.html`);
    
    const uniqueEmail = `teste${Date.now()}@email.com`; // Gera um e-mail único
    
    await page.fill('input[name="nome"]', 'Usuário Teste');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirmationPassword"]', '123456');
    await page.click('input[type="submit"]');
    
    await page.waitForURL(`${BASE_URL}/signin.html`);
    expect(page.url()).toBe(`${BASE_URL}/signin.html`);
  });

  test('Deve fazer login com sucesso', async ({ page }) => {
    await page.goto(`${BASE_URL}/signin.html`);
   
    await page.fill('input[placeholder="E-mail"]', 'teste@email.com');
    await page.fill('input[placeholder="Senha"]', '123456');
    await page.click('input[type="submit"]');
  
    await page.waitForURL(`${BASE_URL}/home.html`);
    expect(page.url()).toBe(`${BASE_URL}/home.html`);
  });

});
