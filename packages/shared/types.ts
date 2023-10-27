import { OAuthProvider } from '@clerk/clerk-sdk-node/dist/types/index';
import sharedConfig from './shared_config';

type _availibleProviders = (typeof sharedConfig.availibleProviders)[number];

export enum ErrorCode {
  MissingQueryOrParam = 'missing_query_or_param',
  Unauthorized = 'unauthorized',
  UnableToRetrieveAccountId = 'unable_to_retrieve_account_id',
  UnableToRetrieveAccessToken = 'unable_to_retrieve_access_token',
}

export type AvailibleProvider = Extract<OAuthProvider, _availibleProviders>;
export type ErrorType = {
  message: string;
  code: ErrorCode;
};
export type DisplayErrorType = Omit<ErrorType, 'code'>;
