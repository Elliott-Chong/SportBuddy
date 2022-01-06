import React from "react";

const GoogleLoginSuccess = ({ match }) => {
  const token = match.params.token;
  React.useEffect(() => {
    localStorage.setItem("token", token);
    setTimeout(() => {
      window.close();
    }, 1000);
  }, [token]);
  return (
    <div className="max-h-56 flex justify-center text-2xl items-center">
      <h1>Thanks for logging in with Google! Redirecting you back now...</h1>
    </div>
  );
};

export default GoogleLoginSuccess;
