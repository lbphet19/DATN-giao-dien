const HTTP = require('../utils/http')

class ArticleController{
    async index(req,res,next){
        let cat = await HTTP.get(`category`,{name: req.params.category})
        if(cat.status === 200){
            cat = cat.data.id
        }
        else{
            res.render(req.layout + '/error/error.njk')
            return
        } 
        // article
        let articles = await HTTP.get('articles',{status:"published",order:"publishedAt",dir:"desc", categoryID: cat})
        if(articles.status === 200){
            res.render(req.layout + '/article/index.njk',
                {
                    articles:articles.data.data
                }
            )
        }
        else{
            res.render(req.layout + '/error/error.njk')
        }
    }
    async detailArticle(req,res,next){
        let article = await HTTP.get('article',{slug:req.params.slug})
        // console.log(article.data)
        if(article.status === 200){
            // console.log(article.data.content.blocks[0].data.cols[0].blocks[0])
            res.render(req.layout + '/article/detail/detail.njk',
            { 
                test: article.data.content.blocks[0].data.cols[0].blocks[0],
                article: article.data
            }
        )
        }
        else{
            res.render(req.layout + '/error/error.njk')
        }
    }
}

module.exports = new ArticleController 