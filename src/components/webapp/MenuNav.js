import React, { useContext } from "react";
import { Button, Flex } from "antd";
import {
  SnippetsOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import logo from "../../assets/img/logo.png";

const MenuNav = () => {
  const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      label,
      children,
      type,
    };
  }

  const onChangeOption = (item) => {
    if (item.key === "home") {
      navigate("/");
    } else if (item.key === "profile_user") {
      navigate("/profile_user");
    } else if (item.key === "blog") {
      navigate("/blog");
    } else if (item.key === "logout") {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
  };

  const items = [
    getItem(`${state.user.username}`, "profile_user", <SettingOutlined />),
    getItem("Blog", "blog", <SnippetsOutlined />),
    getItem("Salir", "logout", <LogoutOutlined />),
  ];

  return (
    <Flex
      gap="small"
      justify={window.innerWidth < 726 ? "space-between" : "end"}
      align="center"
      style={{
        background:
          "linear-gradient(169deg, rgba(15,120,142,1) 0%, rgba(122,160,168,1) 35%, rgba(60,87,93,1) 100%)",
        padding: "10px",
      }}
    >
      {window.innerWidth < 900 && (
        <img src={logo} alt="logo" style={{ width: "70px" }} />
      )}
      <Flex gap="small">
        <Button
          icon={<UserOutlined />}
          onClick={() => navigate("/profile_user")}
        >
          {window.innerWidth > 900 && state.user.username}
        </Button>

        <Button icon={<SnippetsOutlined />} onClick={() => navigate("/blog")}>
          {window.innerWidth > 900 && "Blog"}
        </Button>

        <Button
          icon={<LogoutOutlined />}
          onClick={() => {
            dispatch({ type: "LOGOUT" });
            navigate("/");
          }}
        >
          Salir
        </Button>
      </Flex>
    </Flex>
  );
};

export default MenuNav;
