

const LoginForm = (props) => {
    
    const {login,setUsername,setPassword,username,password} = props
    return (
    <>
      <h2>Log In to Your Application</h2>
      <form onSubmit={login} className="flex flex-col w-3/5 border-solid border-2 rounded-lg border-indigo-600 p-6 gap-4">
        <div className="p-1.5 flex gap-4 justify-center items-center">
          <h3>Username:</h3>
          <input className="p-1.5 w-full shadow appearance-none "
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="p-1.5 flex gap-4  justify-center items-center">
          <h3>Password:</h3>
          <input className="p-1.5 w-full shadow appearance-none " 
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="border w-full p-2 text-base rounded-lg">Log in! </button>
      </form>
    </>
    )
}

export default LoginForm

