class HomeController{
    async index(req,res,next){
        console.log(req.layout + " - herreeeeeeeeeee")
        let data = {
            message: 'Hello world!',
            title: 'Test'
        }
        res.render(req.layout + '/index.njk',data)
    }
}

module.exports = new HomeController