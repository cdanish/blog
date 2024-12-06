const express = require('express');
const { getAllUser, registerController, loginController } = require('../controllers/userControllers');

//router object
const router = express.Router();

//get all users get
router.get("/all-users", getAllUser);

//crete user post
router.post("/resgister",registerController)

//login post

router.post("/login",loginController);

module.exports = router