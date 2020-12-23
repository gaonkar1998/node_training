const sequilize = require('sequelize');
const db = require('../models/index');
const { get } = require('../routes');
// const user = require('../models/user');
const { User } = db.sequelize.models;
const registerUser = async (req, res) => {

    // read the data from the input fields 

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    //find all users with the email repeated 

    getData = await User.findAll({
        where: { email: email }
    });
    if (getData.length) {
        return { status: "error", message: "email should be unique" }
    }

    // if no user with same email add that user to database 
    else {
        const createUser = {
            name,
            email,
            password,
            role
        }
        return { status: "success", data: await User.create(createUser) };
    }
};
const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    getUser = await User.findAll({
        where: {
            email,
            password
        }
    });
    const userDetails = getUser.map(el => el.get({ plain: true }));
    return { status: 200, data: userDetails };
}
//get user service
const getUsers = async (req, res) => {
    const role = req.params.role;
    var getUser = "";
    if (role == "client" || role == "resource") {
        getUser = await User.findAll({
            where: {
                role
            }
        });
    }
    else {
        getUser = await User.findAll({});
    }
    // console.log(getUser);
    // return { status: 200, data: getUser.map(el => el.get({ plain: true })) };
    return { status: 200, data: getUser };
}
const deleteuser = async (req, res) => {
    var id = req.params.id;
    var deleteid = "";
    var getuser = "";
    getuser = await User.findAll({
        where: {
            id
        }
    });
    console.log(getuser);
    if (getuser.length != 0) {
        deleteid = await User.destroy({
            where: {
                id
            }
        })
        return { status: 200, message: "deleted id successfully"}
    }
    else
        return { status: 401, message: "id doesnt exist" }
}
const updateuser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    var getuser = "";
    var updateusers = "";
    getuser = await User.findAll({
        where: {
            id
        }
    });
    console.log("user is " + getuser);
    console.log(req.body.name);
    console.log(req.params.id);
    if (getuser.length != 0) {
        updateusers = await User.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        },
            {
                where: {
                    id: req.params.id
                }
            })
        return { status: "success", data: req.body.id }
    }

    else
        return { status: "error", message: "id not found to update" }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    deleteuser,
    updateuser
}