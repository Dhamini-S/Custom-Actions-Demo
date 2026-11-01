import type { WalnutAndroidContext } from './walnut';

/** @walnut_method
 * name: Click Element
 * description: Click the linked Android element
 * actionType: custom_click_element
 * context: android
 * needsLocator: true
 * category: Element Interaction
 */
export async function clickElement(ctx: WalnutAndroidContext) {
  await ctx.click();
}
