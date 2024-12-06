const mongoose = require('mongoose');
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModels");

//get all blogs
exports.getAllBlogController = async (req, res) => {

    try {

        const blogs = await blogModel.find({}).populate("user");
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No Blogs Found",
            });
        }

        return res.status(200).send({
            success: true,
            message: "All Blogs Lists",
            BlogCount: blogs.length,
            blogs,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error while getting blogs",
            error,
        });
    }

}


//create blog
exports.createBlogController = async (req, res) => {
    try {

        const { title, description, image, user } = req.body;

        //validation\
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "please provide All fields",
            });
        }

        const existingUser = await userModel.findById(user);

        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "unable to find user",

            });
        }

        const newBlog = new blogModel({ title, description, image,user });
        
        existingUser.blogs.push(newBlog);
        await existingUser.save();

        //session can used in mongodb atlas not locally
        // const session = await mongoose.startSession();
        // session.startTransaction();
        // await newBlog.save({ session });
        // existingUser.blogs.push(newBlog);
        // await existingUser.save({ session });
        // await session.commitTransaction();

        await newBlog.save();

       

        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while creating blogs",
            error,
        });
    }






}

//update blog

exports.updateBlogController = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, description, image } = req.body;

        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).send({
            success: true,
            message: "Blog updated",
            blog,
        })


    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while updating blog",
            error,
        });
    }

}

//single blog

exports.getBlogIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "blog is not found with this id",
            });
        }

        return res.status(200).send({
            success: true,
            message: "fetch Single blog",
            blog,

        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while getting blog data",
            error,
        });
    }

}

//delete blog

exports.deleteBlogController = async (req, res) => {

    try {

        const { id } = req.params;
        //findOneAndDelete(id)
        const dblog = await blogModel.findByIdAndDelete(id).populate("user");

        await dblog.user.blogs.pull(dblog);

        await dblog.user.save();

        return res.status(200).send({
            success: true,
            message: "Delete Blog",
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while deleting blog data",
            error,
        });
    }

}

//get user blog container
exports.userBlogController = async (req,res)=>{

    try{

        const {id} = req.params;
        
        const userBlog = await userModel.findById(id).populate("blogs");

        if(!userBlog){
            return res.status(404).send({

                success:false,
                message:"blogs not found with this user id"

            });
        }

        return res.status(200).send({
            success:true,
            message:"user blogs",
            userBlog,
        })

    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while getting user blog data",
            error,
        });

    }

}