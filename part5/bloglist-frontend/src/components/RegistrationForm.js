import { useState } from "react";

const RegistrationForm = (props) => {
  const { setLoginStatus, register, setErrorMessage } = props;

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const registrationHandler = (e) => {
    e.preventDefault()
    register({username,name,password})
  }

  const formControlHandler = () => {
    setLoginStatus(false)
    setErrorMessage(false)
  }

  return (
    <>
      <h2>Register a new account </h2>
      <form onSubmit={registrationHandler} className="flex flex-col w-2/5 border-solid border-2 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6 gap-4">
        <div className="p-1.5 flex gap-4 justify-center items-center">
          <h4 className="w-3/12">Username </h4>
          <input
            className="p-1.5 w-full shadow appearance-none  hover:outline-blue-400"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="p-1.5 flex gap-4 justify-center items-center">
          <h4 className="w-3/12">Name </h4>
          <input
            className="p-1.5 w-full shadow appearance-none  hover:outline-blue-400 "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="p-1.5 flex gap-4  justify-center items-center">
          <h4 className="w-3/12">Password </h4>
          <input
            className="p-1.5 w-full shadow appearance-none  hover:outline-blue-400"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="border w-full p-2 text-base rounded-lg hover:bg-slate-50"
        >
          Register!
        </button>

        <button
          type="button"
          className="border w-full p-2 text-base rounded-lg hover:bg-slate-50"
          onClick={formControlHandler}
        >
          Already have an account? Login Here
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
