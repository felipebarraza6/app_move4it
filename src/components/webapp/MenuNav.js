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
        background: "linear-gradient(135deg, rgba(10, 95, 224, 0.98) 0%, rgba(10, 140, 207, 0.98) 50%, rgba(18, 227, 194, 0.98) 100%)",
        padding: "12px 16px",
        boxShadow: "0 2px 8px rgba(10, 95, 224, 0.15)",
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
            border: "1px solid rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "white",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {window.innerWidth > 900 && state.user.username}
        </Button>

        <Button
          icon={<BookOutlined />}
          onClick={() => navigate("/documentation")}
          style={{
            border: "1px solid rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "white",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {window.innerWidth > 900 && "Documentación"}
        </Button>

        <Button
          icon={<SnippetsOutlined />}
          onClick={() => navigate("/blog")}
          style={{
            border: "1px solid rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "white",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.transform = "translateY(0)";
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
              background: "linear-gradient(135deg, rgba(10, 95, 224, 0.9) 0%, rgba(18, 227, 194, 0.9) 100%)",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
            },
          }}
          cancelButtonProps={{
            style: {
              borderRadius: "8px",
              border: "1px solid rgba(10, 95, 224, 0.3)",
              color: "#0A5FE0",
            },
          }}
        >
          <Button
            icon={<LogoutOutlined />}
            style={{
              border: "1px solid rgba(18, 227, 194, 0.6)",
              backgroundColor: "rgba(18, 227, 194, 0.2)",
              color: "white",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(18, 227, 194, 0.35)";
              e.currentTarget.style.borderColor = "rgba(18, 227, 194, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(18, 227, 194, 0.2)";
              e.currentTarget.style.borderColor = "rgba(18, 227, 194, 0.6)";
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
