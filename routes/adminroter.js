const express = require('express');
const Student = require('../model/Student');
const routes = express.Router();

const admincontroller = require('../controller/admincontroller');
const passport = require('passport');

routes.post('/register',admincontroller.register);

routes.get('/getData',passport.authenticate('jwt'),admincontroller.getData);

routes.delete('/deleteData/:id',admincontroller.deleteData);

routes.put('/updateData/:id',admincontroller.updateData);

routes.post('/Admin',admincontroller.Admin);

routes.post('/add_fields',Student.uploadedAvtar,admincontroller.add_fields);

routes.get('/logout',admincontroller.logout);

routes.get('/getAdmindata',admincontroller.getAdmindata);

routes.get('/adminprofile',passport.authenticate('jwt'),admincontroller.adminProfile);


routes.use('/faculty',require('./api/v1/faculty/register'));
routes.use('/student',require('./api/v1/studentD'));

module.exports = routes;