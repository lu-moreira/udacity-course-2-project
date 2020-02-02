import { Request, Response, NextFunction } from 'express';
import { deleteLocalFiles, LocalContext } from '../../util/util';

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