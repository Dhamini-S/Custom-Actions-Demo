import type { WalnutAndroidContext } from './walnut';

/** @walnut_method
 * name: Custom Object Click
 * description: Click the linked Android object using its captured XPath
 * actionType: custom_custom_object_click
 * context: android
 * needsLocator: true
 * category: Element Interaction
 */
export async function customObjectClick(ctx: WalnutAndroidContext) {
  if (!ctx.locator) {
    throw new Error('Custom Object Click requires a linked Android object with a captured XPath.');
  }

  ctx.log(`Clicking ${ctx.objectDescription ?? 'linked Android object'} using XPath: ${ctx.locator}`);
  await ctx.click();
}
