import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";


export const errorsValidation = (req: Request, res: Response, next: NextFunction) => {
    const valResult = validationResult.withDefaults({
            formatter: error => {
                return {
                    message: error.msg,
                    field: error.param
                }
            }
        }
    )

    const errors = valResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({errorsMessages: errors.array({onlyFirstError: true}), resultCode: 1})
    }

    next()
}
