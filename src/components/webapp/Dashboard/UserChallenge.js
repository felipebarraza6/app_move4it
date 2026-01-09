import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Button,
  Flex,
  Table,
  Tag,
  Spin,
  Statistic,
  Modal,
  Input,
  Upload,
  Form,
  Typography,
} from "antd";
import { useLocation } from "react-router-dom";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  OrderedListOutlined,
  CalendarFilled,
  CloudUploadOutlined,
  PlusCircleOutlined,
  FilterFilled,
  SendOutlined,
  PlusOutlined,
  CheckCircleFilled,
  CheckSquareFilled,
} from "@ant-design/icons";
import { AppContext } from "../../../App";
import { parseDateYMDLocal, normalizeDateOnly } from "../../../utils/date";
import { endpoints } from "../../../config/endpoints";

const { Paragraph } = Typography;

const AddAnswerUser = ({ state, updateActivityState }) => {
  const { state: AppState, dispatch } = useContext(AppContext);
  const location = useLocation();
  const myTeam =
    AppState?.user?.enterprise_competition_overflow?.last_competence?.stats
      ?.current_interval_data?.my_group || {};
  const quantity_participants = Object.keys(myTeam).length;
  const [visible, setVisible] = useState(false);
  const [listFile, setListFile] = useState([]);
  const [form] = Form.useForm();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMoile] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        values = {
          ...values,
          id: state.id,
          is_load: true,
        };

        const rq = await endpoints.register_activities
          .update(values)
          .then((x) => {
            form.resetFields();
            dispatch({
              type: "UPDATE_ACTIVITIES",
              update_activity: x,
            });
            dispatch({
              type: "UPDATE_USER",
            });
          });

        setVisible(false);
        updateActivityState({
          ...state,
          is_load: true,
        });
        setLoading(false);
      })
      .catch((info) => {
        setLoading(false);
      });
  };

  return (
    <div>
      {!state.is_completed ? (
        <>
          {location.pathname === "/" ? (
            <Button
              type="primary"
              size={window.innerWidth < 768 ? "small" : "large"}
              onClick={showModal}
              style={{
                background: "#0A5FE0",
                border: "1px solid rgba(18, 227, 194, 0.4)",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(10, 95, 224, 0.3)",
              }}
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
                ? "Enviado..."
                : state.is_completed
                ? "Completado"
                : "Realizar"}
            </Button>
          ) : (
            <span>
              {state.is_load && !state.is_completed
                ? today == state.interval.end_date
                  ? "Enviado"
                  : "incompleto"
                : state.is_completed
                ? "Completado"
                : "Sin realizar"}
            </span>
          )}
        </>
      ) : (
        <Flex gap="small" justify="center">
          <CheckSquareFilled style={{ color: "green" }} />
          Completado
        </Flex>
      )}
      <Modal
        title={
          <div
            style={{
              color: "#0A5FE0",
              fontWeight: "600",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CloudUploadOutlined />
            Cargar evidencia para "{state.activity.name}"
          </div>
        }
        open={visible}
        onOk={handleOk}
        width={700}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            disabled={loading}
            style={{
              borderRadius: "8px",
              height: "40px",
              border: "1px solid rgba(10, 95, 224, 0.3)",
              color: "#0A5FE0",
              fontWeight: "500",
            }}
          >
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            icon={<SendOutlined />}
            loading={loading}
            disabled={loading}
            style={{
              background:
                "linear-gradient(135deg, rgba(10, 95, 224, 0.9) 0%, rgba(18, 227, 194, 0.9) 100%)",
              border: "none",
              borderRadius: "8px",
              height: "40px",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(10, 95, 224, 0.3)",
            }}
          >
            Enviar
          </Button>,
        ]}
        style={{
          borderRadius: "16px",
        }}
        styles={{
          body: {
            padding: "24px",
          },
        }}
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
                backgroundColor: "rgba(18, 227, 194, 0.15)",
                border: "1px solid rgba(18, 227, 194, 0.03)",
                textAlign: "center",
                width: "120px",
              }}
            >
              <PlusCircleOutlined
                style={{ marginRight: "5px", color: "#12E3C2" }}
              />{" "}
              <span style={{ color: "#052240", fontWeight: "600" }}>
                {quantity_participants > 0 
                  ? (state.activity.points / quantity_participants).toFixed(2) 
                  : state.activity.points}{" "}
                puntos
              </span>
            </Card>
            <Card
              size="small"
              hoverable
              style={{
                backgroundColor: "rgba(10, 95, 224, 0.1)",
                border: "1px solid rgba(10, 95, 224, 0.3)",
                textAlign: "center",
              }}
            >
              <FilterFilled
                style={{ marginRight: "5px", color: "#0A5FE0" }}
              />
              <span style={{ color: "#052240", fontWeight: "600" }}>
                {state.activity.category.name}
              </span>
            </Card>
          </Flex>
        </Flex>

        <Form form={form} layout="vertical" style={{ marginTop: "20px" }}>
          <Flex
            gap={"large"}
            justify="center"
            style={{ width: "100%" }}
            align="center"
            vertical={window.innerWidth < 768 ? true : false}
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
                name="file"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
                rules={[
                  { required: true, message: "La evidencia es obligatoria!" },
                ]}
                style={{ width: "100%" }}
              >
                <Upload
                  name="evidence"
                  listType="text"
                  fileList={listFile}
                  itemRender={(file, actions) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CloudUploadOutlined style={{ marginRight: "8px" }} />
                      <span style={{ flex: 1 }}>{actions.name}</span>
                    </div>
                  )}
                  beforeUpload={() => false}
                  maxCount={1}
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                    showDownloadIcon: false,
                    onChange(info) {
                      if (info.file.status !== "uploading") {
                        console.log(info.file, info.fileList);
                      }
                    },
                    onPreview(file) {
                      window.open(file.url || file.thumbUrl);
                    },
                    onRemove(file) {
                      setListFile([]);
                      console.log("Removed file:", file);
                    },
                  }}
                >
                  <Card
                    hoverable
                    size="small"
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(10, 95, 224, 0.05)",
                      border: "1px solid rgba(10, 95, 224, 0.2)",
                    }}
                  >
                    <Button
                      size="large"
                      style={{ color: "#0A5FE0" }}
                      type="link"
                    >
                      <Flex gap="small" align="center">
                        <CloudUploadOutlined />
                        <span>Adjunta tu evidencia</span>
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

const UserChallenge = ({ challengers }) => {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const last_competence_end =
    state.user.enterprise_competition_overflow.last_competence.end_date;

  const active_competence = () => {
    const today = new Date().toISOString().split("T")[0];

    if (last_competence_end < today) {
      return false;
    } else {
      return true;
    }
  };

  var current_interval =
    state.user.enterprise_competition_overflow.last_competence.stats
      ?.current_interval_data?.id || null;

  let currentIntervalF = 0; // Por defecto mostrar el primer intervalo

  if (current_interval && challengers && Array.isArray(challengers)) {
    // Buscar el índice del intervalo actual en el array de challengers
    const foundIndex = challengers.findIndex(
      (challenger) => challenger.interval_id === current_interval
    );
    if (foundIndex !== -1) {
      currentIntervalF = foundIndex;
    }
  } else if (
    !active_competence() &&
    challengers &&
    Array.isArray(challengers)
  ) {
    // Si la competencia no está activa, mostrar el último intervalo
    currentIntervalF = Math.max(0, challengers.length - 1);
  }

  const [currentInterval, setCurrentInterval] = useState(currentIntervalF);

  const disabledActionButton = (finish_date_time, state) => {
    const currentDate = new Date();
    const finishDate = new Date(finish_date_time);
    return currentDate > finishDate || state.is_completed || state.is_load;
  };

  const updateActivityState = (updatedActivity) => {
    setData((prevData) =>
      prevData.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
  };

  const columns = [
    {
      title: "Actividad",
      width: 100,
      render: (state) => (
        <Flex vertical align="top">
          <strong>{state.activity.name}</strong>
        </Flex>
      ),
    },
    {
      width: 100,
      hidden: isMobile,
      title: "Categoría",
      render: (state) => (
        <Tag
          style={{
            backgroundColor: "rgba(10, 95, 224, 0.1)",
            color: "#0A5FE0",
            border: "1px solid rgba(10, 95, 224, 0.3)",
          }}
        >
          {state.activity.category.name}
        </Tag>
      ),
    },
    {
      title: "Inicia",
      width: 100,
      hidden: isMobile,
      align: "center",
      render: (state) => (
        <Tag color="green-inverse"> {state.interval?.start_date || "N/A"}</Tag>
      ),
    },
    {
      title: "Fechas",
      width: 100,
      hidden: !isMobile,
      align: "center",
      render: (x) => (
        <Flex gap="small" align="center" vertical>
          <Tag color="green-inverse"> {x.interval?.start_date || "N/A"}</Tag>
          <Tag
            style={{
              backgroundColor: "rgba(10, 95, 224, 0.1)",
              color: "#0A5FE0",
              border: "1px solid rgba(10, 95, 224, 0.3)",
            }}
          >
            {x.interval?.end_date || "N/A"}
          </Tag>
          <AddAnswerUser
            state={x}
            disabledAction={disabledActionButton(x.finish_date_time, x)}
            updateActivityState={updateActivityState}
          />
        </Flex>
      ),
    },
    {
      title: "Finaliza",
      width: 100,
      hidden: isMobile,
      align: "center",
      render: (state) => (
        <Tag
          style={{
            backgroundColor: "rgba(10, 95, 224, 0.1)",
            color: "#0A5FE0",
            border: "1px solid rgba(10, 95, 224, 0.3)",
          }}
        >
          {state.interval?.end_date || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Estado",
      width: 100,
      hidden: isMobile,
      align: "center",
      render: (state) => {
        console.log(today);
        console.log(state.interval.end_date);
        if (state.is_completed) {
          return "completado";
        } else if (state.is_load && today === state.interval.end_date) {
          return (
            <>
              en evaluación <Spin size="small" />
            </>
          );
        } else if (state.is_load && today > state.interval.end_date) {
          return "incompleto";
        } else {
          console.log(state);
          return "sin realizar";
        }
      },
    },
    {
      width: 100,
      hidden: location.pathname === "/profile_competition" || isMobile,
      align: "center",

      render: (state) => {
        return (
          <AddAnswerUser
            state={state}
            disabledAction={disabledActionButton(state.finish_date_time, state)}
            updateActivityState={updateActivityState}
          />
        );
      },
    },
  ];

  const extra = () => {
    // Verificar que challengers existe y es un array
    if (
      !challengers ||
      !Array.isArray(challengers) ||
      challengers.length === 0
    ) {
      return null;
    }

    const nextInterval = () => {
      if (currentInterval - 1 >= 0) {
        setCurrentInterval(currentInterval - 1);
        if (challengers[currentInterval - 1]?.data?.user?.activities) {
          setData(challengers[currentInterval - 1].data.user.activities);
        }
      }
    };

    const previousInterval = () => {
      if (currentInterval + 1 < challengers.length) {
        setCurrentInterval(currentInterval + 1);
        if (challengers[currentInterval + 1]?.data?.user?.activities) {
          setData(challengers[currentInterval + 1].data.user.activities);
        }
      }
    };

    // Formateador seguro de fechas (dd-mmmm) sin offsets manuales
    const formatDM = (dateString) => {
      if (!dateString) return "dd-m";
      try {
        const dt = parseDateYMDLocal(dateString);
        if (!dt || isNaN(dt.getTime())) return "dd-m";
        return dt.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
        });
      } catch (_) {
        return "dd-m";
      }
    };

    if (location.pathname === "/profile_competition") {
      return (
        <Flex
          gap="small"
          align="end"
          style={{
            marginTop: "5px",
            marginBottom: "10px",
            padding: "5px",
            borderRadius: "0px",
          }}
        >
          {data && data.length > 0 && (
            <>
              <Button
                shape="round"
                type="default"
                onClick={nextInterval}
                disabled={currentInterval === 0}
              >
                <ArrowLeftOutlined />
                <div style={{ fontSize: "10px", marginLeft: "5px" }}>
                  {currentInterval > 0 && challengers[currentInterval - 1] ? (
                    <>
                      {formatDM(challengers[currentInterval - 1].start_date)}
                      <br />
                      {formatDM(challengers[currentInterval - 1].end_date)}
                    </>
                  ) : (
                    <>
                      dd-m
                      <br />
                      dd-m
                    </>
                  )}
                </div>
              </Button>
              <div
                size="small"
                style={{
                  fontSize: "12px",
                  backgroundColor: "rgba(10, 95, 224, 0.1)",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  color: "#0A5FE0",
                  fontWeight: "600",
                  border: "1px solid rgba(10, 95, 224, 0.3)",
                  textAlign: "center",
                  minWidth: "80px",
                }}
              >
                <div style={{ textAlign: "center", marginBottom: "4px" }}>
                  <CalendarOutlined
                    style={{
                      color: "#0A5FE0",
                      fontSize: "14px",
                    }}
                  />
                </div>
                {challengers[currentInterval] ? (
                  <>
                    {formatDM(challengers[currentInterval].start_date)}
                    <br />
                    {formatDM(challengers[currentInterval].end_date)}
                  </>
                ) : (
                  <>
                    dd-m
                    <br />
                    dd-m
                  </>
                )}
              </div>
              <Button
                shape="round"
                type={"default"}
                onClick={previousInterval}
                disabled={
                  currentInterval + 1 >=
                  (
                    challengers?.filter(
                      (interval) => interval.start_date <= today
                    ) || []
                  ).length
                }
              >
                <div style={{ fontSize: "10px", marginRight: "5px" }}>
                  {currentInterval < challengers.length - 1 &&
                  challengers[currentInterval + 1] ? (
                    <>
                      {formatDM(challengers[currentInterval + 1].start_date)}{" "}
                      <CalendarOutlined />
                      <br />
                      {formatDM(challengers[currentInterval + 1].end_date)}{" "}
                      <CalendarFilled />
                    </>
                  ) : (
                    <>
                      dd-m
                      <br />
                      dd-m
                    </>
                  )}
                </div>
                <ArrowRightOutlined />
              </Button>
            </>
          )}
        </Flex>
      );
    } else {
      return challengers
        ? `${challengers?.start_date || "MM-DD"} / ${
            challengers?.end_date || "MM-DD"
          }`
        : "MM-DD / MM-DD";
    }
  };

  useEffect(() => {
    const current_interval =
      state?.user?.enterprise_competition_overflow?.last_competence?.stats
        ?.current_interval_data?.id;
    if (
      location.pathname === "/profile_competition" &&
      challengers &&
      Array.isArray(challengers)
    ) {
      const changeInterval = challengers.findIndex(
        (challenger) => challenger.interval_id === current_interval
      );

      dataSource();
    } else {
      setCurrentInterval(0);

      dataSource();
    }
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [challengers]);

  const dataSource = () => {
    if (!challengers) {
      return [];
    }

    // Verificar si challengers es un array (profile_competition) o un objeto (dashboard)
    if (Array.isArray(challengers)) {
      // Filtrar intervalos: mostrar el actual y todos los terminados
      const today = new Date().toISOString().split("T")[0];
      const validChallengers = challengers.filter((interval) => {
        // Incluir intervalos que han comenzado (start_date <= today)
        // y que han terminado (end_date < today) o están en curso
        return interval.start_date <= today;
      });

      if (
        location.pathname === "/profile_competition" &&
        validChallengers.length > 0
      ) {
        if (active_competence()) {
          setData(
            validChallengers[currentInterval]?.data?.user?.activities ?? []
          );
          return validChallengers[0]?.data?.user?.activities ?? [];
        } else {
          setData(validChallengers[0]?.data?.user?.activities ?? []);
        }
      }
    } else {
      // Para dashboard, challengers es un objeto
      setData(challengers?.user ?? []);
      return challengers?.user ?? [];
    }

    return [];
  };
  return (
    <>
      <Card
        title={
          <Flex gap="small" align="center" justify="space-between">
            <Flex gap="small" style={{ color: "#0A5FE0", fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
              {window.innerWidth > 726 && <OrderedListOutlined style={{ color: "#0A5FE0" }} />}{" "}
              {location.pathname === "/profile_competition"
                ? window.innerWidth > 726 && "Tus pruebas en competencía"
                : "Tus pruebas"}
            </Flex>
            <Flex>{extra()}</Flex>
          </Flex>
        }
        headStyle={{
          borderBottom: "1px solid rgba(10, 95, 224, 0.2)",
        }}
        style={{
          ...styles.table,
          marginBottom: "16px",
        }}
      >
        {(() => {
          const startDate = parseDateYMDLocal(
            state.user.enterprise_competition_overflow.last_competence
              .start_date
          );
          const endDate = parseDateYMDLocal(
            state.user.enterprise_competition_overflow.last_competence.end_date
          );
          const today = normalizeDateOnly(new Date());

          if (today < startDate) {
            return (
              <Flex style={{ marginBottom: "8px" }}>
                <Tag
                  style={{
                    backgroundColor: "rgba(18, 227, 194, 0.1)",
                    color: "rgba(18, 227, 194, 0.9)",
                    border: "1px solid rgba(18, 227, 194, 0.03)",
                  }}
                >
                  {`La competencia comenzará el ${startDate.toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}`}
                </Tag>
              </Flex>
            );
          } else if (today > endDate) {
            return (
              <Flex style={{ marginBottom: "8px" }}>
                <Tag
                  style={{
                    backgroundColor: "rgba(10, 95, 224, 0.1)",
                    color: "#0A5FE0",
                    border: "1px solid rgba(10, 95, 224, 0.3)",
                  }}
                >
                  {`La competencia terminó el ${endDate.toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}`}
                </Tag>
              </Flex>
            );
          }
          return null;
        })()}
        <Flex gap="large" vertical justify="space-between">
          {location.pathname === "/profile_competition" && (
            <Flex gap="small" justify="space-between" vertical={isMobile}>
              <Card size="small" hoverable style={{ width: "100%" }}>
                <Statistic
                  value={(() => {
                    // Contar actividades agendadas solo del intervalo actual
                    if (challengers[currentInterval]?.data?.user?.activities) {
                      return challengers[currentInterval].data.user.activities
                        .length;
                    }
                    return 0;
                  })()}
                  title="Agendadas"
                  valueStyle={{ textAlign: "center" }}
                />
              </Card>

              <Card size="small" hoverable style={{ width: "100%" }}>
                <Statistic
                  value={(() => {
                    // Contar actividades completadas solo del intervalo actual
                    if (challengers[currentInterval]?.data?.user?.activities) {
                      return challengers[
                        currentInterval
                      ].data.user.activities.filter(
                        (activity) => activity.is_completed
                      ).length;
                    }
                    return 0;
                  })()}
                  title="Completadas"
                  valueStyle={{ textAlign: "center" }}
                />
              </Card>

              <Card size="small" hoverable style={{ width: "100%" }}>
                <Statistic
                  value={(() => {
                    // Contar actividades incompletas solo del intervalo actual
                    if (challengers[currentInterval]?.data?.user?.activities) {
                      const today = new Date().toISOString().split("T")[0];
                      return challengers[
                        currentInterval
                      ].data.user.activities.filter(
                        (activity) =>
                          !activity.is_completed &&
                          activity.is_load &&
                          today > activity.interval.end_date
                      ).length;
                    }
                    return 0;
                  })()}
                  title="Incompletas"
                  valueStyle={{ textAlign: "center" }}
                />
              </Card>

              <Card size="small" hoverable style={{ width: "100%" }}>
                <Statistic
                  value={(() => {
                    // Contar actividades sin realizar solo del intervalo actual
                    if (challengers[currentInterval]?.data?.user?.activities) {
                      return challengers[
                        currentInterval
                      ].data.user.activities.filter(
                        (activity) =>
                          !activity.is_completed && !activity.is_load
                      ).length;
                    }
                    return 0;
                  })()}
                  title="Sin Realizar"
                  valueStyle={{ textAlign: "center" }}
                />
              </Card>
            </Flex>
          )}

          <Flex vertical>
            <Table
              size="small"
              dataSource={data}
              bordered={true}
              pagination={false}
              columns={columns}
            />
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

const styles = {
  table: {
    width: "100%",
    background:
      "linear-gradient(135deg, rgba(10, 95, 224, 0.05) 0%, rgba(18, 227, 194, 0.03) 100%)",
    border: "1px solid rgba(10, 95, 224, 0.2)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(10, 95, 224, 0.1)",
  },
};

export default UserChallenge;
