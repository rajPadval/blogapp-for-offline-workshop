import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getblogs();
  }, [blogs]);

  const getblogs = async () => {
    const response = await fetch("http://localhost:5000/get-blogs");
    const data = await response.json();
    setBlogs(data);
  };

  const deleteBlog = async (id) => {
    const response = await fetch(`http://localhost:5000/delete-blog/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      alert("Blog deleted successfully");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="my-10 flex flex-col justify-center items-center gap-5">
        {blogs.map((blog, i) => {
          return (
            <div className="w-[40vw] rounded-md shadow-md p-3 relative" key={i}>
              <h3 className="text-lg font-bold">{blog.title}</h3>
              <p className="font-semibold text-gray-600 selection:bg-green-200">
                {blog.description}
              </p>
              <AiFillDelete
                className="absolute top-3 text-lg right-3 cursor-pointer text-gray-400 hover:scale-110 hover:text-red-400"
                onClick={() => deleteBlog(blog._id)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
