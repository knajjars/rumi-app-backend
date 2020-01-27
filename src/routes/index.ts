import { Router } from 'express';

import auth from './auth';
import apartments from './apartments';

const router = Router();

router.use('/auth', auth);
router.use('/apartments', apartments);

export default router;
