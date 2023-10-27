import { router } from '../trpc';
import videoProcedure from './video_procedure';

export default router({
  list: videoProcedure,
});
