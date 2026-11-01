import type { WalnutAndroidContext } from './walnut';

/** @walnut_method
 * name: Click Add a Task Button
 * description: Click the Add a task button
 * actionType: custom_click_add_task_button
 * context: android
 * needsLocator: false
 * category: Task Management
 */
export async function clickAddTaskButton(ctx: WalnutAndroidContext) {
  await ctx.clickByText('Add a task');
}
