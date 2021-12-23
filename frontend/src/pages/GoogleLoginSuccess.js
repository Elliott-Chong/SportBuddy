import React from "react";

const GoogleLoginSuccess = () => {
  React.useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);
  return (
    <div className="max-h-56 flex justify-center text-2xl items-center">
      <h1>Thanks for logging in with Google! Redirecting you back now...</h1>
    </div>
  );
};

export default GoogleLoginSuccess;
