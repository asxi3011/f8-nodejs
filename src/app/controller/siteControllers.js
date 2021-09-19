class siteControllers{
    index(req,res){
        res.render('courses')
    }
}

module.exports = new siteControllers;