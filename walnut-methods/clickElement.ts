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
  if (!ctx.locator) {
    throw new Error('Click Element requires a linked Android object with a captured XPath.');
  }

  ctx.log(`Clicking ${ctx.objectDescription ?? 'linked Android object'} using XPath: ${ctx.locator}`);
  await ctx.click();
}
