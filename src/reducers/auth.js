export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.access_token)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      
      return {
        ...state,
        isAuth: true,
        token: action.payload.access_token,
        user: action.payload.user,
      };

    case "UPDATE":
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
      };

    case "SET_ACTIVITIES":

      return {
        ...state,
        dashboard: { ...state.dashboard,activities: action.payload },
      };

    case "SET_STATS_USER":
      return {
        ...state,
        dashboard: { ...state.dashboard, stats_personal: action.payload },
      };

    
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
};
