import React, { createContext, useReducer, useEffect } from "react";
import "./assets/css/App.css";
import Home from "./containers/Home";
import Login from "./containers/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authReducer } from "./reducers/auth";
import { endpoints } from "./config/endpoints";
export const AppContext = createContext();

export const updateApp = async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token") || null);
  const user = JSON.parse(localStorage.getItem("user") || null);

  if (user && token) {
    const rq = await endpoints.auth.profile().then((x) => {
      dispatch({
        type: "UPDATE",
        payload: {
          token: token,
          user: x.user,
        },
      });
    });
    return rq;
  }
};

const App = () => {
  const initialState = {
    isAuth: false,
    token: null,
    user: null,
    update: 1,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    updateApp(dispatch);
  }, [state.update]);

  console.log(state);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/profile_user",
        },
        {
          path: "/blog",
        },
        {
          path: "/profile_competition",
        },
        {
          path: "team",
        },
        {
          path: "enterprise",
        },
        {
          path: "challenges",
        },
        {
          path: "achievements",
        },
        {
          path: "global_viewer",
        },
      ],
    },
  ]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {state.isAuth ? (
        <div className="App">
          <RouterProvider router={router} />
        </div>
      ) : (
        <Login />
      )}
    </AppContext.Provider>
  );
};

export default App;
