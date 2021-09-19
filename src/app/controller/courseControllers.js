const Courses = require('../models/course');


class courseControllers{

    show(req,res,next){
        Courses.findOne({ slug : req.params.slug })
            .lean()
            .then((data=>{
                res.render('show',{data:data});
            })
            )
            .catch(next);
    }
    create(req,res,next){
        res.render('createCourse');
    }
    edit(req,res,next){
        Courses.findById(req.params.id)
        .lean()
        .then((data=>{
            res.render('editCourse',{data:data})
        }))
        
      
    }
    list(req,res,next){

        Promise.all([ Courses.find(),Courses.countDeleted()])
     
       .then(([data,countDeletedcourse])=>{
        res.render('list',
        {data:data.map(data => data.toJSON()),
        count:countDeletedcourse}
        )
       })
           
        .catch(next);
    }
    store(req,res,next){
        const course = new Courses({
            name:req.body.name,
            description:req.body.description,
            image:req.body.image,
            videoId:req.body.videoId,
            slug:req.body.slug,
        })
        try {
            course.save(function(error){
                if(error)
                console.log('Khong the tao ');
                else{
                    res.redirect('/');
                }
            })
            
        } catch (error) {
             Console.log(error);
        }
    }

    update(req,res,next){
        Courses.updateOne({_id:req.params.id},req.body)
        .then(()=>res.redirect('/course/list'))
        .catch(next)
    }
    delete(req,res,next){
        Courses.delete({_id:req.params.id})
        .lean()
        .then(data=>{
            res.redirect('back');
        })
    }
    deleteOut(req,res,next){
        Courses.findByIdAndDelete({_id:req.params.id})
        .lean()
        .then(data=>{
            res.redirect('back');
        })
    }
    bin(req,res,next){
      
        Courses.findDeleted()
        .lean()
        .then(data=>{
            res.render('bin',{data:data})
        })
        .catch(next);
    }
    restore(req,res,next){
        
        Courses.restore({_id:req.params.id})
        .lean()
        .then(data=>{
            res.redirect('back')
        })
        .catch(next);
        
    }
    deleteMany(req,res,next){
        if(req.body.action === 'delete')
        {
        Courses.delete({_id: {$in:
        req.body.select_Courses
        }})
        .lean()
        .then(data=>{
            res.redirect('back');
        })
        }
        else{
            res.redirect('back');
        }
    }
}

module.exports = new courseControllers;