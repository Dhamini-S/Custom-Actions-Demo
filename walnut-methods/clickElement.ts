import type { WalnutAndroidContext } from './walnut';

/** @walnut_method
 * name: Click Element
 * description: Click the linked Android object using its captured XPath
 * actionType: custom_click_element
 * context: android
 * needsLocator: true
 * category: Element Interaction
 */
export async function clickElement(ctx: WalnutAndroidContext) {
  if (ctx.locator) {
    await ctx.click();
    return;
  }

  const targetText = ctx.objectDescription?.trim();
  if (!targetText) {
    throw new Error('Click Element requires a linked locator or a named element.');
  }

  await ctx.clickByText(targetText);
}
