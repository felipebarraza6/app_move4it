import React, { useContext, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { AppContext } from "../../../App";
import { ArrowUpOutlined } from "@ant-design/icons";
import { endpoints } from "../../../config/endpoints";

const { Item } = Form;

const FormData = () => {
  const { state, dispatch } = useContext(AppContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const rq = await endpoints.auth.update_user(values).then((r) => {
      notification.success({ message: "Usuario actualizado correctamente" });
    });
    console.log(values);
  };

  useEffect(() => {}, []);

  return (
    <Form initialValues={state.user} onFinish={onFinish} form={form}>
      <Item name="identification_number">
        <Input placeholder="Rut" />
      </Item>
      <Item name="first_name">
        <Input placeholder="Nombre" />
      </Item>
      <Item name="last_name">
        <Input placeholder="Apellido" />
      </Item>
      <Item name="date_of_birth">
        <Input placeholder="Fecha de nacimiento" />
      </Item>
      <Item name="phone_number">
        <Input placeholder="Teléfono" />
      </Item>
      <Item name="bio">
        <Input.TextArea rows={4} placeholder="Descripción" />
      </Item>
      <Item>
        <Button type="primary" icon={<ArrowUpOutlined />} htmlType="submit">
          Actualizar
        </Button>
      </Item>
    </Form>
  );
};

const styles = {
  dateBorn: {
    width: "100%",
  },
};

export default FormData;
