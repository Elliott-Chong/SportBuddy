import React from "react";
import Listings from "../components/Listings";
import { withRouter } from "react-router-dom";
import { useGlobalContext } from "../context";

const MainPage = () => {
  const { loadUser } = useGlobalContext();
  React.useEffect(() => loadUser(), [loadUser]);
  return <Listings />;
};

export default withRouter(MainPage);
