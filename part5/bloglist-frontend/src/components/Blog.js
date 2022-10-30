import { useState } from "react";

const Blog = (prop) => {

  //Each blog post will have a state to show the contents. This will cause react to re-render each time a change happens and it will determine what will be returned 
  const [showAll,setShowAll] = useState(false)
  const { title, author, likes } = prop;


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
      <button className="p-3 border-solid border-2 rounded-lg text-xs"onClick={() => setShowAll(false)}>Hide</button>

    </li>
  );
};

export default Blog;
