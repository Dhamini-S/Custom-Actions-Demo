import type { WalnutContext } from './walnut';

/** @walnut_method
 * name: Generate Alphanumeric Value
 * description: Generate alphanumeric value with min length ${minLength} max length ${maxLength} prefix ${prefix} suffix ${suffix} and store in $[generatedValue]
 * actionType: custom_generate_alphanumeric
 * context: shared
 * needsLocator: false
 * category: Data Generation
 */
export async function generateAlphanumeric(ctx: WalnutContext) {
  // Extract arguments from description placeholders
  const minLength = parseInt(ctx.args[0], 10) || 8;      // args[0] = minLength from ${minLength}
  const maxLength = parseInt(ctx.args[1], 10) || 12;     // args[1] = maxLength from ${maxLength}
  const prefix = ctx.args[2] || '';                      // args[2] = prefix from ${prefix}
  const suffix = ctx.args[3] || '';                      // args[3] = suffix from ${suffix}
  const outputVar = ctx.args[4];                         // args[4] = "generatedValue" from $[generatedValue]

  // Validate inputs
  if (minLength < 0 || maxLength < 0) {
    ctx.warn('Length values must be non-negative');
    return;
  }

  if (minLength > maxLength) {
    ctx.warn(`Min length (${minLength}) cannot be greater than max length (${maxLength})`);
    return;
  }

  // Calculate actual length needed for random portion
  const prefixLength = prefix.length;
  const suffixLength = suffix.length;
  const minRandomLength = Math.max(0, minLength - prefixLength - suffixLength);
  const maxRandomLength = Math.max(minRandomLength, maxLength - prefixLength - suffixLength);

  // Generate random length between min and max
  const randomLength = Math.floor(Math.random() * (maxRandomLength - minRandomLength + 1)) + minRandomLength;

  // Define available characters
  const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Generate random alphanumeric string
  let randomPart = '';
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    randomPart += alphanumericChars[randomIndex];
  }

  // Combine prefix + random + suffix
  const generatedValue = prefix + randomPart + suffix;

  // Store result as runtime variable
  ctx.setVariable(outputVar, generatedValue);

  // Log the result
  ctx.log(`Generated alphanumeric value: ${generatedValue} (length: ${generatedValue.length})`);
}
