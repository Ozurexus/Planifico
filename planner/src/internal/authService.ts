import * as Msal from 'msal';
import type { Configuration } from 'msal';
import { Client, type AuthProvider } from '@microsoft/microsoft-graph-client';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import type { User, Event } from 'microsoft-graph';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { ms } from 'date-fns/locale';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import type { AuthCodeMSALBrowserAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { ClientSecretCredential } from '@azure/identity';
import type { AccountInfo } from '@azure/msal-browser';
import { getUser } from './graph';
import { config as conf } from './config';

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: conf.appId,
    authority: conf.auth.authority,
    redirectUri: conf.redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
});

export const currentAccount = {} as AccountInfo;
export const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance, {
  account: currentAccount,
  scopes: conf.scopes,
  interactionType: InteractionType.Popup,
});

export const signIn = async () => {
  const loginRequest = {
    scopes: conf.scopes,
  };
  await msalInstance.loginPopup(loginRequest);
  msalInstance.setActiveAccount(currentAccount);

  const value = { currentAccount, authProvider };
};

export const signOut = async () => {
  await msalInstance.logoutPopup();
};

export const auth = {
  msalInstance,
  currentAccount,
  authProvider,
  signIn,
  signOut,
};
