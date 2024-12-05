import "server-only";
import { createServiceClient } from "@/utils/supabase/service";

/**
 * @returns success
 */
export async function updateLicense(
    email: string,
    licenseId: number,
    pending = false
) {
    const client = await createServiceClient();

    const { error } = await client
        .from("public.users")
        .update({ license_id: licenseId, payment_pending: pending })
        .eq("email", email);

    if (error) {
        console.error(
        `Failed to update license due to error: ${error} ${error.message}`
        );
        return false;
    }

    return true;
}