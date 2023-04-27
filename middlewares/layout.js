const mobile = require('is-mobile')

module.exports = (req,res,next) => {
    req.layout = mobile({
        ua: req.headers['user-agent'],
        tablet:true,
        featureDetect: false
    }) ? 'mobile' : 'desktop'
    next()
}