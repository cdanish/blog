const express = require('express');
const { getAllBlogController, createBlogController, updateBlogController, getBlogIdController, deleteBlogController,userBlogController } = require('../controllers/blogController');

//router object
const router = express.Router();

//routes

router.get("/all-blog",getAllBlogController);

//post //create blog
router.post("/create-blog",createBlogController);

//put || update blog
router.put("/update-blog/:id",updateBlogController);

//sigle blog
router.get("/get-blog/:id",getBlogIdController);


//delete blog
router.delete("/delete-blog/:id",deleteBlogController);

//get user blog
router.get("/user-blog/:id",userBlogController);


module.exports = router;