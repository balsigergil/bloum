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
  await expect(select.locator("select")).toHaveValue("tiger");
  await select.locator(".bl-select-clear-button").first().click();
  await expect(select.locator("select")).toHaveValue("");
  await expect(select.locator(".bl-select-text")).toHaveText(
    "Choose an option",
  );
});

test("navigate with arrow keys", async ({ page }) => {
  await page.goto("/");
  const select = page.locator("bl-select").first();
  await select.locator("input").focus();
  await expect(select).toHaveClass(/open/);
  await select.press("ArrowDown");
  await select.press("ArrowDown");
  await select.press("Enter");
  await expect(select).not.toHaveClass(/open/);
  await expect(select.locator(".bl-select-text")).toHaveText("Elephant");
  await expect(select.locator("select")).toHaveValue("elephant");
  await expect(select.locator("input")).toBeFocused();

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
  const submenu = select.locator(".bl-select-menu-wrapper").first();
  await select.click();
  await select.locator("input").fill("er");
  await expect(
    select.locator(".bl-select-menu-item:not(.filtered)"),
  ).toHaveText(["Tiger", "Rhinoceros"]);
  await select.locator("input").press("Backspace");
  await select.locator("input").press("Backspace");
  await select.locator("input").press("Backspace");
  await expect(submenu.locator(".bl-select-menu-item.filtered")).toHaveCount(0);
  for (const item of await submenu.locator(".bl-select-menu-item").all()) {
    await expect(item).toBeVisible();
  }
});
