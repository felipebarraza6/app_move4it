import React, { useState, useContext } from "react";
import {
  CloudUploadOutlined,
  PlusCircleOutlined,
  FilterFilled,
  DeleteOutlined,
  SendOutlined,
  PlusOutlined,
  CheckCircleFilled,
  CheckSquareFilled,
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
import { endpoints } from "../../../config/endpoints";
const { Paragraph } = Typography;

const AddAnswerUser = ({ state, disabledAction, updateActivityState }) => {
  const { state: AppState, dispatch } = useContext(AppContext);
  const myteam =
    AppState.user.enterprise_competition_overflow.last_competence.stats
      .current_interval_data.my_group;
  const quantity_participants = Object.keys(myteam).length;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async () => {
        setLoading(true);

        form.resetFields();
        setVisible(false);
        setLoading(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setLoading(false);
      });
  };

  return (
    <div>
      {!state.is_completed ? (
        <Button
          type="primary"
          onClick={showModal}
          icon={
            state.is_completed ? (
              <CheckCircleFilled />
            ) : !state.is_load ? (
              <PlusOutlined />
            ) : (
              <CheckCircleFilled />
            )
          }
          disabled={state.is_completed || state.is_load}
        >
          {state.is_load && !state.is_completed
            ? "Envíado..."
            : state.is_completed
            ? "Completado"
            : "Realizar"}
        </Button>
      ) : (
        <Flex gap="small" justify="center">
          {" "}
          <CheckSquareFilled style={{ color: "green" }} />
          Completado
        </Flex>
      )}
      <Modal
        title={`Cargar evidencía para actividad "${state.activity.name}"`}
        visible={visible}
        onOk={handleOk}
        width={700}
        onCancel={handleCancel}
        extra={state.activity.points}
        footer={[
          <Button key="back" onClick={handleCancel} disabled={loading}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            icon={<SendOutlined />}
            loading={loading}
            disabled={loading}
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
            <div style={{ position: "relative", width: "100%" }}>
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

        <Form form={form} layout="vertical" style={{ marginTop: "20px" }}>
          <Flex
            gap={"large"}
            justify="center"
            style={{ width: "100%" }}
            align="center"
          >
            <Flex>
              <Form.Item
                name="description"
                label="Nota"
                style={{ width: "100%" }}
              >
                <Input.TextArea
                  rows={7}
                  placeholder="Describe tu nota..."
                  style={{ width: "350px" }}
                />
              </Form.Item>
            </Flex>
            <Flex>
              <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
                rules={[
                  { required: true, message: "La evidencía es obligatoria!" },
                ]}
                style={{ width: "100%" }}
              >
                <Upload
                  name="evidence"
                  listType="text"
                  itemRender={(originNode, file, currFileList, actions) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CloudUploadOutlined style={{ marginRight: "8px" }} />
                      <span style={{ flex: 1 }}>
                        {file.name.length > 20
                          ? `${file.name.slice(0, 20)}...`
                          : file.name}
                      </span>
                      <Button
                        type="link"
                        onClick={() => actions.remove(file)}
                        icon={<DeleteOutlined />}
                      />
                    </div>
                  )}
                  beforeUpload={() => false}
                  maxCount={1}
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                    showDownloadIcon: false,
                    showPreviewIcon: true,
                    onChange(info) {
                      if (info.file.status !== "uploading") {
                        console.log(info.file, info.fileList);
                      }
                    },
                    onPreview(file) {
                      window.open(file.url || file.thumbUrl);
                    },
                    onRemove(file) {
                      console.log("Removed file:", file);
                    },
                  }}
                >
                  <Card
                    hoverable
                    size="small"
                    style={{ width: "100%", backgroundColor: "#f0f0f0" }}
                  >
                    <Button
                      size="large"
                      style={{ color: "#1890ff" }}
                      type="link"
                    >
                      <Flex gap="small" align="center">
                        <CloudUploadOutlined />
                        <span>Adjunta tu evidencía</span>
                      </Flex>
                    </Button>
                  </Card>
                </Upload>
              </Form.Item>
            </Flex>
          </Flex>
        </Form>
      </Modal>
    </div>
  );
};

export default AddAnswerUser;
