const initialState = {
  search: "",
  alerts: [],
  user: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
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
      return { ...state, user: payload };
    case "CLEAR_USER":
      return { ...state, user: null };
    default:
      return state;
  }
};

export { initialState, reducer };
