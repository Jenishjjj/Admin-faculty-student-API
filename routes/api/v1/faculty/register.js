const express = require('express');
const routes = express.Router();
const facultyController = require('../../../../controller/api/v1/faculty/facultyController');
const passport = require('passport');
const Faculty = require('../../../../model/Faculty'); 

routes.post('/register',passport.authenticate('jwt'),facultyController.register);

routes.post('/login',facultyController.login);

routes.post('/profile',passport.authenticate('faculty'),facultyController.profile);

routes.get('/myprofile',async (req,res)=>{
    let facData = await Faculty.findById(req.user.id).populate('student_id').exec();
    let count = await facData.student_id.length;
    return res.json({status:200,msg:facData,'students number':count});
})


module.exports = routes;