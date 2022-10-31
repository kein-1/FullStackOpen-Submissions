import { useState } from "react";
const LoginForm = (props) => {
  const { login, setLoginStatus } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginMain = (e) => {
    e.preventDefault();

    login({ username, password });

    //Reset the fields
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h2>Log In to Your Blogs!</h2>
      <form
        onSubmit={loginMain}
        className="flex flex-col w-2/5 border-solid border-2 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6 gap-4"
      >
        <div className="p-1.5 flex gap-4 justify-center items-center">
          <h3>Username:</h3>
          <input
            className="p-1.5 w-full shadow appearance-none "
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="p-1.5 flex gap-4  justify-center items-center">
          <h3>Password:</h3>
          <input
            className="p-1.5 w-full shadow appearance-none "
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="border w-full p-2 text-base rounded-lg hover:bg-slate-50"
        >
          Log in!
        </button>

        <button
          type="submit"
          className="border w-full p-2 text-base rounded-lg hover:bg-slate-50"
          onClick={() => setLoginStatus(true)}
        >
          Don't have an account? Register here
        </button>
      </form>
    </>
  );
};

export default LoginForm;
