import React, { useState, useContext } from "react";
import {
  CloudUploadOutlined,
  PlusCircleOutlined,
  FilterFilled,
  SendOutlined,
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Input,
  Upload,
  Form,
  Typography,
  Flex,
  Card,
} from "antd";
import { AppContext } from "../../../App";
const { Paragraph } = Typography;

const AddAnswerUser = ({ state, disabledAction }) => {
  const { state: AppState } = useContext(AppContext);
  const myteam =
    AppState.user.enterprise_competition_overflow.last_competence.stats
      .current_interval_data.my_group;
  const quantity_participants = Object.keys(myteam).length;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [expanded, setExpanded] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values of form: ", values);
        // Aquí puedes manejar el envío de los datos del formulario
        setVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} icon={<CloudUploadOutlined />}>
        Realizar
      </Button>
      <Modal
        title={`Cargar evidencía para actividad "${state.activity.name}"`}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        extra={state.activity.points}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={disabledAction}
            icon={<SendOutlined />}
          >
            Enviar
          </Button>,
        ]}
      >
        <Flex
          gap={"large"}
          justify="space-around"
          align="top"
          style={{ marginTop: "20px" }}
        >
          {state.activity.description && (
            <div style={{ position: "relative" }}>
              <Paragraph
                style={{ textAlign: "justify", marginBottom: "0px" }}
                ellipsis={
                  !expanded
                    ? {
                        rows: 4,
                        expandable: false,
                      }
                    : false
                }
              >
                {state.activity.description}
              </Paragraph>
              <Button
                onClick={() => setExpanded(!expanded)}
                size="small"
                type="link"
                style={{
                  float: "right",
                  marginTop: expanded ? "-15px" : "0px",
                }}
              >
                {expanded ? "ver menos" : "ver más"}
              </Button>
            </div>
          )}

          <Flex vertical gap={"small"} align="center">
            <Card
              size="small"
              hoverable
              style={{
                backgroundColor: "#b7eb8f",
                textAlign: "center",
                width: "120px",
              }}
            >
              <PlusCircleOutlined style={{ marginRight: "5px" }} />{" "}
              {(state.activity.points / quantity_participants).toFixed(1)}{" "}
              puntos
            </Card>
            <Card
              size="small"
              hoverable
              style={{ backgroundColor: "#69c0ff", textAlign: "center" }}
            >
              <FilterFilled style={{ marginRight: "5px" }} />
              {state.activity.category.name}
            </Card>
          </Flex>
        </Flex>

        <Form form={form} layout="vertical">
          <Form.Item name="description" label="Nota">
            <Input.TextArea col={5} autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Cargar evidencía"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[
              { required: true, message: "La evidencía es obligatoria!" },
            ]}
          >
            <Upload
              name="evidence"
              listType="picture"
              beforeUpload={() => false}
            >
              <Button icon={<CloudUploadOutlined />}>Subir archivo</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddAnswerUser;
