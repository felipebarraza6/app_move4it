import React, { useContext } from "react";
import { Form, Input, Button, notification } from "antd";
import { endpoints } from "../../../config/endpoints";
import { AppContext } from "../../../App";
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
    <Form form={form} onFinish={onFinish}>
      <Item name="first_password">
        <Input type="password" placeholder="Nueva contraseña" />
      </Item>
      <Item name="password">
        <Input type="password" placeholder="Confirmar nueva contraseña" />
      </Item>
      <Item>
        <Button type="primary" style={styles.btn} htmlType="submit">
          Guardar
        </Button>
        <Button type="primary" danger onClick={() => form.resetFields()}>
          Cancelar
        </Button>
      </Item>
    </Form>
  );
};

const styles = {
  btn: {
    margin: "0px 10px 0px 0px",
  },
};

export default UpdatePassword;
