import express from "express";
import cors from "cors";
import { connectDb } from "./connection.js";
import BlogPost from "./models/BlogPost.js";
const app = express();
const port = 5000;

connectDb();

app.use(express.json());
app.use(cors());

app.get("/get-blogs", async (req, res) => {
  const blogs = await BlogPost.find();
  if (!blogs) {
    res.status(404).json({ message: "No blogs found!" });
  }
  res.status(200).json(blogs);
});

app.post("/post-blog", async (req, res) => {
  console.log(req.body.title, req.body.description);
  const blog = new BlogPost({
    title: req.body.title,
    description: req.body.description,
  });
  await blog.save();
  res.status(200).json({ message: "Blog posted successfully!" });
});

app.delete("/delete-blog/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await BlogPost.findByIdAndDelete(id);
  if (!blog) {
    res.json(404).json("Blog doesn't exist!");
  } else {
    res.status(200).json({ message: "Blog deleted successfully!" });
  }
});

app.listen(port, () =>
  console.log(`Server runing sucessfully on port ${port}`)
);
