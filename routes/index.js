let express = require('express')
const layout = require('../middlewares/layout')
const articleController = require('../controller/articleController')
const homeController = require('../controller/homeController')

let router = express.Router()

router.use(layout)

router.get('/',homeController.index)

router.get('/:category', articleController.index)
router.get('/:category/:slug.html', articleController.detailArticle)

//  
module.exports = router