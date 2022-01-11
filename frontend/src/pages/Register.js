import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const { registerUser, continueGoogle } = useGlobalContext();
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });
  const { email, username, password, password2 } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div
      className="flex flex-col justify-center items-center  mt-26 space-y-5 "
      id="auth-wrapper"
    >
      <button
        onClick={() => continueGoogle(history)}
        id="google"
        className="flex border-4 border-yellow py-2 px-4 rounded-[15px] justify-center items-center space-x-2 text-2xl font-bold text-darkGrey"
      >
        <FcGoogle className="text-4xl" />
        <span>Continue with Google</span>
      </button>
      <div id="or" className="font-bold text-darkGrey text-xl ">
        or
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerUser(email, username, password, password2, history);
        }}
        className="flex flex-col justify-center w-full items-center space-y-4"
      >
        <input
          value={username}
          onChange={onChange}
          type="text"
          className="border-4 max-w-xl border-yellow font-bold w-full pt-2 py-2 px-5 rounded-[15px] font-xl"
          name="username"
          id="username"
          placeholder="Username"
        />
        <input
          value={email}
          onChange={onChange}
          type="text"
          className="border-4 border-yellow font-bold w-full max-w-xl  pt-2 py-2 px-5 rounded-[15px] font-xl"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          name="password"
          className="border-4 border-yellow pt-2 py-2 w-full max-w-xl font-bold px-5 rounded-[15px] font-xl"
          id="password"
          onChange={onChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="password2"
          value={password2}
          className="border-4 border-yellow pt-2 py-2 w-full max-w-xl font-bold px-5 rounded-[15px] font-xl"
          id="password2"
          onChange={onChange}
          placeholder="Confirm Password"
        />
        <input
          type="submit"
          className="cursor-pointer text-xl border-4 border-yellow bg-white px-4 py-2 rounded-[15px] font-bold  text-darkGrey"
          value="Register"
        />
      </form>
      <div id="signup" className="text-darkGrey">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
