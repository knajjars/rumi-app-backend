import { Router } from 'express';

import { UserRole } from '../../common';
import { checkACL, searchApartments } from '../../middlewares';

const router = Router();

router.get('/search', checkACL([UserRole.Owner]), searchApartments);

export default router;
