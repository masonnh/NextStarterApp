import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getEnvVars } from "@/utils/env";

const { supabaseUrl, supabaseServiceRoleKey } = getEnvVars();

export const createServiceClient = async () =>
    await createClient(
        supabaseUrl!,
        supabaseServiceRoleKey!,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
        }
    );