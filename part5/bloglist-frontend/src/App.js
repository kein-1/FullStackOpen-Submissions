import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import getBlogs from './services/blogs'
import loginService from './services/login'



const loginUrl = 'http://localhost:3001/api/login'
const blogsUrl = 'http://localhost:3001/api/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    getBlogs(blogsUrl).then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginForm = () => (
    <>
      <h2>Log In to Your Application</h2>
      <form onSubmit={login}>
        <div>
          username: 
          <input type="text" value={username} onChange={setUserHandler}/>
        </div>
        <div>
          password: 
          <input type="text" value={password} onChange={setPasswordHandler}/>
        </div>
        <button type="submit">Log in! </button>
      </form>
    </>
  )

  const login = async (e) => {
    e.preventDefault()
    console.log("Log IN Button clicked")

    try{
      //In using POST, Axios automatically adds that object field into the body of the request object
      //In the response, this is based on what we defined in the server. So if the login is sucessful, I defined a response to consist of a json object that has the token, user, username, and userID
      //If we console.log(user), we should see all this stuff 
      //Note in Axios, we can acess the response field using the .data parameter (shown in login.js)
      //The axios api defines .data as the response returned by the server
      const user = await loginService(loginUrl,{username,password})
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log("Log IN Button clicked")

    }
    catch (error) {
      console.log(error)
      console.log(error.response.data)
      console.log("ERROR")
    }
  }

  const setUserHandler = (e) => {setUsername(e.target.value)}
  const setPasswordHandler = (e) => {setPassword(e.target.value)}
  
  
  if (user === null){
    return (
      <div>
        {loginForm()}
      </div>
    )
  }
  return (
  <div>
      <h2>Blogs by {user.username} </h2>
      <h3> {user.username} logged in </h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} id = {user.id}/>
      )}
  </div>
  )


}

export default App
