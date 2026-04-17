'use client';

import React from 'react';

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
        <img src={logo} alt="oAuthLogo" className="oauth-logo" />
        {buttonText}
      </div>
    </button>
  );
}

export default OAuthLoginButton;
