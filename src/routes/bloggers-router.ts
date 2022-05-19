import {Router, Request, Response} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {bloggersValidate} from "../middlewares/bloggers-validator";

export const bloggersRouter = Router()

bloggersRouter.get('/', (req: Request, res: Response) => {
    res.send(bloggersRepository.getBlogger())
})

bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    let foundBlogger = bloggersRepository.getBloggerById(id)

    if (foundBlogger) {
        res.status(200).send(foundBlogger)
    }

    res.status(404).send()
})

bloggersRouter.post('/', bloggersValidate,(req: Request, res: Response) => {
    const newBlogger = bloggersRepository.createBlogger(req.body)

    if (newBlogger) {
        res.status(200).send(newBlogger)
    }

    res.send(404)
})

bloggersRouter.put('/:id', bloggersValidate,(req: Request, res: Response) => {
    const id = +req.params.id
    const updatedBlogger = bloggersRepository.updateBlogger(req.body, id)

    if (updatedBlogger) {
        res.send(204)
        return
    }

    return res.send(404)
})

bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const deletedBlogger = bloggersRepository.deleteBlogger(id)

    if (deletedBlogger) {
        res.send(204)
        return
    }

    res.send(404)
})