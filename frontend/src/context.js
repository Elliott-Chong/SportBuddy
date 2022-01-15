import axios from "axios";
import React, { createContext, useContext, useCallback } from "react";
import { initialState, reducer } from "./reducer";
import querystring from "querystring";
import { v4 } from "uuid";
const production = process.env.REACT_APP_PRODUCTION==='true';
const AppContext = createContext();
function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: !production
      ? `http://localhost:5001/api/auth/google/redirect`
      : `https://elliott-project.com/api/auth/google/redirect`,
    client_id:
      "156550196074-7ncak1iud208pk8lm8fokfd42d6kp56e.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  return `${rootUrl}?${querystring.stringify(options)}`;
}

const Context = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => console.log(state), [state]);

  const loadUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
      } else {
        delete axios.defaults.headers.common["x-auth-token"];
      }
      const response = await axios.get("/api/auth/user");
      dispatch({ type: "SET_USER", payload: response.data });
    } catch (error) {
      dispatch({ type: "CLEAR_USER" });
    }
  }, []);

  const deleteListing = async (id, history) => {
    try {
      if (!window.confirm("Are you sure? This action cannot be undone."))
        return;
      await axios.delete(`/api/listing/${id}`);
      history.push("/");
      setAlert("success", "Post Deleted!");
    } catch (error) {
      console.log(error.response);
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
    }
  };

  const searchFunc = async (query, type) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const body = JSON.stringify({ query, type });
      dispatch({ type: "START_LOADING" });
      const response = await axios.post("/api/listing/search", body, config);
      dispatch({ type: "SET_LISTINGS", payload: response.data });
    } catch (error) {
      console.log(error.response);
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
    }
  };

  const continueGoogle = async (history) => {
    try {
      const win = window.open(getGoogleAuthURL());
      if (win) {
        let timer = setInterval(() => {
          if (win.closed) {
            history.push("/");
            if (timer) clearInterval(timer);
          }
        }, 50);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setAlert = (type, msg) => {
    const id = v4();
    dispatch({
      type: "SET_ALERT",
      payload: { type, msg, id },
    });
    setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: { id } }), 2000);
  };
  // Authenticate User
  const loginUser = async (email, password, history) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ email, password });
    try {
      const response = await axios.post("/api/auth/login", body, config);
      dispatch({ type: "SET_TOKEN", payload: response.data.token });
      history.push("/");
    } catch (error) {
      if (error.response.status === 401) {
        return setAlert("danger", "Invalid Credentials");
      }
      console.log(error.response);
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      console.error(error);
    }
  };

  const logout = () => {
    dispatch({ type: "CLEAR_USER" });
    setAlert("success", "Logged Out!");
  };
  const registerUser = async (
    email,
    username,
    password,
    password2,
    history
  ) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ email, username, password, password2 });
    try {
      const response = await axios.post("/api/auth/register", body, config);
      setAlert("success", "Account Created!");
      dispatch({ type: "SET_TOKEN", payload: response.data.token });
      loadUser();
      history.push("/login");
    } catch (error) {
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      console.error(error);
    }
  };

  const fetchListings = useCallback(async () => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await axios.get("/api/listing");
      dispatch({ type: "SET_LISTINGS", payload: response.data });
    } catch (error) {
	    console.log(error.response)
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      console.error(error);
    }
  }, []);

  const fetchSingleListing = useCallback(async (id) => {
    try {
      const response = await axios.get(`/api/listing/${id}`);
      dispatch({ type: "SET_LISTING", payload: response.data });
    } catch (error) {
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      console.error(error);
    }
  }, []);

  const joinRoom = async (id) => {
    try {
      const response = await axios.get(`/api/listing/join/${id}`);
      if (response.data === "remove") {
        dispatch({ type: "LEAVE_ROOM" });
        setAlert("success", "Left");
      } else {
        dispatch({ type: "JOIN_ROOM" });
        setAlert("success", "Joined!");
      }
    } catch (error) {
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      console.error(error);
    }
  };

  const enter = async (message, socket) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const body = JSON.stringify({ message });
      const response = await axios.post(
        `/api/listing/chat/${state.listing._id}`,
        body,
        config
      );

      if (!message) return;

      socket.emit("new message", {
        user: response.data.user,
        message: message,
      });
    } catch (error) {
      console.log(error.response);
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      console.error(error);
    }
  };

  const createListing = async (
    location,
    date,
    sport,
    slotsLeft,
    remarks,
    history
  ) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({
      location,
      date,
      sport,
      slotsLeft,
      remarks,
    });
    try {
      await axios.post("/api/listing", body, config);
      history.push("/");
      setAlert("success", "Listing Created!");
    } catch (error) {
      console.log(error.response);
      error.response.data.errors.forEach((error) => {
        setAlert("danger", error.msg);
      });
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        fetchListings,
        createListing,
        registerUser,
        fetchSingleListing,
        loadUser,
        joinRoom,
        logout,
        loginUser,
        enter,
        state,
        searchFunc,
        deleteListing,
        dispatch,
        setAlert,
        continueGoogle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export default Context;
export { useGlobalContext };
