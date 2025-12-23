import React, { useContext } from "react";
import { Form, Input, Button, notification, Card } from "antd";
import { endpoints } from "../../../config/endpoints";
import { AppContext } from "../../../App";
import { LockOutlined } from "@ant-design/icons";
const { Item } = Form;

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const { state, dispatch } = useContext(AppContext);

  const onFinish = async (values) => {
    if (values.password !== values.first_password) {
      notification.error({ message: "Las contraseñas no coinciden" });
      return;
    } else {
      const request = await endpoints.auth
        .reset_password(values.password)
        .then((x) => {
          notification.success({ message: "Contraseña actualizada" });
          dispatch({ type: "LOGOUT" });
        });
    }
  };

  return (
    <Card
      title={
        <div
          style={{
            color: "#0A5FE0",
            fontWeight: "600",
            fontSize: "18px",
            fontFamily: "'Montserrat', sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <LockOutlined />
          Cambiar Contraseña
        </div>
      }
      style={{
        background:
          "linear-gradient(135deg, rgba(10, 95, 224, 0.05) 0%, rgba(18, 227, 194, 0.03) 100%)",
        border: "1px solid rgba(10, 95, 224, 0.2)",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(10, 95, 224, 0.1)",
      }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Item name="first_password" label="Nueva Contraseña">
          <Input
            type="password"
            placeholder="Ingresa tu nueva contraseña"
            style={{
              borderRadius: "8px",
              border: "1px solid rgba(10, 95, 224, 0.3)",
            }}
          />
        </Item>
        <Item name="password" label="Confirmar Contraseña">
          <Input
            type="password"
            placeholder="Confirma tu nueva contraseña"
            style={{
              borderRadius: "8px",
              border: "1px solid rgba(10, 95, 224, 0.3)",
            }}
          />
        </Item>
        <Item>
          <Button
            type="primary"
            style={{
              ...styles.btn,
              background:
                "linear-gradient(135deg, rgba(10, 95, 224, 0.9) 0%, rgba(18, 227, 194, 0.9) 100%)",
              border: "none",
              borderRadius: "8px",
              height: "40px",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(10, 95, 224, 0.3)",
            }}
            htmlType="submit"
          >
            Cambiar contraseña
          </Button>
          <Button
            type="default"
            onClick={() => form.resetFields()}
            style={{
              margin: "0px 10px 10px 0px",
              borderRadius: "8px",
              height: "40px",
              border: "1px solid rgba(10, 95, 224, 0.3)",
              color: "#0A5FE0",
            }}
          >
            Cancelar
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

const styles = {
  btn: {
    margin: "0px 10px 10px 0px",
  },
};

export default UpdatePassword;
