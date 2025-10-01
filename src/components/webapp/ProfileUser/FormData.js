import React, { useContext, useEffect } from "react";
import { Form, Input, Button, notification, Card, DatePicker } from "antd";
import { AppContext } from "../../../App";
import { ArrowUpOutlined, UserOutlined } from "@ant-design/icons";
import { endpoints } from "../../../config/endpoints";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { Item } = Form;

const FormData = () => {
  const { state, dispatch } = useContext(AppContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.date_of_birth) {
      // Convert ISO date string to YYYY-MM-DD format
      const date = new Date(values.date_of_birth);

      values.date_of_birth = date.toISOString().split("T")[0];
    }
    const rq = await endpoints.auth.update_user(values).then((r) => {
      dispatch({ type: "SET_USER", payload: r.data });
      notification.success({ message: "Usuario actualizado correctamente" });
      // Navigate to the profile page after successful update
      navigate("/profile_user");
    });
  };

  useEffect(() => {}, []);

  return (
    <Card
      title={
        <div
          style={{
            color: "rgba(15,120,142,0.8)",
            fontWeight: "600",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <UserOutlined />
          Información Personal
        </div>
      }
      style={{
        background:
          "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
        border: "1px solid rgba(15,120,142,0.2)",
        borderRadius: "12px",
        width: "100%",
        boxShadow: "0 4px 12px rgba(15,120,142,0.1)",
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
        layout="vertical"
      >
        <Item name="identification_number" label="RUT">
          <Input
            placeholder="Ingresa tu RUT"
            style={{
              borderRadius: "8px",
              border: "1px solid rgba(15,120,142,0.3)",
            }}
          />
        </Item>
        <Item name="first_name" label="Nombre">
          <Input
            placeholder="Ingresa tu nombre"
            style={{
              borderRadius: "8px",
              border: "1px solid rgba(15,120,142,0.3)",
            }}
          />
        </Item>
        <Item name="last_name" label="Apellido">
          <Input
            placeholder="Ingresa tu apellido"
            style={{
              borderRadius: "8px",
              border: "1px solid rgba(15,120,142,0.3)",
            }}
          />
        </Item>
        <Item name="date_of_birth" label="Fecha de Nacimiento">
          <DatePicker
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid rgba(15,120,142,0.3)",
            }}
            placeholder="Selecciona tu fecha de nacimiento"
            format="YYYY-MM-DD"
          />
        </Item>
        <Item name="phone_number" label="Teléfono">
          <Input
            placeholder="Ingresa tu número de teléfono"
            style={{
              borderRadius: "8px",
              border: "1px solid rgba(15,120,142,0.3)",
            }}
          />
        </Item>

        <Item>
          <Button
            type="primary"
            icon={<ArrowUpOutlined />}
            htmlType="submit"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,120,142,0.8) 0%, rgba(15,120,142,1) 100%)",
              border: "none",
              borderRadius: "8px",
              height: "40px",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(15,120,142,0.3)",
            }}
          >
            Actualizar Información
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default FormData;
