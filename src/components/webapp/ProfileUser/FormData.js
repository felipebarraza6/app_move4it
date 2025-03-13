import React, { useContext, useEffect } from "react";
import { Form, Input, Button, notification, Card } from "antd";
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
  };

  useEffect(() => {}, []);

  return (
    <Card
      style={{
        background:
          "linear-gradient(169deg, rgba(15,120,142,1) 0%, rgba(77,180,202,0.2217480742296919) 99%, rgba(60,87,93,1) 100%)",
        marginBottom: "20px",
      }}
    >
      <Form
        initialValues={{ ...state.user, ...state.user.profile }}
        onFinish={onFinish}
        form={form}
      >
        <Item name="identification_number">
          <Input placeholder="Rut" addonBefore={"RUT"} />
        </Item>
        <Item name="first_name">
          <Input placeholder="Nombre" addonBefore={"Nombre"} />
        </Item>
        <Item name="last_name">
          <Input placeholder="Apellido" addonBefore={"Apellido"} />
        </Item>
        <Item name="date_of_birth" addonBefore={"Fecha de nacimiento"}>
          <Input
            placeholder="Fecha de nacimiento"
            disabled
            addonBefore={"Fecha de nacimiento"}
          />
        </Item>
        <Item name="phone_number">
          <Input placeholder="Teléfono" addonBefore={"Telefono"} />
        </Item>

        <Item>
          <Button type="primary" icon={<ArrowUpOutlined />} htmlType="submit">
            Actualizar
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

const styles = {
  dateBorn: {
    width: "100%",
  },
};

export default FormData;
