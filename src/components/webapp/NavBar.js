import React, { useState, useEffect } from "react";
import { Typography, Flex } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo_dark.png";
import {
  UserOutlined,
  TrophyOutlined,
  TeamOutlined,
  HomeFilled,
  HomeOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const NavBar = () => {
  const [option, setOption] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const onChangeOption = (item) => {
    navigate(`/${item.key}`);
  };

  const items = [
    { label: "Inicio", key: "", icon: <HomeFilled /> },
    {
      label: " Perfil",
      key: "profile_competition",
      icon: <UserOutlined />,
    },
    { label: "Equipo", key: "team", icon: <TeamOutlined /> },
    { label: "Competencia", key: "enterprise", icon: <TrophyOutlined /> },
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
    <Flex vertical gap="large" align="top">
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
                backgroundColor:
                  option === item.key ? "#595959" : "transparent",
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
