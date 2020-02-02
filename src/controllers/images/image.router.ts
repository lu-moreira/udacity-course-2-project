import { Router, Request, Response, NextFunction } from 'express';
import { filterImageFromURL, LocalContext } from '../../util/util';
import { deleteFilesMiddleware } from './image.middleware';

const router: Router = Router();

router.use(deleteFilesMiddleware)

router.get('/', async (req: Request, res: Response) => {
    let { image_url } = req.query;
    if (!image_url) {
        res.status(400).send({ "error": "Image Url invalid" });
    }

    try {
        let filteredImagePath = await filterImageFromURL(image_url);
        res.locals = new LocalContext(filteredImagePath);
        res.sendFile(filteredImagePath);
    } catch (err) {
        res.status(500).send({ "error": "Something wrong has happened D:" });
    }
});

export const ImageRouter: Router = router;