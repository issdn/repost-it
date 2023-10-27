import { router } from '../trpc';
import userProcedure from './user_procedure';
export default router({
  accountId: userProcedure,
});
