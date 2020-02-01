import { Router } from 'express';

import account from './account';
import apartments from './apartments';

const router = Router();

router.use('/account', account);
router.use('/apartments', apartments);

export default router;
