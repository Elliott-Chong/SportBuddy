import React from "react";
import { Redirect, Route } from "react-router";
import { useGlobalContext } from "../context";

const PrivateRoute = ({ path, component: Component }) => {
  const {
    loadUser,
    state: { user },
  } = useGlobalContext();
  React.useEffect(() => loadUser(), [loadUser]);
  console.log("i am in private route now");
  user ? console.log("user allowe") : console.log("not allowed");
  return (
    <Route
      path={path}
      exact
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login"></Redirect>
      }
    />
  );
};

export default PrivateRoute;
