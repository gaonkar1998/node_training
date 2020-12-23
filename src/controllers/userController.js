const userService = require('../services/userService');

const authService = require('../shared/auth.service');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {

    // validate the sent request 
    const error = validationResult(req);

    //if their are errors in the request print the errors
    if (!error.isEmpty()) {
        return res.status(401).json({ "error": error });
    }

    // execute service file
    const registerUserData = await userService.registerUser(req, res);
    if (registerUserData.status == "error") {
        return res.status(401).json(registerUserData.message);
    }
    else if (registerUserData.status == "success") {
        return res.status(200).json(registerUserData.data);
    }

}
//login validation
const loginuser = async (req, res) => {

    const error = validationResult(req);

    //if their are errors in the request print the errors
    if (!error.isEmpty()) {
        return res.status(401).json({ "error": error });
    }
    const loginUserData = await userService.loginUser(req, res);
    if (loginUserData.data.length) {
        //generate token
        const userData = loginUserData.data[0];
        // console.log(userData);
        delete userData['password'];
        const token = authService.generateToken(userData);
        // console.log("token is " + token);
        return res.status(200).json({ "success": "Login success", "token": token });
    }
    else {
        return res.status(401).json({ "error": "Invalid email or password" });
    }
}
// to get registered users
const getUsers = async (req, res) => {
    console.log(req.params.role);
    // const role1 = req.res.locals.user.role;
    // console.log("role is"+role1);
    const role = req.params.role;
    console.log(role);
    if (role == 'admin' || role == 'client' || role == 'resource') {
        // console.log(req.params.role);
        const userData = await userService.getUsers(req, res);
        // console.log(userData);
        return res.status(200).json({ "success": userData });
    }
    else {
        return res.status(401).json({ "error": "no access permitted" });
    }
}

const deleteuser = async (req, res) => {
    // console.log(req.params.id);
    // console.log("hello world");
    const deleteuser = await userService.deleteuser(req, res);
    if(deleteuser.status==200)
    return res.status(200).json({ "success": deleteuser });
    if(deleteuser.status==401)
    return res.status(401).json({ "error": deleteuser });
}
const updateuser = async (req, res) => {
    const error = validationResult(req);

    //if their are errors in the request print the errors
    if (!error.isEmpty()) {
        return res.status(401).json({ "error": error });
    }

    const updateuser = await userService.updateuser(req, res);
    if(updateuser.status=="success")
        return res.status(200).json({ "updated successfuly": updateuser });
    if(updateuser.status=="error")
        return res.status(404).json({ "message": "enter valid id" });
}
module.exports =
{
    registerUser,
    loginuser,
    getUsers,
    deleteuser,
    updateuser

}