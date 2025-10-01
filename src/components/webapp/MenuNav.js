import React, { useContext } from "react";
import { Button, Flex, Popconfirm } from "antd";
import {
  SnippetsOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
  BookOutlined,
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
    } else if (item.key === "documentation") {
      navigate("/documentation");
    } else if (item.key === "blog") {
      navigate("/blog");
    } else if (item.key === "logout") {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
  };

  const items = [
    getItem(`${state.user.username}`, "profile_user", <SettingOutlined />),
    getItem("Documentación", "documentation", <BookOutlined />),
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
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "white",
          }}
        >
          {window.innerWidth > 900 && state.user.username}
        </Button>

        <Button
          icon={<BookOutlined />}
          onClick={() => navigate("/documentation")}
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "white",
          }}
        >
          {window.innerWidth > 900 && "Documentación"}
        </Button>

        <Button
          icon={<SnippetsOutlined />}
          onClick={() => navigate("/blog")}
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "white",
          }}
        >
          {window.innerWidth > 900 && "Blog"}
        </Button>

        <Popconfirm
          title="¿Estás seguro de que quieres salir?"
          description="Se cerrará tu sesión y tendrás que iniciar sesión nuevamente."
          onConfirm={() => {
            dispatch({ type: "LOGOUT" });
            navigate("/");
          }}
          okText="Sí, salir"
          cancelText="Cancelar"
          okButtonProps={{
            style: {
              background:
                "linear-gradient(135deg, rgba(15,120,142,0.8) 0%, rgba(15,120,142,1) 100%)",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
            },
          }}
          cancelButtonProps={{
            style: {
              borderRadius: "6px",
              border: "1px solid rgba(15,120,142,0.3)",
              color: "rgba(15,120,142,0.8)",
            },
          }}
        >
          <Button
            icon={<LogoutOutlined />}
            style={{
              border: "1px solid rgba(230,184,0,0.8)",
              backgroundColor: "rgba(230,184,0,0.2)",
              color: "white",
            }}
          >
            Salir
          </Button>
        </Popconfirm>
      </Flex>
    </Flex>
  );
};

export default MenuNav;
