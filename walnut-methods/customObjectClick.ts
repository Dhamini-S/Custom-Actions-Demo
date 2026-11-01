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
  const objectName = ctx.objectDescription?.trim() || 'linked Android object';
  const locator = ctx.locator?.trim();

  if (!locator) {
    throw new Error(
      `Custom Object Click cannot click "${objectName}": no linked Android object or XPath was supplied.`,
    );
  }

  ctx.log(`Resolving and clicking ${objectName} with its linked Android XPath: ${locator}`);

  try {
    // The Android context resolves the linked XPath to a live element for this execution.
    // Use the helper rather than retaining an Appium element between test runs.
    await ctx.click();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Custom Object Click could not resolve or click "${objectName}" using its linked XPath "${locator}": ${detail}`,
    );
  }
}
