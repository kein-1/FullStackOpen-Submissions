import { useState, useEffect } from "react";
import {
  getBlogs,
  setToken,
  createBlog,
  deleteBlog,
  addLikes,
} from "./services/blogServices";

import "./index.css";
import { HiLogout } from "react-icons/hi";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";

import loginService from "./services/login";
import registrationService from "./services/registration";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [added, setAdded] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const [showError, setShowError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

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
    }
  }, []);

  //This is the function passed to our LoginForm, which has been refactored with all the relevant states to the component that controls login, which is the LoginForm we created.
  const login = async (object) => {
    console.log("Log IN Button clicked");

    //In using POST, Axios automatically adds that object field into the body of the request object
    //In the response, this is based on what we defined in the server. So if the login is sucessful, I defined a response to consist of a json object that has the token, user, username, and userID
    //If we console.log(user), we should see all this stuff
    //Note in Axios, we can acess the response field using the .data parameter (shown in login.js)
    //The axios api defines .data as the response returned by the server

    //loginService is defined in the backend. It actually uses 2 parameters but we can omit 1 of them here since the other one is defined in the backend where this function is defined
      const user = await loginService(object);
      console.log("THIS DID NOT RUN")
      console.log(user)
      //Save the response from the server to the user state
      setUser(user);
      setToken(user.token);

      //After the user successfully logsin, we want to set the current user's blogs equal to
      //a filtered list of blogs that belong to the user
      const filteredBlogs = blogs.filter((element) => element.user === user.id);
      setUserBlogs(filteredBlogs);

      //Use localstorage to save the user's blog and info. Only strings can be saved to the browser
      //So we use JSON.stringify

      window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
      window.localStorage.setItem("userBlogs", JSON.stringify(filteredBlogs));

      //DO NOT do the code below! userBlogs is updated AFTER this block of code is complete.
      //The current value of userBlogs is still an [] array because after the user logs in,
      //the userBlogs state is an empty state and it gets rendered here

      // window.localStorage.setItem("userBlogs", JSON.stringify(userBlogs));
    
    }
      
  ;

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  //Refactored the try/catch block inside the registrationService function. The function calls axios in it.
  //In there, we return a response from the server. The response is a schema that axios provides and the response schema is different for a successful axios request or an error (meaning the fields in the successful returned object are different). This depends on the status code returned.
  //This is why in our registrationService code, we returned different things but both are response objects from the server
  const register = async (userObject) => {
    try{
      const registered_user = await registrationService(userObject);
      console.log("user was registered");
      setLoginStatus(false);
      console.log(registered_user);
    } catch(error){
      console.log("bad registration");
      console.log(error.message);
      console.log(error.response.data);
      setShowError(true);
      setErrorMessage(error.response.data);
    }
  };

  //Refactored all this relevant code to the Blog Form component. Now we are only passing in this function and a few other parameters to the Blog Form Component. All the state related to adding a blog is now defined in the component itself
  const addBlog = async (blogObjectParameters) => {
    try {
      //Update the state for the latest userBlogs by creating a new array of blogs
      let new_blog = await createBlog(blogObjectParameters);
      console.log(new_blog);
      const updatedUserBlogs = [...userBlogs, new_blog];
      setUserBlogs(updatedUserBlogs);

      //After adding a blog, we need to update the local storage so when we refresh, it saves
      window.localStorage.setItem(
        "userBlogs",
        JSON.stringify(updatedUserBlogs)
      );
      setAdded(true);
    } catch (error) {
      console.log("Error!");
      console.log(error.message);
      console.log(error.response.data);
    }
  };

  

  //Run the error notifcation if sucess state becomes true. This value is set if we fail to
  //Retrieve the right user
  if (user === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        {showError === true && (
          <ErrorNotification errorMessage={errorMessage} />
        )}
        {loginStatus === false ? (
          <LoginForm
            login={login}
            setLoginStatus={setLoginStatus}
            setErrorMessage={setErrorMessage}
          />
        ) : (
          <RegistrationForm
            register={register}
            setLoginStatus={setLoginStatus}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    );
  }

  return (

    <div className="relative">
      <nav className="flex justify-between mb-8 p-8 sticky top-0 left-0 right-0 bg-slate-50">
          <h3 className="text-3xl font-bold underline">
            Blogs by {user.username}
          </h3>
          <div className="flex gap-4">
            
            <button
              onClick={logout}
              className="text-base flex items-center gap-1"
            >
              <HiLogout/> Logout 
            </button>
          </div>
      </nav>

      <div className="p-8 w-4/6 m-auto">
        {added === true && <Notification />}

        
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
        <BlogForm addBlog={addBlog} setAdded={setAdded} />
      </div>
    </div>
  );
};

export default App;
