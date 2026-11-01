import type { WalnutIosContext } from './walnut';

/** @walnut_method
 * name: Tap Element
 * description: Tap the linked element
 * actionType: custom_tap_element
 * context: ios
 * needsLocator: true
 * category: Element Interaction
 */
export async function tapElement(ctx: WalnutIosContext) {
  if (!ctx.locator) {
    throw new Error('Tap Element requires a linked element locator.');
  }

  await ctx.tap(ctx.locator);
}
