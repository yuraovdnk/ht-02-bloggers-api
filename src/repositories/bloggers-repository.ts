export let bloggers = [
    {id: 1, name: 'About JS - 023', youtubeUrl: 'it-incubator.eu'},
    {id: 2, name: 'About JS - 02', youtubeUrl: 'it-incubator.eu'},
    {id: 3, name: 'About JS - 03', youtubeUrl: 'it-incubator.eu'},
]

export const bloggersRepository = {
    getBlogger() {
        return bloggers
    },
    getBloggerById(id: number) {
        const findBlogger = bloggers.find(b => b.id === id)
        return findBlogger
    },
    createBlogger(body: any) {
        const createdBlogger = {
            id: Date.now(),
            name: body.name,
            youtubeUrl: body.youtubeUrl
        }
        bloggers.push(createdBlogger)
        return bloggers
    },
    updateBlogger(body: any, id: number) {
        const blogger = bloggers.find(b => b.id === id)
        if (blogger) {
            blogger.name = body.name
            blogger.youtubeUrl = body.youtubeUrl
        }
        return blogger
    },
    deleteBlogger(id:number){
        const blogger = bloggers.find(b=> b.id === id)
        if(blogger){
            return bloggers = bloggers.filter(b => b.id !== id)
        }
        return
    }
}