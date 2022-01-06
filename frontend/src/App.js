import "./App.css";
import React from "react";
// import data from "./facilities_data";
import { useGlobalContext } from "./context";
import Navbar from "./components/Navbar.js";
// import Listings from "./components/Listings.js";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import GoogleLoginSuccess from "./pages/GoogleLoginSuccess";
import SingleListing from "./pages/SingleListing";
import CreateListing from "./pages/CreateListing";

function App() {
  const {
    state: { alerts, user },
  } = useGlobalContext();
  return (
    <>
      <Navbar />
      {alerts.length > 0 && (
        <>
          {alerts.map((alert) => {
            return (
              <div
                key={alert.id}
                id={`alert-${alert.type}`}
                className="relative top-40 text-center mb-2 md:mx-96 mx-10 py-4 text-white rounded-xl px-6 font-bold text-xl"
              >
                {alert.msg}
              </div>
            );
          })}
        </>
      )}
      <main className="p-8 md:px-20 px-5 relative top-40 ">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route
            path="/login"
            exact
            render={() => (user ? <MainPage /> : <Login />)}
          />
          <Route
            path="/google/success/:token"
            exact
            component={GoogleLoginSuccess}
          ></Route>
          <Route
            path="/register"
            exact
            render={() => (user ? <MainPage /> : <Register />)}
          />
          <PrivateRoute path="/listing/:id" exact component={SingleListing} />
          <PrivateRoute path="/create" exact component={CreateListing} />
          <PrivateRoute path="/chat/:id" exact component={Chat} />
        </Switch>
      </main>
    </>
  );
}

export default App;
