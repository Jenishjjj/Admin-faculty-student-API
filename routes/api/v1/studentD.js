const express = require('express');
const routes = express.Router();
const studentController = require('../../../controller/api/v1/studentController');

routes.post('/stud_register',studentController.stud_register);

module.exports = routes;