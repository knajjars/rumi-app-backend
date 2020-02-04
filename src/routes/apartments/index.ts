import { Router } from 'express';

import { searchApartments, isAuthenticated } from '../../middlewares';

const router = Router();

router.get('/search', isAuthenticated, searchApartments);

export default router;
