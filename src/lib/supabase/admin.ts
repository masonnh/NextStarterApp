import { createClient } from '@supabase/supabase-js';
import { getEnvVars } from '../env';

const { supabaseUrl } = getEnvVars();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.warn('Supabase admin client requires SUPABASE_SERVICE_ROLE_KEY and SUPABASE_URL');
}

export const supabaseAdmin = createClient(supabaseUrl as string, serviceRoleKey, {
  auth: { persistSession: false },
});

export default supabaseAdmin;
