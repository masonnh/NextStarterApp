'use client';

import React from 'react';
import Image from 'next/image';

import { Provider } from '@supabase/supabase-js';

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
    <button className="button-oauth" onClick={handleClickLoginButton}>
      <div className="oauth-padding">
        <Image
          src={logo}
          alt="oAuthLogo"
          className="oauth-logo"
          width={24}
          height={24}
        />
        {buttonText}
      </div>
    </button>
  );
}

export default OAuthLoginButton;
