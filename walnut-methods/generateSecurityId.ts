import type { WalnutContext } from './walnut';
import * as crypto from 'crypto';

/** @walnut_method
 * name: Generate Security ID
 * description: Generate an 8-character alphanumeric security ID and store in $[securityId]
 * actionType: custom_generate_security_id
 * context: shared
 * needsLocator: false
 * category: Data Processing
 */
export async function generateSecurityId(ctx: WalnutContext) {
  // Generate a random alphanumeric string (uppercase letters and digits)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  let securityId = '';
  
  // Use crypto for cryptographically secure random generation
  const randomBytes = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % chars.length;
    securityId += chars[randomIndex];
  }
  
  ctx.log('Generated security ID: ' + securityId);
  
  // Store the generated ID in the runtime variable
  // ctx.args[0] contains "securityId" from $[securityId] in the description
  ctx.setVariable(ctx.args[0], securityId);
}
