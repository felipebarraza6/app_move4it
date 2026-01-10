import React, { useContext } from "react";
import { Button, Flex, Popconfirm } from "antd";
import {
  SnippetsOutlined,
  LogoutOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { AppContext } from "../../App";
import logo from "../../assets/img/logo.png";

const MenuNav = () => {
  const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const breadcrumbNameMap = {
    "/": "INICIO",
    "/profile_user": "MI CUENTA",
    "/profile_competition": "PERFIL ATLETA",
    "/documentation": "DOCUMENTACIÓN",
    "/blog": "BLOG Y NOTICIAS",
    "/team": "MI EQUIPO",
    "/enterprise": "COMPETENCIA",
    "/global_viewer": "VISOR GLOBAL",
    "/challenges": "DESAFÍOS",
    "/achievements": "LOGROS",
  };

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = [
    {
      title: (
        <span 
          className="futu-breadcrumb"
          style={{ color: "rgba(10, 95, 224, 0.8)", cursor: "pointer", fontSize: "11px", fontWeight: 800, letterSpacing: "1px" }} 
          onClick={() => navigate("/")}
        >
          HOME
        </span>
      ),
      key: "home",
    },
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return {
        key: url,
        title: (
          <span className="futu-breadcrumb" style={{ 
            color: "rgba(10, 95, 224, 0.95)", 
            fontWeight: 800, 
            fontSize: "11px",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
          }}>
            {breadcrumbNameMap[url] || pathSnippets[index]}
          </span>
        ),
      };
    }),
  ];

  // These functions are no longer needed with the new hardcoded buttons layout

  if (window.innerWidth < 900) return null;

  return (
    <Flex
      gap="middle"
      justify="space-between"
      align="center"
      style={{
        background: window.innerWidth < 900 ? "#12E3C2" : "rgba(18, 227, 194, 0.85)",
        margin: window.innerWidth < 900 ? "0" : "8px 16px",
        padding: "4px 20px",
        borderRadius: window.innerWidth < 900 ? "0" : "8px",
        boxShadow: window.innerWidth < 900 ? "none" : "0 4px 15px rgba(18, 227, 194, 0.2)",
        position: "relative",
        zIndex: 10,
        transition: "all 0.3s ease",
        width: window.innerWidth < 900 ? "100%" : "auto",
        height: window.innerWidth < 900 ? "48px" : "auto",
      }}
      className="teal-brand-header"
    >
      <Flex vertical align="start" style={{ flex: 1 }}>
        {window.innerWidth > 900 ? (
          <Breadcrumb 
            items={breadcrumbItems} 
            separator={<span className="futu-separator">//</span>}
            style={{ marginBottom: 0 }}
          />
        ) : (
          <Flex align="center" gap="4px" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <span style={{ 
              color: "white", 
              fontSize: "18px", 
              fontWeight: "900", 
              letterSpacing: "-1px",
              fontFamily: "'Montserrat', sans-serif"
            }}>
              MOVE
            </span>
            <span style={{ 
              color: "#052240", 
              fontSize: "18px", 
              fontWeight: "900",
              letterSpacing: "-1px",
              fontFamily: "'Montserrat', sans-serif",
              background: "white",
              padding: "0 6px",
              borderRadius: "4px"
            }}>
              4IA
            </span>
          </Flex>
        )}
      </Flex>

      {window.innerWidth > 900 && (
        <Flex gap="middle" align="center">
          <Button
            type="text"
            icon={<UserOutlined style={{ color: "#0A5FE0" }} />}
            onClick={() => navigate("/profile_user")}
            style={{
              color: "rgba(0, 0, 0, 0.85)",
              fontSize: "12px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              padding: "4px 8px",
              transition: "all 0.3s ease",
            }}
            className="glow-button"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0A5FE0";
              e.currentTarget.style.textShadow = "0 0 8px rgba(10, 95, 224, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(0, 0, 0, 0.85)";
              e.currentTarget.style.textShadow = "none";
            }}
          >
            {state.user.username}
          </Button>

          <Button
            type="text"
            icon={<BookOutlined style={{ color: "rgba(10, 95, 224, 0.8)" }} />}
            onClick={() => navigate("/documentation")}
            style={{
              color: "rgba(0, 0, 0, 0.7)",
              fontSize: "12px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontWeight: 700,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0A5FE0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(0, 0, 0, 0.7)";
            }}
          >
            Docs
          </Button>

          <Button
            type="text"
            icon={<SnippetsOutlined style={{ color: "rgba(10, 95, 224, 0.8)" }} />}
            onClick={() => navigate("/blog")}
            style={{
              color: "rgba(0, 0, 0, 0.7)",
              fontSize: "12px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontWeight: 700,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0A5FE0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(0, 0, 0, 0.7)";
            }}
          >
            Blog
          </Button>

          <Popconfirm
            title="SALIR"
            description="¿Cerrar sesión tecnológica?"
            onConfirm={() => {
              dispatch({ type: "LOGOUT" });
              navigate("/");
            }}
            okText="CONFIRMAR"
            cancelText="CANCELAR"
          >
            <Button
              type="text"
              icon={<LogoutOutlined style={{ color: "rgba(255, 77, 79, 0.8)" }} />}
              style={{
                fontSize: "12px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontWeight: "700",
                color: "rgba(0, 0, 0, 0.7)",
                height: "32px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ff4d4f";
                e.currentTarget.style.textShadow = "0 0 8px rgba(255, 77, 79, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(0, 0, 0, 0.7)";
                e.currentTarget.style.textShadow = "none";
              }}
            >
              Salir
            </Button>
          </Popconfirm>
        </Flex>
      )}
    </Flex>
  );
};

export default MenuNav;
