import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlogs = () => {
  const navigate = useNavigate();

  const postBlog = async (e) => {

    e.preventDefault();

    const blog = {
      title: e.target.title.value,
      description: e.target.description.value,
    };

    const res = await fetch("http://localhost:5000/post-blog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    if (res.status === 200) {
      toast.success("Blog posted successfully");
      e.target.title.value = "";
      e.target.description.value = "";
      setTimeout(() => navigate("/"), 2000);
    } else {
      toast.error("Some error occured");
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-10  w-[60vw] mx-auto rounded-md">
        <h1 className="text-2xl font-bold text-center">Create Blogs</h1>
        <form onSubmit={postBlog} className="flex flex-col">
          <label htmlFor="title" className="text-lg font-semibold">
            Title :{" "}
          </label>
          <input
            type="text"
            name="title"
            id=""
            placeholder="Enter the blog title"
            className="border-2 rounded-md p-2 my-2 outline-none focus:border-purple-300"
          />
          <label htmlFor="name" className="text-lg font-semibold">
            Description :{" "}
          </label>
          <textarea
            name="description"
            className="border-2 rounded-md p-2 my-2 outline-none focus:border-purple-300"
            rows={10}
          />
          <button
            type="submit"
            className="bg-purple-300  px-3 py-2 hover:bg-purple-500 text-white font-bold text-lg rounded-md"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlogs;
