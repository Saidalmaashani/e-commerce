// Auto-create default admin
import { createDefaultAdmin } from './controllers/authController.js';
setTimeout(async () => {
  try { await createDefaultAdmin(); } catch(e) {}
}, 3000);
