import {
  OAuthProvider,
  OAuthStrategy,
} from '@clerk/clerk-sdk-node/dist/types/index';
/**
 * Removes duplicate (or more) slashes by removing slashes that are not preceded by a colon.
 * @date 10/7/2023 - 5:24:23 PM
 *
 * @param {string} url
 * @return {string} cleanUrl
 */
export const removeDoubleSlashes = (url: string) => {
  return url.replace(/([^:]\/)\/+/g, '$1');
};

export const providerToStrategy = (provider: OAuthProvider): OAuthStrategy => {
  return `oauth_${provider}`;
};
