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
    <Flex vertical gap="large" justify="center">
      <img src={logo} alt="logo" style={styles.logo} />
      {window.innerWidth > 900 ? (
          <Flex
          direction="row"
          vertical
          justify="center"
          style={{
            color: "white",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
          }}
        >
          {items.map((item) => (
            <Flex
              key={item.key}
              align="center"
              onClick={() => onChangeOption(item)}
              style={{
                padding: "12px",
                cursor: "pointer",
                borderRadius: "10px",
                marginTop: "8px",
                background:
                  option === item.key
                    ? "linear-gradient(135deg, rgba(10, 95, 224, 0.9) 0%, rgba(10, 140, 207, 0.8) 50%, rgba(18, 227, 194, 0.7) 100%)"
                    : "transparent",
                border:
                  option === item.key
                    ? "1px solid rgba(18, 227, 194, 0.5)"
                    : "1px solid transparent",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: option === item.key ? "0 4px 12px rgba(18, 227, 194, 0.03)" : "none",
              }}
              onMouseEnter={(e) => {
                if (option !== item.key) {
                  e.currentTarget.style.background = "rgba(10, 95, 224, 0.2)";
                  e.currentTarget.style.border = "1px solid rgba(10, 95, 224, 0.4)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }
              }}
              onMouseLeave={(e) => {
                if (option !== item.key) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.border = "1px solid transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }
              }}
            >
              {item.icon}
              <span style={{ marginLeft: "10px", fontWeight: option === item.key ? 600 : 400 }}>{item.label}</span>
            </Flex>
          ))}
        </Flex>
      ) : null}
    </Flex>
  );
};

const styles = {
  logo: {
    width: "70%",
    height: "auto",
    marginBottom: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    filter: "drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3)) brightness(1.1)",
    transition: "transform 0.3s ease",
  },
};

export default NavBar;
