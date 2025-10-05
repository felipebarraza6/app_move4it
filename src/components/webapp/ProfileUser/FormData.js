import React, { useContext, useEffect, useState } from "react";
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
  const [rutValue, setRutValue] = useState("");

  // Función para formatear RUT chileno garantizando un solo guion
  const formatRut = (value) => {
    if (typeof value !== "string") return "";
    // Normalizar: quitar espacios y caracteres no válidos
    let cleanValue = value.trim().replace(/[^0-9kK]/g, "");

    // Si está vacío, retornar vacío
    if (!cleanValue) return "";

    // Si solo tiene 1 carácter, no agregar guion aún
    if (cleanValue.length === 1) return cleanValue.toUpperCase();

    // Separar número y dígito verificador
    let rutNumber = cleanValue.slice(0, -1);
    let dv = cleanValue.slice(-1).toUpperCase();

    // Formatear número con puntos
    rutNumber = rutNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Asegurar un único guion entre número y DV
    return `${rutNumber}-${dv}`;
  };

  // Función para validar RUT chileno
  const validateRut = (rut) => {
    if (!rut) return false;

    // Remover puntos y guión
    const cleanRut = rut.replace(/[.-]/g, "");

    if (cleanRut.length < 2) return false;

    const rutNumber = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();

    // Validar que el número sea válido
    if (!/^\d+$/.test(rutNumber)) return false;

    // Calcular dígito verificador
    let sum = 0;
    let multiplier = 2;

    for (let i = rutNumber.length - 1; i >= 0; i--) {
      sum += parseInt(rutNumber[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const remainder = sum % 11;
    const calculatedDv =
      remainder === 0
        ? "0"
        : remainder === 1
        ? "K"
        : (11 - remainder).toString();

    return dv === calculatedDv;
  };

  // Manejar cambio en el campo RUT
  const handleRutChange = (e) => {
    const value = e.target.value;
    const formatted = formatRut(value);
    setRutValue(formatted);
    form.setFieldValue("identification_number", formatted);
  };

  const onFinish = async (values) => {
    // Validar RUT antes de enviar
    if (
      values.identification_number &&
      !validateRut(values.identification_number)
    ) {
      notification.error({
        message: "RUT inválido",
        description: "Por favor ingresa un RUT válido",
      });
      return;
    }

    if (values.date_of_birth) {
      // Convert ISO date string to YYYY-MM-DD format
      const date = new Date(values.date_of_birth);
      values.date_of_birth = date.toISOString().split("T")[0];
    }

    try {
      const rq = await endpoints.auth.update_user(values).then((r) => {
        dispatch({ type: "SET_USER", payload: r.data });
        notification.success({ message: "Usuario actualizado correctamente" });
        // Navigate to the profile page after successful update
        navigate("/profile_user");
      });
    } catch (error) {
      notification.error({
        message: "Error al actualizar",
        description: "No se pudo actualizar la información",
      });
    }
  };

  useEffect(() => {
    // Inicializar el valor del RUT con formato y sincronizar con el formulario
    if (
      state.user.identification_number !== undefined &&
      state.user.identification_number !== null
    ) {
      const formatted = formatRut(String(state.user.identification_number));
      setRutValue(formatted);
      form.setFieldsValue({ identification_number: formatted });
    }
  }, [state.user.identification_number, form]);

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
        <Item
          name="identification_number"
          label="RUT"
          rules={[
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                if (!validateRut(value)) {
                  return Promise.reject(new Error("RUT inválido"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            placeholder="Ingresa tu RUT (ej: 12345678-9)"
            value={rutValue}
            onChange={handleRutChange}
            maxLength={12}
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
