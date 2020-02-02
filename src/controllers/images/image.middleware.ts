import { Request, Response, NextFunction } from 'express';
import { deleteLocalFiles, LocalContext } from '../../util/util';
import axios from 'axios';

export function deleteFilesMiddleware(req: Request, res: Response, next: NextFunction) {
    res.on('finish', async () => {

        if (res.statusCode != 200) {
            return
        }
        
        let ctx = res.locals as LocalContext;
        if (!ctx.filePath) {
            console.log("Could not delete local files");
            return;
        }
        await deleteLocalFiles([ctx.filePath]);
    })
    return next();
}

// @TODO
// This middleware validates if the image url is empty and if is accessible.
export async function validateImageUrlMiddleware(req: Request, res: Response, next: NextFunction) {
    let { image_url } = req.query;
    if (!image_url) {
        res.status(400).send({ "error": "Image Url invalid" });
        return
    }

    const errorIsNotPublic = { "error": `The image ${image_url} is not public or unavailable`}
    try {
        await axios.head(image_url)
    } catch(err) {
            res.status(400).send(errorIsNotPublic);
            return
    }
    next();
}