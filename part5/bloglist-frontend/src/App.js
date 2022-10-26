import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import getBlogs from './services/blogs'
import loginService from './services/login'



const loginUrl = 'http://localhost:3001/api/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userToken, setToken] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    getBlogs().then(blogs =>
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
      const response = await loginService(loginUrl,{username,password})
    }
    catch {
      console.log("ERROR")
    }



  }

  const setUserHandler = (e) => {
    console.log(e.target.value)
    setUsername(e.target.value)
  }

  const setPasswordHandler = (e) => {
    console.log(e.target.value)
    setPassword(e.target.value)
  }
  
  
  if (userToken === null){
    return (
      <div>
        {loginForm()}
      </div>
    )
  }

  <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>


}

export default App
