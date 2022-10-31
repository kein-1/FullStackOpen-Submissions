import { useState, useEffect } from "react";
import {
  getBlogs,
  setToken,
  createBlog,
  deleteBlog,
  addLikes,
} from "./services/blogServices";
import "./index.css";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";

import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [latestBlog, setLatestBlog] = useState("");
  const [added, setAdded] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const [success, setSucess] = useState(null);

  useEffect(() => {
    getBlogs().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    //Returns the item that is stored as the key we used
    const loggedInUser = localStorage.getItem("loggedInBlogUser");
    const userBlogs = localStorage.getItem("userBlogs");

    if (loggedInUser) {
      //Parse here retrieves the DOM string that is saved to the browser and converts it to JavaScript Object
      const retrievedUser = JSON.parse(loggedInUser);
      const retrievedUserBlogs = JSON.parse(userBlogs);
      console.log(retrievedUserBlogs);
      setUser(retrievedUser);
      setToken(retrievedUser.token);
      setUserBlogs(retrievedUserBlogs);
      setLatestBlog(retrievedUserBlogs.at(-1).id);
    }
  }, []);

  //This is the function passed to our LoginForm, which has been refactored with all the relevant states to the component that controls login, which is the LoginForm we created.
  const login = async (object) => {
    console.log("Log IN Button clicked");

    try {
      //In using POST, Axios automatically adds that object field into the body of the request object
      //In the response, this is based on what we defined in the server. So if the login is sucessful, I defined a response to consist of a json object that has the token, user, username, and userID
      //If we console.log(user), we should see all this stuff
      //Note in Axios, we can acess the response field using the .data parameter (shown in login.js)
      //The axios api defines .data as the response returned by the server

      //loginService is defined in the backend. It actually uses 2 parameters but we can omit 1 of them here since the other one is defined in the backend where this function is defined
      const user = await loginService(object);

      //Save the response from the server to the user state
      setUser(user);
      setToken(user.token);

      //After the user successfully logsin, we want to set the current user's blogs equal to
      //a filtered list of blogs that belong to the user
      const filteredBlogs = blogs.filter((element) => element.user === user.id);

      setUserBlogs(filteredBlogs);

      //Save the latest blog's id to this state. This is based on the user's current list of blogs
      setLatestBlog(filteredBlogs.at(-1).id);

      //Use localstorage to save the user's blog and info. Only strings can be saved to the browser
      //So we use JSON.stringify

      window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
      window.localStorage.setItem("userBlogs", JSON.stringify(filteredBlogs));

      //DO NOT do the code below! userBlogs is updated AFTER this block of code is complete.
      //The current value of userBlogs is still an [] array because after the user logs in,
      //the userBlogs state is an empty state and it gets rendered here

      // window.localStorage.setItem("userBlogs", JSON.stringify(userBlogs));
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log("ERROR");
      setSucess(true);
    }
  };

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  //Refactored all this relevant code to the Blog Form component. Now we are only passing in this function and a few other parameters to the Blog Form Component. All the state related to adding a blog is now defined in the component itself
  const addBlog = async (blogObjectParameters) => {
    try {
      const response = await createBlog(blogObjectParameters);
      console.log(`Front end`);
      console.log(response);

      //Update the state for the latest userBlogs by creating a new array of blogs
      const updatedUserBlogs = [...userBlogs, response];
      setUserBlogs(updatedUserBlogs);
      setLatestBlog(response.id);

      //After adding a blog, we need to update the local storage so when we refresh, it saves
      window.localStorage.setItem(
        "userBlogs",
        JSON.stringify(updatedUserBlogs)
      );

      setAdded(true);
    } catch (error) {
      console.log("ERROR");
      console.log(error);
      console.log(error.response.data);
    }
  };

  const deleteLatest = async () => {
    try {
      if (latestBlog.length !== 0) {
        const response = await deleteBlog(latestBlog);
        console.log(`in resposne frontend ${response}`);
        //This means successful deletion
        if (response.status === 204) {
          const updatedUserBlogs = userBlogs.filter(
            (element) => element.id !== latestBlog
          );

          console.log(updatedUserBlogs);
          setUserBlogs(updatedUserBlogs);
          setLatestBlog(updatedUserBlogs.at(-1).id);

          //After deleting a blog, we need to update the local storage so when we refresh, it saves
          window.localStorage.setItem(
            "userBlogs",
            JSON.stringify(updatedUserBlogs)
          );
        }
      }
    } catch (error) {
      console.log("DELETION ERROR");
      console.log(error);
    }
  };

  //Run the error notifcation if sucess state becomes true. This value is set if we fail to
  //Retrieve the right user
  if (user === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        {success === true && <ErrorNotification />}
        {loginStatus === false ? (
          <LoginForm login={login} setLoginStatus={setLoginStatus} />
        ) : (
          <RegistrationForm setLoginStatus={setLoginStatus} />
        )}
      </div>
    );
  }

  return (
    <div className="p-8 w-4/6 m-auto">
      {added === true && <Notification />}

      <nav className="flex justify-between mb-8">
        <h3 className="text-3xl font-bold underline">
          Blogs by {user.username}
        </h3>
        <div className="flex gap-4">
          <button
            className="border-2 rounded-lg border-indigo-600 p-2"
            onClick={deleteLatest}
          >
            Delete latest blog
          </button>

          <button
            onClick={logout}
            className="border-2 rounded-lg border-indigo-600 p-2"
          >
            logout
          </button>
        </div>
      </nav>
      <ul className="list-none space-y-6 list-inside">
        {userBlogs.map((element) => (
          <Blog
            key={element.id}
            {...element}
            addLikes={addLikes}
            userBlogs={userBlogs}
            setUserBlogs={setUserBlogs}
            deleteBlog={deleteBlog}
          />
        ))}
      </ul>
      {/* <BlogForm title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} addBlog={addBlog}/> */}
      <BlogForm addBlog={addBlog} setAdded={setAdded} />
    </div>
  );
};

export default App;
