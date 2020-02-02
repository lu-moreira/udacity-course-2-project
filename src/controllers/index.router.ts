import { Router, Request, Response } from 'express';
import { ImageRouter } from './images/image.router';

const router: Router = Router();

router.use('/filteredimage', ImageRouter);

router.get('/', async (req: Request, res: Response) => {
    res.send(`try GET /filteredimage?image_url={{}}`);
});

export const IndexRouter: Router = router;