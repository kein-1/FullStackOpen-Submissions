import { useState } from "react";

const BlogForm = (props) => {

    const {title, author, url, setTitle,setAuthor, setUrl,addBlog} = props
    const [visible, setVisible] = useState(false)

    //Inline styles must be passed as javascript objects 
    const hideWhenVisible = {display: visible === false ? "inline-block" : "none"}
    const showWhenVisible = {display: visible === false ? "none" : "inline-block"}

    return (
      <>
        <div style={hideWhenVisible}>
          <button className="border-2 rounded-lg border-indigo-600 p-2" onClick={() => setVisible(true)}>Create a New Blog</button>
        </div>



        <div style={showWhenVisible}>
          <h2 className="text-3xl font-bold underline">Create a new blog ! </h2>
          <form onSubmit={addBlog}>
            <h3>title:
              <input type="text" value={title} placeholder="title"
                onChange={(e) => setTitle(e.target.value)}/>
            </h3>
            <h3>author:
              <input type="text" value={author} placeholder="author" onChange={(e) => setAuthor(e.target.value)}
              />
            </h3>
            <h3> url:
              <input type="text" value={url} placeholder="url" onChange={(e) => setUrl(e.target.value)}
              />
            </h3>
            <button type="submit" onClick={() => setVisible(false)}> Add New Blog </button>
          </form>
        </div>
        </>
      );

}





export default BlogForm