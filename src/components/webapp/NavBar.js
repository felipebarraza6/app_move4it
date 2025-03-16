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
            borderRadius: "10px",
            backdropFilter: "blur(10px)", // Add backdrop filter for blurring effect
          }}
        >
          {items.map((item) => (
            <Flex
              key={item.key}
              align="center"
              onClick={() => onChangeOption(item)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderRadius: "10px",
                marginTop: "10px",
                backgroundColor: option === item.key ? "black" : "transparent",
                background:
                  option === item.key
                    ? "linear-gradient(169deg, rgba(15,120,142,0.5) 0%, rgba(77,180,202,0.2217480742296919) 100%, rgba(60,87,93,1) 100%)"
                    : "transparent",
                transition: "background-color 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(169deg, rgba(15,120,142,0.5) 0%, rgba(77,180,202,0.2217480742296919) 100%, rgba(60,87,93,1) 100%)";
              }}
              onMouseLeave={(e) => {
                if (option !== item.key) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {item.icon}
              <span style={{ marginLeft: "10px" }}>{item.label}</span>
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
  },
};

export default NavBar;
