import { Router, Request, Response } from 'express';
import { ImageRouter } from './images/image.router';

const router: Router = Router();

// @TODO
// GET /filteredimage is provided by a ImageRouter
router.use('/filteredimage', ImageRouter);

// @TODO
// Here u have the actually default GET / endpoint
router.get('/', async (req: Request, res: Response) => {
    res.send(`try GET /filteredimage?image_url={{}}`);
});

export const IndexRouter: Router = router;