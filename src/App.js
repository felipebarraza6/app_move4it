import React, { createContext, useReducer, useEffect, useState } from "react";
import "./assets/css/App.css";
import Home from "./containers/Home";
import Login from "./containers/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authReducer } from "./reducers/auth";
import { endpoints } from "./config/endpoints";
import { Spin, ConfigProvider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "./assets/img/logo.png";

// Move4IA Brand Theme Configuration
const move4iaTheme = {
  token: {
    colorPrimary: "#12E3C2", // Verde-Turquesa para botones primarios
    colorInfo: "#0A8CCF", // Azul Medio para secciones destacadas
    colorSuccess: "#12E3C2",
    colorWarning: "#0A8CCF",
    colorError: "#0A5FE0",
    fontFamily: "'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSizeHeading1: 48,
    fontSizeHeading2: 36,
    fontSizeHeading3: 28,
    fontSizeHeading4: 24,
    fontSizeHeading5: 20,
    borderRadius: 8,
  },
  components: {
    Button: {
      primaryColor: "#FFFFFF",
      fontWeight: 500,
    },
    Typography: {
      titleMarginBottom: "0.5em",
      titleMarginTop: "1.2em",
    },
  },
};

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

  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      setIsInitializing(true);
      try {
        const result = await updateApp(dispatch);
        if (!result.success) {
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error("Error initializing app:", error);
        dispatch({ type: "LOGOUT" });
      } finally {
        // Iniciar desvanecimiento rápido antes de ocultar
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsInitializing(false);
          }, 400); // Duración reducida
        }, 100); // Pausa mínima
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
    <ConfigProvider theme={move4iaTheme}>
      <AppContext.Provider value={{ state, dispatch }}>
        {isInitializing ? (
          <div
            className={isExiting ? "loading-screen-exit" : ""}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 9999,
              height: "100vh",
              flexDirection: "column",
              gap: "24px",
              background: "linear-gradient(135deg, #052240 0%, #0A5FE0 50%, #0A8CCF 100%)",
              backgroundSize: "200% 200%",
              animation: "shimmer 8s infinite",
            }}
          >
            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                animation: "float 4s ease-in-out infinite",
              }}
            >
              <img
                src={logo}
                alt="Move4IA"
                style={{
                  height: "120px",
                  width: "auto",
                  maxWidth: "280px",
                  filter: "brightness(0) invert(1) drop-shadow(0 8px 16px rgba(18, 227, 194, 0.4))",
                  objectFit: "contain",
                }}
              />
            </div>
            {!isExiting && (
              <>
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 32, color: "#12E3C2" }}
                      spin
                    />
                  }
                />
                <p style={{ 
                  color: "#FFFFFF", 
                  fontSize: "14px", 
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.5px",
                  opacity: 0.8,
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}>
                  Preparando tu experiencia...
                </p>
              </>
            )}
          </div>
        ) : null}
        {state.isAuth ? (
          <div className="App">
            <RouterProvider router={router} />
          </div>
        ) : !isInitializing ? (
          <Login />
        ) : null}
      </AppContext.Provider>
    </ConfigProvider>
  );
};

export default App;
