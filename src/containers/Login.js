// Login.js
import React, { useState, useContext } from "react";
import logo from "../assets/img/logo_dark.png";
import { Form, Input, Button, Row, Col, Card, notification } from "antd";
import { endpoints } from "../config/endpoints";
import { AppContext } from "../App";
import { MailOutlined, LoginOutlined, ClearOutlined } from "@ant-design/icons";
import { MdOutlinePassword } from "react-icons/md";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { dispatch } = useContext(AppContext);

  const handleLogin = async (values) => {
    setLoading(true);
    const rq = await endpoints.auth
      .login(values)
      .then((x) => {
        dispatch({
          type: "LOGIN",
          payload: {
            access_token: x.access_token,
            user: x.user,
          },
        });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        notification.error({
          message: "Error",
          description: "Usuario o contraseña incorrectos",
        });
      });
  };

  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{
        minHeight: "100vh",
        padding: "10px",
        background:
          "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,21,41,1) 100%)",
      }}
    >
      <Col xl={7} xs={24}>
        <Card style={{ width: "100%", marginBottom: "10px", zIndex: 99 }}>
          <center>
            <img
              src={logo}
              alt="logo"
              style={{ width: "50%", marginBottom: "0px" }}
            />
          </center>
          <Form onFinish={handleLogin} layout="vertical" form={form}>
            <Form.Item name="email">
              <Input
                type="email"
                addonBefore={<MailOutlined />}
                placeholder="Ingresa tu email"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password
                addonBefore={<MdOutlinePassword />}
                placeholder="Ingresa tu contraseña"
              />
            </Form.Item>
            <Form.Item>
              <center>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<LoginOutlined />}
                >
                  Iniciar sesión
                </Button>
                <Button
                  type="default"
                  style={{ marginLeft: "10px" }}
                  icon={<ClearOutlined />}
                  onClick={() => form.resetFields()}
                >
                  Limpiar
                </Button>
              </center>
            </Form.Item>
          </Form>
        </Card>
        <Card style={{ width: "100%", textAlign: "center" }} size="small">
          Producto desarrollado por:
          <br />
          <u> fbarraza - dev</u> 👨‍💻☕ / LATAM 🇨🇱
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
