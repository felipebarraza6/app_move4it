import React, { useContext, useEffect } from "react";
import { Form, Input, Button, notification, Card, DatePicker } from "antd";
import { AppContext } from "../../../App";
import { ArrowUpOutlined } from "@ant-design/icons";
import { endpoints } from "../../../config/endpoints";
import moment from "moment";

const { Item } = Form;

const FormData = () => {
  const { state, dispatch } = useContext(AppContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (values.date_of_birth) {
      // Convert ISO date string to YYYY-MM-DD format
      const date = new Date(values.date_of_birth);

      values.date_of_birth = date.toISOString().split("T")[0];
    }
    const rq = await endpoints.auth.update_user(values).then((r) => {
      dispatch({ type: "SET_USER", payload: r.data });
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
        initialValues={{
          first_name: state.user.first_name,
          identification_number: state.user.identification_number,
          last_name: state.user.last_name,

          phone: state.user.phone_number,
        }}
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
        <Item name="date_of_birth">
          <DatePicker
            style={{ width: "100%" }}
            placeholder={
              state.user.date_of_birth
                ? state.user.date_of_birth
                : "Fecha de nacimiento"
            }
            format="YYYY-MM-DD"
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

export default FormData;
