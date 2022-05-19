import express,{Request,Response} from 'express'
const app = express()
import cors from 'cors'
import bodyParser from 'body-parser'
import {bloggersRouter} from "./routes/bloggers-router";
import {postsRouter} from "./routes/posts-router";
import {checkAuth} from "./middlewares/auth";

const port = process.env.PORT || 5000


app.use(cors())
app.use(bodyParser.json())


app.use('/bloggers',bloggersRouter)
app.use('/posts',postsRouter)



app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})