import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  title: String,
  description: String,
},{timestamps:true});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
export default BlogPost;
