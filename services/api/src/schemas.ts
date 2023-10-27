import * as z from 'zod';
import sharedConfig from 'shared/shared_config';

export const providerSchema = z.enum(sharedConfig.availibleProviders, {
  description: `Invalid provider. Availible: ${sharedConfig.availibleProviders}`,
});
