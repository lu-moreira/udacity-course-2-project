import { Router, Request, Response, NextFunction } from 'express';
import { filterImageFromURL, LocalContext } from '../../util/util';
import { deleteFilesMiddleware } from './image.middleware';

const router: Router = Router();

// @TODO
// This is de middleware we use to remove the images from local
router.use(deleteFilesMiddleware)

// @TODO
// Here the actual GET /filteredimage endpoint.
// This validates the image_url if is not empty
// Then, tries to recover the image and parse it
// If anything is fine, this puts on Response.locals his path and response the image file
// If something wrong happens, like a invalid image or could not GET the image will response a 500 error
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
        let errMessage = err.message? err.message : "Something wrong has happened D:"
        res.status(500).send({ "error": errMessage });
    }
});

export const ImageRouter: Router = router;