/* eslint-disable implicit-arrow-linebreak */
import { OAuthProvider, OAuthStrategy } from '@clerk/clerk-sdk-node';
import config from './config';

export class ClerkAccessTokenError extends Error {}

type OauthAccessTokenDTO = {
  token: string;
  provider: string;
  scopes: string[];
}[];

const providerToStrategy = (provider: OAuthProvider): OAuthStrategy =>
  `oauth_${provider}`;

export const fetchOauthAccessToken = async (
  userId: string,
  provider: OAuthProvider
): Promise<OauthAccessTokenDTO> => {
  const oauthStrategy = providerToStrategy(provider);
  const response = await fetch(
    `https://api.clerk.dev/v1/users/${userId}/oauth_access_tokens/${oauthStrategy}`,
    { headers: { Authorization: `Bearer ${config.clerkSecretKey}` } }
  );
  if (!response.ok) {
    throw new ClerkAccessTokenError(
      "Couldn't get access token from authorization server."
    );
  }
  return (await response.json()) as OauthAccessTokenDTO;
};

export const get = async (
  url: string,
  params: { [k: string]: string } = {},
  bearer: string = ''
) => {
  const newUrl = new URL(url);
  Object.entries(params).forEach((entry) => {
    newUrl.searchParams.append(entry[0], entry[1]);
  });
  return fetch(newUrl, { headers: { Authorization: `Bearer ${bearer}` } });
};
