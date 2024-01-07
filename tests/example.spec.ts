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
    "Choose an option"
  );
});
