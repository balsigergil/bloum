import { test, expect } from "@playwright/test";

test("click open menu", async ({ page }) => {
  await page.goto("/");
  const select = page.locator("bl-select").first();
  await select.click();
  await expect(select).toHaveClass(/open/);
  await expect(select.locator("input")).toBeFocused();
  await page.locator("body").click();
  await expect(select).not.toHaveClass(/open/);
  await expect(select.locator("input")).not.toBeFocused();
});

test("select then clear", async ({ page }) => {
  await page.goto("/");
  const select = page.locator("bl-select").first();
  await expect(select).toHaveAttribute("clearable", "");
  await select.click();
  const item = select.getByText("Albert").first();
  await item.click();
  await expect(select.locator(".bl-select-text")).toHaveText("Albert");
  await expect(select.locator("select")).toHaveValue("albert");
  await select.locator(".bl-select-clear-button").first().click();
  await expect(select.locator("select")).toHaveValue("");
  await expect(select.locator(".bl-select-text")).toHaveText(
    "Choose an option",
  );
});

test("navigate with arrow keys", async ({ page }) => {
  await page.goto("/");
  const select = page.locator("bl-select").first();
  await expect(select).not.toHaveClass(/open/);
  await select.click();
  await expect(select).toHaveClass(/open/);
  await select.press("ArrowDown");
  await select.press("ArrowDown");
  await select.press("Enter");
  await expect(select).not.toHaveClass(/open/);
  await expect(select.locator(".bl-select-text")).toHaveText("Nicolas");
  await expect(select.locator("select")).toHaveValue("nicolas");
  await expect(select.locator("input")).toBeFocused();

  // Should reopen the menu
  await select.press("ArrowDown");
  await expect(select).toHaveClass(/open/);
  await select.press("ArrowDown");
  await select.press("Enter");
  await expect(select).not.toHaveClass(/open/);
  await expect(select.locator(".bl-select-text")).toHaveText("Ernest");
  await expect(select.locator("select")).toHaveValue("ernest");
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
    submenu.locator(".bl-select-menu-item:not(.filtered)"),
  ).toHaveCount(2);
  await expect(submenu.locator(".bl-select-menu-item.filtered")).toHaveCount(2);
  await expect(
    select.locator(".bl-select-menu-item:not(.filtered)"),
  ).toHaveText(["Albert", "Ernest"]);
  await expect(
    submenu.locator(".bl-select-menu-item", { hasText: /(Nicolas)|(Jean)/ }),
  ).toHaveClass([/filtered/, /filtered/]);
  await select.locator("input").press("Backspace");
  await select.locator("input").press("Backspace");
  await select.locator("input").press("Backspace");
  await expect(submenu.locator(".bl-select-menu-item.filtered")).toHaveCount(0);
  for (const item of await submenu.locator(".bl-select-menu-item").all()) {
    await expect(item).toBeVisible();
  }
});
