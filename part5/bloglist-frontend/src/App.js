import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import {
  getBlogs,
  setToken,
  createBlog,
  deleteBlog,
} from "./services/blogServices";
import loginService from "./services/login";

// const loginUrl = 'http://localhost:3001/api/login'
// const blogsUrl = 'http://localhost:3001/api/blogs'

const loginUrl = "https://4rjbcc-3001.preview.csb.app/api/login";
const blogsUrl = "https://4rjbcc-3001.preview.csb.app/api/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [latestBlog, setLatestBlog] = useState("");

  useEffect(() => {
    getBlogs(blogsUrl).then((blogs) => setBlogs(blogs));
  }, []);
  const loginForm = () => (
    <>
      <h2>Log In to Your Application</h2>
      <form onSubmit={login}>
        <div>
          username:
          <input type="text" value={username} onChange={setUserHandler} />
        </div>
        <div>
          password:
          <input type="text" value={password} onChange={setPasswordHandler} />
        </div>
        <button type="submit">Log in! </button>
      </form>
    </>
  );

  const blogForm = () => {
    return (
      <>
        <h2>Create a new blog ! </h2>
        <form onSubmit={addBlog}>
          <h3>
            title:{" "}
            <input
              type="text"
              value={title}
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </h3>
          <h3>
            author:{" "}
            <input
              type="text"
              value={author}
              placeholder="author"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </h3>
          <h3>
            url:{" "}
            <input
              type="text"
              value={url}
              placeholder="url"
              onChange={(e) => setUrl(e.target.value)}
            />
          </h3>
          <button type="submit"> Create a blog! </button>
        </form>
      </>
    );
  };

  const login = async (e) => {
    e.preventDefault();
    console.log("Log IN Button clicked");

    try {
      //In using POST, Axios automatically adds that object field into the body of the request object
      //In the response, this is based on what we defined in the server. So if the login is sucessful, I defined a response to consist of a json object that has the token, user, username, and userID
      //If we console.log(user), we should see all this stuff
      //Note in Axios, we can acess the response field using the .data parameter (shown in login.js)
      //The axios api defines .data as the response returned by the server
      const user = await loginService(loginUrl, { username, password });
      console.log(user);

      //Save the response from the server to the user state
      setUser(user);
      setToken(user.token);

      //Reset the fields
      setUsername("");
      setPassword("");

      //After the user successfully logsin, we want to set the current user's blogs equal to
      //a filtered list of blogs that belong to the user
      const filteredBlogs = blogs.filter((element) => element.user === user.id);
      setUserBlogs(filteredBlogs);

      //Save the latest blog's id to this state. This is based on the user's current list of blogs
      setLatestBlog(filteredBlogs[filteredBlogs.length - 1].id);

      console.log("Log IN Button clicked");
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      console.log("ERROR");
    }
  };

  const addBlog = async (e) => {
    e.preventDefault();
    console.log("Add button clicked");

    try {
      const response = await createBlog(blogsUrl, { title, author, url });
      console.log(`Front end`);
      console.log(response);
      setTitle("");
      setAuthor("");
      setUrl("");
      setLatestBlog(response.id);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      console.log("ERROR");
    }
  };

  const setUserHandler = (e) => {
    setUsername(e.target.value);
  };
  const setPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  
  //Fix this when i get home 
  const deleteLatest = async (blogId) => {
    if (latestBlog.length === 0) {
    }
    const response = await deleteBlog(blogsUrl + `/${latestBlog}`);
  };

  if (user === null) {
    return <div>{loginForm()}</div>;
  }

  return (
    <div>
      <h2>Blogs by {user.username} </h2>
      <h3> {user.username} logged in </h3>
      {userBlogs.map((element) => <Blog key={element.id} {...element} />}
      {blogForm()}
      <button onClick={deleteLatest}> Delete latest blog </button>
    </div>
  );
};

export default App;
