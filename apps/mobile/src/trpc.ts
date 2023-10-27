import { createTRPCReact } from '@trpc/react-query';
import type { ApiRouter } from 'api';

export const trpc = createTRPCReact<ApiRouter>();
