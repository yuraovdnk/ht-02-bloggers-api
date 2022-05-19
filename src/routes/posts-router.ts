import {Router, Response, Request} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {postsValidate} from "../middlewares/posts-validator";
import {bloggersRepository} from "../repositories/bloggers-repository";

export const postsRouter = Router()

const errorFindBlogger = {
    "errorsMessages": [
        {
            "message": "Invalid 'bloggerId': such blogger doesn't exist",
            "field": "bloggerId"
        }
    ],
    "resultCode": 1
}
postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.getPosts()
    res.send(posts)
})
postsRouter.post('/', postsValidate, (req: Request, res: Response) => {
    const createdPost = postsRepository.createPost(req.body)
    if (createdPost) {
        res.status(201).send(createdPost)
        return
    }
    res.status(404)
})
postsRouter.put('/:id', postsValidate, (req: Request, res: Response) => {
    const postId = +req.params.id

    if (!postsRepository.getPostById(postId)) {
        res.send(404)
        return
    }
    if (!bloggersRepository.getBloggerById(req.body.bloggerId)) {
        console.log("nema")
        res.status(400).send(errorFindBlogger)
        return;
    }
    const isUpdetedPost = postsRepository.updatePost(req.body, postId)
    if (isUpdetedPost) {
        res.send(204)
    }

})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const foundPost = postsRepository.getPostById(id)
    if (foundPost) {
        res.status(200).send(foundPost)
        return
    }
    res.status(404)
})
postsRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const deletedPost = postsRepository.deletePosts(id)
    if (deletedPost) {
        res.send(204)
        return
    }
    res.send(404)

})

