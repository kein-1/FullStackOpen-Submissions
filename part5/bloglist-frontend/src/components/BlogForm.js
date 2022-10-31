import { useState } from "react";

const BlogForm = (props) => {
  const { addBlog } = props;
  const [visible, setVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  //Inline styles must be passed as javascript objects
  const hideWhenVisible = {
    display: visible === false ? "inline-block" : "none",
  };
  const showWhenVisible = { display: visible === false ? "none" : "flex" };

  const addBlogMain = async (e) => {
    e.preventDefault();
    console.log("Add button clicked");
    addBlog({ title, author, url, content });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <div
        style={hideWhenVisible}
        className="mt-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      >
        <button
          className="border-2 rounded-lg border-indigo-600 p-2"
          onClick={() => setVisible(true)}
        >
          Create a New Blog
        </button>
      </div>

      <div style={showWhenVisible} className="w-9/12 mt-4 flex flex-col gap-4">
        <h2 className="text-xl underline">Create new blog </h2>

        <form
          className="flex flex-col border-2 w-full gap-y-5 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          onSubmit={addBlogMain}
        >
          <div className="flex gap-4 items-center">
            <h4 className="w-3/12">Blog Title </h4>
            <input
              className="p-1.5 w-full shadow appearance-none"
              type="text"
              value={title}
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <h4 className="w-3/12">Author</h4>
            <input
              className="p-1.5 w-full shadow appearance-none"
              type="text"
              value={author}
              placeholder="author"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <h4 className="w-3/12">URL</h4>
            <input
              className="p-1.5 w-full shadow appearance-none"
              type="text"
              value={url}
              placeholder="url"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="flex gap-4 items-center">
            <h4 className="w-3/12">Content</h4>
            <textarea
              rows="4"
              className="p-1.5 w-full shadow appearance-none min-h-60"
              value={content}
              type="text"
              placeholder="Add your thoughts.."
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="flex gap-4">
            <button
              className="border-2 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 w-full"
              type="submit"
              onClick={() => setVisible(false)}
            >
              
              Add New Blog
            </button>
            <button
              className="border-2 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 w-full"
              type="button"
              onClick={() => setVisible(false)}
            >
              
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogForm;
