
import { Request, Response, NextFunction } from "express";


function checkFields(req: Request, resp: Response, next: NextFunction) {
    const { name, description } = req.body;

    if (name && (name.length < 3 || name.length > 20)) {
        return resp.status(400).json({
            msg: "Name cannot be empty and should have between 3 and 20 characters"
        });
    }
    if (description.length > 125) {
        return resp.status(400).json({
            msg: "Description should have less than 125 characters"
        });
    }
    next();
}

export default checkFields;