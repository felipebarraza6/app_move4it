import React, { useState, useEffect, useContext } from "react";
import { Flex } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { AppContext } from "../../App";
import {
  UserOutlined,
  TrophyOutlined,
  TeamOutlined,
  DatabaseOutlined,
  DashboardFilled,
} from "@ant-design/icons";

const NavBar = () => {
  const [option, setOption] = useState(null);
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const onChangeOption = (item) => {
    navigate(`/${item.key}`);
  };

  const items = [
    { label: "Dashboard", key: "", icon: <DashboardFilled /> },
    {
      label: "Perfil",
      key: "profile_competition",
      icon: <UserOutlined />,
    },
    { label: "Equipo", key: "team", icon: <TeamOutlined /> },
    { label: "Competencia", key: "enterprise", icon: <TrophyOutlined /> },
    ...(state.user && state.user.type_user === "ADM"
      ? [
          {
            label: "Visualizador Global",
            key: "global_viewer",
            icon: <DatabaseOutlined />,
          },
        ]
      : []),
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const selectedItem = items.find((item) => `/${item.key}` === currentPath);
    if (selectedItem) {
      setOption(selectedItem.key);
    } else {
      setOption(null);
    }
  }, [location.pathname]);

  return (
    <Flex vertical gap="small" justify="center" style={{ padding: "12px 0" }}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="logo" style={styles.logo} />
      </div>
      {window.innerWidth > 900 ? (
          <Flex
          direction="row"
          vertical
          justify="center"
          style={{
            color: "white",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
        >
          {items.map((item) => (
            <Flex
              key={item.key}
              align="center"
              onClick={() => onChangeOption(item)}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                borderRadius: "6px",
                margin: "2px 0",
                background: option === item.key 
                  ? "rgba(18, 227, 194, 0.15)" 
                  : "transparent",
                borderLeft: option === item.key 
                  ? "4px solid #12E3C2" 
                  : "4px solid transparent",
                transition: "all 0.3s ease",
                opacity: option === item.key ? 1 : 0.7,
              }}
              onMouseEnter={(e) => {
                if (option !== item.key) {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (option !== item.key) {
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <span style={{ 
                fontSize: "16px", 
                display: "flex", 
                alignItems: "center",
                color: option === item.key ? "#12E3C2" : "white",
              }}>
                {item.icon}
              </span>
              <span style={{ 
                marginLeft: "12px", 
                fontSize: "12px",
                fontWeight: option === item.key ? 700 : 400,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: option === item.key ? "#12E3C2" : "white",
              }}>
                {item.label}
              </span>
            </Flex>
          ))}
        </Flex>
      ) : null}
    </Flex>
  );
};

const styles = {
  logoContainer: {
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    perspective: "1000px",
  },
  logo: {
    width: "75%",
    height: "auto",
    filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    animation: "floatSlow 4s ease-in-out infinite",
  },
};

export default NavBar;
