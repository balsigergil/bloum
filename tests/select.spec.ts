import { test, expect } from "@playwright/test";

test("click open menu", async ({ page }) => {
  await page.goto("/");
  const select = page.locator("bl-select").first();
  const input = select.locator("input");
  await expect(select).not.toHaveClass(/open/);
  await expect(input).toHaveAttribute("aria-expanded", "false");
  await expect(input).not.toBeFocused();
  await select.click();
  await expect(select).toHaveClass(/open/);
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("aria-expanded", "true");
  await page.locator("body").click();
  await expect(select).not.toHaveClass(/open/);
  await expect(input).toHaveAttribute("aria-expanded", "false");
  await expect(input).not.toBeFocused();
});

test("select then clear", async ({ page }) => {
  await page.goto("/");
  const select = page.locator("bl-select").first();
  await select.click();
  const item = select.getByText("Tiger").first();
  await item.click();
  await expect(select.locator(".bl-select-text")).toHaveText("Tiger");
  const selectEl = select.locator("select");
  await expect(selectEl).toHaveValue("tiger");
  await select.locator("bl-close-button").first().click();
  await expect(selectEl).toHaveValue("");
  await expect(select.locator(".bl-select-text")).toHaveText(
    "Select an option...",
  );
});

test("navigate with arrow keys", async ({ page }) => {
  await page.goto("/");
  const select = page.locator("bl-select").first();
  await select.click();
  await expect(select).toHaveClass(/open/);
  await select.press("ArrowDown");
  await select.press("ArrowDown");
  await select.press("Enter");
  await expect(select).not.toHaveClass(/open/);
  await expect(select.locator(".bl-select-text")).toHaveText("Elephant");
  await expect(select.locator("select")).toHaveValue("elephant");
  await expect(select).toBeFocused();

  // Should reopen the menu
  await select.press("ArrowDown");
  await expect(select).toHaveClass(/open/);
  await select.press("ArrowDown");
  await select.press("Enter");
  await expect(select.locator(".bl-select-text")).toHaveText("Giraffe");
  await expect(select.locator("select")).toHaveValue("giraffe");
});

test("escape should close the menu", async ({ page }) => {
  await page.goto("/");
  const select = page.locator("bl-select").first();
  await select.click();
  await expect(select).toHaveClass(/open/);
  await select.press("Escape");
  await expect(select).not.toHaveClass(/open/);
});

test("search filters the options", async ({ page }) => {
  await page.goto("/");
  const select = page.locator("bl-select").first();
  const submenu = select.locator(".bl-select-menu").first();
  await select.click();
  const input = select.locator("input");
  await input.fill("er");
  await expect(select.locator(".bl-option:not(.filtered)")).toHaveText([
    "Tiger",
    "Rhinoceros",
  ]);
  await input.press("Backspace");
  await input.press("Backspace");
  await input.press("Backspace");
  await expect(submenu.locator(".bl-option.filtered")).toHaveCount(0);
  for (const item of await submenu.locator(".bl-option").all()) {
    await expect(item).toBeVisible();
  }
});
