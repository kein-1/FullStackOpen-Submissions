import { useState } from "react";

const Blog = (props) => {


  console.log("in a blog post")


  const { title, author, likes, addLikes, id, userBlogs,setUserBlogs} = props

  //Each blog post will have a state to show the contents. This will cause react to re-render each time a change happens and it will determine what will be returned 
  const [showAll,setShowAll] = useState(false)


  const addLikesMain = async () => {
    
    const updatedPost = {
      likes: likes+1,
    }
    //Returned response object from our backend. I set it up so the response is the object from our database 
    const updatedBlog = await addLikes(id,updatedPost)
    console.log(userBlogs)

    //Update the current user blogs with the new likes by using map to create a new array of blogs. If the current element id is our old element, we replace it with the new one 
    let newBlogs = userBlogs.map(element => {
      if (element.id !== id) return element
      return updatedBlog
    })
    console.log(newBlogs) 
    setUserBlogs(newBlogs)
    localStorage.setItem("userBlogs", JSON.stringify(newBlogs))
  }


  if (!showAll){
    return (
      <li className="border-solid shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 rounded-lg space-y-1">
      <h2>{title}</h2> 
      <button className="p-3 border-solid border-2 rounded-lg text-xs"onClick={() => setShowAll(true)}>More info</button>
    </li>
    )
  }

  return (
    <li className="border-solid shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 rounded-lg space-y-1">
      <h2>{title}</h2>
      <h3> By: {author}</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <h3> Likes: {likes}</h3>
      <div>
        <button className="p-3 border-solid border-2 rounded-lg text-xs" onClick={addLikesMain}> Add likes </button>
        <button className="p-3 border-solid border-2 rounded-lg text-xs" onClick={() => setShowAll(false)}>Hide</button>
      </div>
    </li>
  );
};

export default Blog;
