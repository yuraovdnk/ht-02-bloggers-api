
let posts = [
    {
        id: 1,
        title: "title1",
        shortDescription: "descr1",
        content: "content1",
        bloggerId: 1,
        bloggerName: "About JS - 023"
    },
    {
        id: 2,
        title: "title2",
        shortDescription: "descr2",
        content: "content2",
        bloggerId: 1,
        bloggerName: "About JS - 023"
    }
]

export const postsRepository = {
    getPosts() {
        return posts
    },

    getPostById(id: number) {
        return posts.find(p => p.id === id)
    },

    deletePosts(id: number) {
        const countArray = posts.length
        posts = posts.filter(p => p.id !== id)
        return posts.length < countArray
    },

    createPost(body: any,blogger: any) {
            const newPost = {
                id: Date.now(),
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                bloggerId: body.bloggerId,
                bloggerName: blogger.name
            }
            posts.push(newPost)
            return newPost
    },

    updatePost(body: any, id: number) {
        let post = posts.find(p => p.id === id)
        if(post){
            post.title = body.title
            post.content = body.content
            post.shortDescription = body.shortDescription

            return post
        }

    }
}