const initialState = {
  alerts: [],
  user: null,
  loading: false,
  listings: [],
  token: localStorage.getItem("token"),
  search: { query: "", type: "both" },
  listing: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: { ...state.search, [payload.name]: payload.value },
      };
    case "START_LOADING":
      return { ...state, loading: true };
    case "JOIN_ROOM":
      let newJoined = state.listing.peopleJoined;
      newJoined.push(state.user);
      let newListing = state.listing;
      newListing.peopleJoined = newJoined;
      return { ...state, listing: newListing };
    case "LEAVE_ROOM":
      let newJoined1 = state.listing.peopleJoined.filter((person) => {
        return person._id !== state.user._id;
      });
      let newListing1 = state.listing;
      newListing1.peopleJoined = newJoined1;
      return { ...state, listing: newListing1 };
    case "SET_LISTING":
      return { ...state, listing: payload, search: "" };
    case "CLEAR_SEARCH":
      return { ...state, search: { query: "", type: "both" } };
    case "SET_LISTINGS":
      return {
        ...state,
        listings: payload,
        loading: false,
      };

    case "ADD_CHAT":
      let newChat = state.listing.chat;
      newChat.push({ user: payload.user, message: payload.message });
      let copyListing = state.listing;
      copyListing.chat = newChat;
      return { ...state, listing: copyListing };
    case "SET_ALERT":
      let newAlerts = state.alerts;
      window.scrollTo({ top: 0, behavior: "smooth" });
      newAlerts.push({ id: payload.id, type: payload.type, msg: payload.msg });
      return {
        ...state,
        alerts: newAlerts,
      };
    case "REMOVE_ALERT":
      let newAlertss = state.alerts.filter((alert) => alert.id !== payload.id);
      return { ...state, alerts: newAlertss };
    case "SET_TOKEN":
      localStorage.setItem("token", payload);
      return { ...state, token: payload };
    case "SET_USER":
      return { ...state, user: payload, listing:null};
    case "CLEAR_USER":
      localStorage.removeItem("token");
      return { ...state, user: null, listing: null, token: null };
    default:
      return state;
  }
};

export { initialState, reducer };
