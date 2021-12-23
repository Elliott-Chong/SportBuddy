const initialState = {
  search: "",
  alerts: [],
  user: null,
  listings: [],
  listing: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
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
      return { ...state, listing: payload };
    case "SET_LISTINGS":
      return { ...state, listings: payload };
    case "SET_SEARCH":
      return { ...state, search: payload };
    case "SET_ALERT":
      let newAlerts = state.alerts;
      newAlerts.push({ id: payload.id, type: payload.type, msg: payload.msg });
      return {
        ...state,
        alerts: newAlerts,
      };
    case "REMOVE_ALERT":
      let newAlertss = state.alerts.filter((alert) => alert.id !== payload.id);
      return { ...state, alerts: newAlertss };
    case "SET_USER":
      return { ...state, user: payload, listing: null };
    case "CLEAR_USER":
      return { ...state, user: null, listing: null, listings: null };
    default:
      return state;
  }
};

export { initialState, reducer };
