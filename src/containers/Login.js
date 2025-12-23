// Login.js
import React, { useState, useContext } from "react";
import logo from "../assets/img/logo_dark.png";
import { Form, Input, Button, Row, Col, Card, notification, Spin } from "antd";
import { endpoints } from "../config/endpoints";
import { AppContext } from "../App";
import {
  MailOutlined,
  LoginOutlined,
  ClearOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { MdOutlinePassword } from "react-icons/md";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { dispatch } = useContext(AppContext);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await endpoints.auth.login(values);
      dispatch({
        type: "LOGIN",
        payload: {
          access_token: response.access_token,
          user: response.user,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      notification.error({
        message: "Error de autenticación",
        description:
          error.response?.data?.message || "Usuario o contraseña incorrectos",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, rgba(10, 95, 224, 0.98) 0%, rgba(10, 140, 207, 0.98) 50%, rgba(18, 227, 194, 0.98) 100%)",
      }}
    >
      <Col xl={6} lg={8} md={12} sm={16} xs={22}>
        <Card
          style={{
            width: "100%",
            marginBottom: "20px",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(10, 95, 224, 0.2)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)"
          }}
          bodyStyle={{ padding: "40px 32px" }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <img
              src={logo}
              alt="logo"
              style={{
                width: "120px",
                height: "auto",
                marginBottom: "16px",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
              }}
            />
            <h2 style={{
              color: "#1a1a1a",
              fontWeight: "600",
              fontSize: "24px",
              margin: "0 0 8px 0",
              fontFamily: "'Montserrat', sans-serif"
            }}>
              <span style={{ color: "#1a1a1a" }}>Bienve</span><span style={{ color: "#12E3C2" }}>nido</span>
            </h2>
            <p style={{
              color: "#666",
              margin: 0,
              fontSize: "14px"
            }}>
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <Form onFinish={handleLogin} layout="vertical" form={form}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Por favor ingresa tu email' },
                { type: 'email', message: 'Ingresa un email válido' }
              ]}
            >
              <Input
                type="email"
                prefix={<MailOutlined style={{ color: "#0A5FE0" }} />}
                placeholder="Correo electrónico"
                size="large"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #e1e5e9",
                  padding: "12px 16px"
                }}
                onFocus={(e) => e.target.style.borderColor = "#12E3C2"}
                onBlur={(e) => e.target.style.borderColor = "#e1e5e9"}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Por favor ingresa tu contraseña' }
              ]}
            >
              <Input.Password
                prefix={<MdOutlinePassword style={{ color: "#0A5FE0" }} />}
                placeholder="Contraseña"
                size="large"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #e1e5e9",
                  padding: "12px 16px"
                }}
                onFocus={(e) => e.target.style.borderColor = "#12E3C2"}
                onBlur={(e) => e.target.style.borderColor = "#e1e5e9"}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: "16px" }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                style={{
                  background: "linear-gradient(135deg, rgba(10, 95, 224, 0.95) 0%, rgba(18, 227, 194, 0.95) 100%)",
                  border: "1px solid rgba(18, 227, 194, 0.4)",
                  borderRadius: "8px",
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: "600",
                  boxShadow: "0 4px 16px rgba(18, 227, 194, 0.4)"
                }}
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="text"
                block
                icon={<ClearOutlined />}
                onClick={() => form.resetFields()}
                style={{
                  color: "#666",
                  height: "40px",
                  borderRadius: "8px",
                  border: "1px solid rgba(10, 95, 224, 0.2)"
                }}
              >
                Limpiar campos
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card
          style={{
            width: "100%",
            textAlign: "center",
            borderRadius: "12px",
            border: "none",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
          }}
          size="small"
          bodyStyle={{ padding: "16px" }}
        >
          <div style={{ color: "#666", fontSize: "12px" }}>
            Desarrollado por <strong style={{ color: "#0A5FE0" }}>fbarraza - dev</strong> 👨‍💻
            <br />
            <span style={{ color: "#888" }}>LATAM 🇨🇱</span>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
