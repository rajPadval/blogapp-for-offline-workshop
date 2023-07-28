import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [editContent, setEditContent] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDesc, setUpdatedDesc] = useState("");

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

  const updateBlog = async (id) => {
    console.log(updatedDesc, updatedTitle);
    try {
      const response = await fetch(`http://localhost:5000/update-blog/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDesc,
        }),
      });
      if (response.status === 200) {
        alert("Blog updated successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="my-10 flex flex-col justify-center items-center gap-5">
        {blogs.map((blog, i) => {
          return (
            <div className="w-[40vw] rounded-md shadow-md p-3 " key={i}>
              <div className="flex gap-3 justify-end">
                <AiFillDelete
                  title="Delete"
                  className="  text-lg  cursor-pointer text-gray-400 hover:scale-110 hover:text-red-400"
                  onClick={() => deleteBlog(blog._id)}
                />

                <MdOutlineModeEdit
                  className={`text-lg cursor-pointer text-gray-400 hover:scale-110 hover:text-red-400 ${
                    editContent ? "text-red-400 scale-110" : "text-gray-400"
                  }}`}
                  title="Edit"
                  onClick={() => {
                    setEditContent(!editContent);
                    setSelectedPost(blog._id);
                  }}
                />
              </div>

              <h3
                className="text-lg font-bold my-2 outline-none focus:bg-gray-100"
                contentEditable={editContent}
                onInput={(e) => setUpdatedTitle(e.target.innerText)}
              >
                {blog.title}
              </h3>
              <p
                className="font-semibold text-gray-600 selection:bg-green-200 focus:bg-gray-100 outline-none"
                contentEditable={editContent}
                onInput={(e) => setUpdatedDesc(e.target.innerText)}
              >
                {blog.description}
              </p>
              <button
                onClick={() => {
                  updateBlog(blog._id);
                  setEditContent(!editContent);
                }}
                className={`${
                  selectedPost === blog._id && editContent ? "block" : "hidden"
                } bg-purple-300 hover:bg-purple-600 my-2 text-white px-3 py-1 rounded-md`}
              >
                Save
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
