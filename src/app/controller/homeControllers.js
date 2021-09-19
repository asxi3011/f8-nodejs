const Courses = require('../models/course');


class homeControllers{
    index(req,res,next){
      Courses.find()
        .lean()
        .then(data=>{
            res.render('courses',{data:data})
        }) 
        .catch(next);
    }
    
    
}

module.exports = new homeControllers;