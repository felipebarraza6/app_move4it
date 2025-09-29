import React, { createContext, useReducer, useEffect, useState } from "react";
import "./assets/css/App.css";
import Home from "./containers/Home";
import Login from "./containers/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authReducer } from "./reducers/auth";
import { endpoints } from "./config/endpoints";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "./assets/img/logo_dark.png";

export const AppContext = createContext();

export const updateApp = async (dispatch) => {
  try {
    const tokenStr = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!tokenStr || !userStr) {
      return { success: false, error: "No token or user found" };
    }

    const token = JSON.parse(tokenStr);
    const user = JSON.parse(userStr);

    if (user && token) {
      const response = await endpoints.auth.profile();
      dispatch({
        type: "UPDATE",
        payload: {
          token: token,
          user: response.user,
        },
      });
      return { success: true };
    }
  } catch (error) {
    console.error("Error updating app:", error);
    // Limpiar localStorage si hay error
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { success: false, error: error.message };
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
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      setIsInitializing(true);
      try {
        const result = await updateApp(dispatch);
        if (!result.success) {
          // Si no hay sesión válida, limpiar estado
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error("Error initializing app:", error);
        dispatch({ type: "LOGOUT" });
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
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
          path: "/documentation",
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
      {isInitializing ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <img
            src={logo}
            alt="Move4It"
            style={{
              height: "80px",
              width: "auto",
              marginBottom: "16px",
            }}
          />
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 48, color: "#1890ff" }}
                spin
              />
            }
          />
          <p style={{ color: "#666", fontSize: "16px" }}>
            Cargando tu competencia...
          </p>
        </div>
      ) : state.isAuth ? (
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
