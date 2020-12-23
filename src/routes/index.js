var express = require("express");

const routes = express.Router();

const { body } = require('express-validator');

const userController = require("../controllers/userController");

const authService = require('../shared/auth.service');
// routes.post('/register',userController.registerUser);

// if the route is having register path validate for the data sent 
routes.post('/register',
    [
        body('name')
            .isAlpha().withMessage("name should be string")
            .not().isEmpty().withMessage("name cannont be empty"),

        body('email')
            .isEmail().withMessage("enter valid email")
            .not().isEmpty().withMessage("email cannot be empty"),
        // .custom(email => {
        //     if (alreadyHaveEmail(email)) {
        //       throw new Error('Email already registered')
        //     }
        // }),

        body('password')
            .isLength({ min: 3 }).withMessage("length should be minumum 3")
            .not().isEmpty().withMessage("password cannot be empty"),

        body('role')
            .isIn(['admin', 'resource', 'client']).withMessage("role sholud be admin, client or resource")
            .not().isEmpty().withMessage("role cannot be empty")

    ],
    userController.registerUser);


routes.post('/login',
    [
        body('email')
            .isEmail().withMessage("enter valid email")
            .not().isEmpty().withMessage("email cannot be empty"),
        body('password')
            // .isLength({ min: 3 }).withMessage("length should be minumum 3")
            .not().isEmpty().withMessage("password cannot be empty")
    ],
    userController.loginuser);

    routes.delete('/delete/:id', userController.deleteuser);
    routes.put('/update/:id', 
    [
        body('name')
            .isAlpha().withMessage("name should be string")
            .not().isEmpty().withMessage("name cannont be empty"),

        body('email')
            .isEmail().withMessage("enter valid email")
            .not().isEmpty().withMessage("email cannot be empty"),
        body('password')
            .isLength({ min: 3 }).withMessage("length should be minumum 3")
            .not().isEmpty().withMessage("password cannot be empty"),

        body('role')
            .isIn(['admin', 'resource', 'client']).withMessage("role sholud be admin, client or resource")
            .not().isEmpty().withMessage("role cannot be empty")
    ],
    userController.updateuser);

//to get all registered users
routes.get('/getusers/:role', authService.validatetoken, userController.getUsers);
module.exports = routes;