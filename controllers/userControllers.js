const userModel = require("../models/userModels")
const bcrypt = require('bcrypt');



//create 
exports.registerController = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        //validation

        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "please fill all fields",
            })
        }

        //existing user
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already Exists",
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        //save user 
        const user = new userModel({ username, email, password: hashPassword });




        await user.save();


        return res.status(201).send({
            success: true,
            message: "New User Created",
            user,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error in Register Callback",
            success: false,
            error
        })
    }



}


//get
exports.getAllUser = async (req, res) => {

    try {

        const users = await userModel.find({});

        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "all users data",
            users
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Register Users",
            success: false,
            error,
        })
    }



};


//login
exports.loginController = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "please provide email or password",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).send({
                success: false,
                message: "password is not valid",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            user

        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Login Callback",
            error,
        });
    }

}