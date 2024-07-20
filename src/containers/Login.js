// Login.js
import React, { useState, useContext} from "react";
import logo from "../assets/img/logo_dark.png";
import { Form, Input, Button, Row, Col, Card, notification } from "antd";
import { endpoints } from "../config/endpoints";
import { AppContext } from "../App";

const Login = () => {
  const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { dispatch } = useContext(AppContext);

  const handleLogin = async (values) => {
    setLoading(true);
    const rq = await endpoints.auth
      .login(values)
      .then((x) => {
        console.log(x);
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
    console.log("Valores recopilados:", values);
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ minHeight: "100vh", backgroundColor: '#001529' }}>
      <Col>
        <Card style={{ width: "400px" }}>
          <center>
            <img
              src={logo}
              alt="logo"
              style={{ width: "80%", marginBottom: "0px" }}
            />
          </center>
          <Form onFinish={handleLogin} layout="vertical" form={form}>
            <Form.Item name="email" label="Correo">
              <Input type="email" />
            </Form.Item>
            <Form.Item name="password" label="Contraseña">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Iniciar sesión
              </Button>
<Button type="default" style={{marginLeft:'10px'}} onClick={()=> form.resetFields()}>
      Limpiar
              </Button>

            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
