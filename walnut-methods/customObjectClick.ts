import type { WalnutAndroidContext } from './walnut';

/** @walnut_method
 * name: Custom Object Click
 * description: Click the linked Android object using its captured XPath
 * actionType: custom_custom_object_click
 * context: android
 * needsLocator: true
 * category: Element Interaction
 */
export async function customObjectClick(ctx: WalnutAndroidContext): Promise<void> {
  const objectName = ctx.objectDescription?.trim();
  const locator = ctx.locator?.trim();

  if (!objectName) {
    throw new Error(
      'Custom Object Click requires a linked Android UI object. Bind this step to the target element before running it.',
    );
  }

  if (!locator) {
    throw new Error(
      `Custom Object Click cannot click "${objectName}": the linked Android object has no XPath. Rebind the step to the target element.`,
    );
  }

  ctx.log(`Resolving and clicking the linked Android object "${objectName}" with the current context.`);

  try {
    // Resolve the linked object afresh through Android's supported helper; do not retain a device element.
    await ctx.click();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Custom Object Click could not resolve or click the linked Android object "${objectName}": ${detail}`,
    );
  }
}
