import { test, expect } from '@playwright/test';

test('admin can login and create a ticket through the protected UI', async ({ page }) => {
  const uniqueSuffix = Date.now();
  const ticketTitle = `E2E Bug Report - ${uniqueSuffix}`;

  // 1. Open /login page
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();

  // 2. Login as test user/admin
  await page.getByLabel('Email').fill('admin@example.com');
  await page.getByLabel('Password').fill('Admin@12345');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Confirm dashboard opens
  await expect(page).toHaveURL(/\/app\/dashboard/);
  await expect(page.getByRole('heading', { name: /welcome|dashboard/i })).toBeVisible();

  const mainNav = page.getByRole('navigation', { name: 'Main navigation' });

  // 4. Navigate to Tickets page
  await mainNav.getByRole('link', { name: 'Tickets', exact: true }).click();
  await expect(page).toHaveURL(/\/app\/tickets/);

  // 5. Navigate to Create Ticket form wizard
  await mainNav.getByRole('link', { name: /create ticket|ticket form/i, exact: true }).click();
  await expect(page.getByRole('heading', { name: /create ticket/i })).toBeVisible();

  // Step 1: Ticket Details
  await page.getByLabel(/title/i).fill(ticketTitle);
  await page.getByLabel(/category/i).fill('Hardware');
  await page.getByLabel(/description/i).fill('Testing screen flickering issue via Playwright E2E.');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Step 2: Submitter Details
  await page.getByLabel(/created by/i).fill('E2E Tester');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Step 3: Review & Submit
  await page
    .getByLabel(/i have reviewed the ticket details and they are ready to submit/i)
    .check();

  await page.getByRole('button', { name: 'Create Ticket' }).click();

  // 6. Confirm navigation to tickets list and presence of new ticket
  await expect(page).toHaveURL(/\/app\/tickets/);
  await expect(page.getByText(ticketTitle)).toBeVisible();
});