import { Metadata } from 'next';
import OAuthLoginButton from '@/components/auth/OAuthLoginButton';

export default function LogIn() {

    return (
        <>
            <div className="container">
                <div className="elevated-container">
                    <h2>Log in</h2>
                    <OAuthLoginButton 
                        provider="google" 
                        logo="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                        buttonText="Continue with Google" 
                    />
                </div>
            </div>
        </>
    );
}

export const metadata: Metadata = {
    title: 'Log in',
    description: 'Create a free account to get started',
};