"use client";

import Button from '@/components/ui/Button';
import { logout } from "./actions";

function SignOutButton() {
    async function handleLogout() {
        logout();
    }

    return (
        <Button 
            onClick={handleLogout}
            className='button-contained'
            variant="contained"
        >
            Sign out
        </Button>
    );
}

export default SignOutButton;
