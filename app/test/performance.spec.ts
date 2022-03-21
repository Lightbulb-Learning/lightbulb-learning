import { test, expect } from '@playwright/test';
import { EL_STUDENTO, PerformancePage } from './performancePage';
import { loginStudent } from './testLogin';

test.beforeEach(async ({ page }) => {
  await loginStudent(page)
});

test.describe('Performances', () => {
  test('should display open question performance', async ({ page }) => {
    const performancePage = new PerformancePage(page);
    await performancePage.goto(EL_STUDENTO)
    await expect(performancePage.openQuestionPerformance.metadata).toHaveText("- Open Question - 0 likes") // ignore date and time
    await expect(performancePage.openQuestionPerformance.questionText).toHaveText("Whats up?")
    await expect(performancePage.openQuestionPerformance.answerText).toHaveText("- Not much, bro.")
  });
})

test.describe('Evaluations', () => {
  test('should display correct defaults', async ({ page }) => {
    const performancePage = new PerformancePage(page);
    await performancePage.goto(EL_STUDENTO)
    await expect(performancePage.title).toHaveText('Performance of El Studento');
    await expect(performancePage.latestEvaluation).toHaveText('0%');
    await expect(performancePage.changeButton).toBeVisible();
  });

  test('should show new evaluation after creating it', async ({ page }) => {
    const performancePage = new PerformancePage(page);
    await performancePage.goto(EL_STUDENTO)
    await page.waitForTimeout(1_000)
    await performancePage.changeButton.click()
    await performancePage.evaluationInput.fill("33")
    await performancePage.saveButton.click()
    // display without page reload
    await expect(performancePage.latestEvaluation).toHaveText("33%")
    await expect(performancePage.evaluation.evaluationText).toHaveText("Reached 33%")

    await performancePage.goto(EL_STUDENTO)
    await page.waitForTimeout(1_000)
    // display with page refresh as latest evaluation
    await expect(performancePage.latestEvaluation).toHaveText("33%")
    // display with page refresh in list
    await expect(performancePage.evaluation.evaluationText).toHaveText("Reached 33%")
  })
})