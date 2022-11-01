import { useState } from "react";
const Blog = (props) => {
  const {
    title,
    author,
    likes,
    addLikes,
    id,
    content,
    userBlogs,
    setUserBlogs,
    deleteBlog,
  } = props;

  //Each blog post will have a state to show the contents. This will cause react to re-render each time a change happens and it will determine what will be returned
  const [showAll, setShowAll] = useState(false);

  const addLikesHandle = async () => {
    const updatedPost = {
      likes: likes + 1,
    };
    //Returned response object from our backend. I set it up so the response is the object from our database
    try {
      const updatedBlog = await addLikes(id, updatedPost);

      //Update the current user blogs with the new likes by using map to create a new array of blogs. If the current element id is our old element, we replace it with the new one
      let newBlogs = userBlogs.map((element) => {
        if (element.id !== updatedBlog.id) return element;
        return updatedBlog;
      });

      localStorage.setItem("userBlogs", JSON.stringify(newBlogs));
      console.log("past local storage");
      setUserBlogs(newBlogs);
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
    }
  };

  //Delete the post. Should add a try/catch block with status codes here
  const deleteBlogHandle = async () => {
    if (window.confirm(`Delete ${title} blog?`) === true) {
      try {
        await deleteBlog(id);
        const newBlogs = userBlogs.filter((element) => element.id !== id);
        console.log(newBlogs);
        setUserBlogs(newBlogs);
        localStorage.setItem("userBlogs", JSON.stringify(newBlogs));
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data);
      }
    }
  };

  if (!showAll) {
    return (
      <li className="border-solid shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 rounded-lg space-y-1">
        <h2 className="font-normal">{title}</h2>
        <button
          className="p-3 border-solid border-2 rounded-lg text-xs"
          onClick={() => setShowAll(true)}
        >
          More info
        </button>
      </li>
    );
  }

  return (
    <li className="border-solid shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 rounded-lg">
      <h2 className="font-normal">{title}</h2>
      <h3 className="font-normal"> By: {author}</h3>
      <p className="font-light my-10">{content}</p>
      <h4> {likes} Likes</h4>
      <div className="flex justify-between mt-4">
        <button
          className="p-3 border-solid border-2 rounded-lg text-xs"
          onClick={addLikesHandle}
        >
          Add likes
        </button>
        <div className="space-x-4">
          <button
            className="p-3 border-solid border-2 rounded-lg text-xs"
            onClick={() => setShowAll(false)}
          >
            Hide
          </button>
          <button
            className="p-3 border-solid border-2 rounded-lg text-xs"
            onClick={deleteBlogHandle}
          >
            Delete Blog Post
          </button>
        </div>
      </div>
    </li>
  );
};

export default Blog;
