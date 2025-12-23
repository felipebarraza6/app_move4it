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
    <ConfigProvider theme={move4iaTheme}>
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
              background: "linear-gradient(135deg, #052240 0%, #0A5FE0 50%, #0A8CCF 100%)",
              backgroundSize: "200% 200%",
              animation: "shimmer 8s infinite",
            }}
          >
            <div
              style={{
                padding: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <img
                src={logo}
                alt="Move4IA"
                style={{
                  height: "80px",
                  width: "auto",
                  maxWidth: "200px",
                  filter: "drop-shadow(0 4px 12px rgba(18, 227, 194, 0.6))",
                  objectFit: "contain",
                }}
              />
            </div>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 48, color: "#12E3C2" }}
                  spin
                />
              }
            />
            <p style={{ 
              color: "#FFFFFF", 
              fontSize: "16px", 
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}>
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
    </ConfigProvider>
  );
};

export default App;
