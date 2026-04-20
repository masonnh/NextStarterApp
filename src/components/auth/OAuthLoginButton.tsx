'use client';

import React from 'react';
import Image from 'next/image';

import { Provider } from '@supabase/supabase-js';

import { Button } from '@/components/ui/Button';

import { login } from './actions';

interface OAuthLoginButtonProps {
  provider: Provider;
  logo: string;
  buttonText: string;
}

function OAuthLoginButton({
  provider,
  logo,
  buttonText,
}: OAuthLoginButtonProps) {
  async function handleClickLoginButton() {
    login(provider);
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full justify-start"
      onClick={handleClickLoginButton}
    >
      <span className="inline-flex items-center gap-3">
        <Image src={logo} alt="oAuthLogo" width={24} height={24} />
        {buttonText}
      </span>
    </Button>
  );
}

export default OAuthLoginButton;
