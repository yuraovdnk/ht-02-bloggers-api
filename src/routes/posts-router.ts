import {Router, Response, Request} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {postsValidate} from "../middlewares/posts-validator";
import {bloggers, bloggersRepository} from "../repositories/bloggers-repository";
import {checkAuth} from "../middlewares/auth";

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
postsRouter.post('/', checkAuth,postsValidate, (req: Request, res: Response) => {
    const existBlogger = bloggers.find(b => b.id === req.body.bloggerId)
    if(!existBlogger){
        res.status(400).send(errorFindBlogger)
        return;
    }
    const createdPost = postsRepository.createPost(req.body,existBlogger)

    if (createdPost) {
        res.status(201).send(createdPost)
        return
    }
    res.send(404)
})
postsRouter.put('/:id',checkAuth, postsValidate, (req: Request, res: Response) => {
    const postId = +req.params.id

    if (!postsRepository.getPostById(postId)) {
        res.send(404)
        return
    }
    if (!bloggersRepository.getBloggerById(req.body.bloggerId)) {
        res.status(400).send(errorFindBlogger)
        return;
    }
    const isUpdetedPost = postsRepository.updatePost(req.body, postId)
    if (isUpdetedPost) {
        res.send(204)
        return;
    }

})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const foundPost = postsRepository.getPostById(id)
    if (foundPost) {
        res.status(200).send(foundPost)
        return
    }
    res.send(404)
})
postsRouter.delete('/:id', checkAuth,(req: Request, res: Response) => {
    const id = +req.params.id
    const deletedPost = postsRepository.deletePosts(id)
    if (deletedPost) {
        res.send(204)
        return
    }
    res.send(404)

})


