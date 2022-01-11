import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useGlobalContext } from "../context";

const Login = () => {
  const history = useHistory();
  const { loginUser, continueGoogle } = useGlobalContext();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="flex flex-col justify-center items-center  mt-26 space-y-5 "
      id="auth-wrapper"
    >
      <button
        id="google"
        onClick={() => continueGoogle(history)}
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
          loginUser(email, password, history);
        }}
        className="flex flex-col w-full justify-center items-center space-y-4"
      >
        <input
          onChange={onChange}
          type="text"
          className="border-4 border-yellow font-bold  pt-2 py-2 px-5 max-w-xl w-full rounded-[15px] font-xl"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          type="password"
          onChange={onChange}
          name="password"
          className="border-4 border-yellow pt-2 py-2 font-bold px-5 max-w-xl w-full rounded-[15px] font-xl"
          id="password"
          placeholder="Password"
        />
        <input
          type="submit"
          className="cursor-pointer border-4 text-xl border-yellow bg-white px-4 py-2 rounded-[15px] font-bold  text-darkGrey"
          value="Log in"
        />
      </form>
      <div id="signup" className="text-darkGrey">
        No account?{" "}
        <Link to="/register" className="underline">
          Create one
        </Link>
      </div>
    </div>
  );
};

export default Login;
