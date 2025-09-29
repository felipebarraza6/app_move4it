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
        title={`Cargar evidencia para actividad "${state.activity.name}"`}
        open={visible}
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
              {(state.activity.points / quantity_participants).toFixed(2)}{" "}
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
                    style={{ width: "100%", backgroundColor: "#f0f0f0" }}
                  >
                    <Button
                      size="large"
                      style={{ color: "#1890ff" }}
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

  let currentIntervalF = [];

  if (current_interval) {
    currentIntervalF =
      challengers.length &&
      challengers.findIndex(
        (challenger) => challenger.interval_id === current_interval
      );
  } else {
    if (!active_competence()) {
      currentIntervalF = 0;
      current_interval = 0;
    }
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
      render: (state) => <Tag color="blue">{state.activity.category.name}</Tag>,
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
          <Tag color="geekblue-inverse">{x.interval?.end_date || "N/A"}</Tag>
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
        <Tag color="geekblue-inverse">{state.interval?.end_date || "N/A"}</Tag>
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
      if (currentInterval + 1 < challengers.length) {
        setCurrentInterval(currentInterval + 1);
        if (challengers[currentInterval + 1]?.data?.user?.activities) {
          setData(challengers[currentInterval + 1].data.user.activities);
        }
      }
    };

    const previousInterval = () => {
      if (currentInterval - 1 >= 0) {
        setCurrentInterval(currentInterval - 1);
        if (challengers[currentInterval - 1]?.data?.user?.activities) {
          setData(challengers[currentInterval - 1].data.user.activities);
        }
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
            borderRadius: "15px",
          }}
        >
          {data && data.length > 0 && (
            <>
              <Button
                shape="round"
                type="default"
                onClick={nextInterval}
                disabled={
                  currentInterval + 1 >=
                  (
                    challengers?.filter(
                      (interval) => interval.start_date <= today
                    ) || []
                  ).length
                }
              >
                <ArrowLeftOutlined />
                <div style={{ fontSize: "10px", marginLeft: "5px" }}>
                  {currentInterval < challengers.length - 1 &&
                  challengers[currentInterval + 1] ? (
                    <>
                      {new Date(
                        new Date(
                          challengers[currentInterval + 1].start_date
                        ).setDate(
                          new Date(
                            challengers[currentInterval + 1].start_date
                          ).getDate() + 1
                        )
                      ).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                      })}
                      <br />
                      {new Date(
                        new Date(
                          challengers[currentInterval + 1].end_date
                        ).setDate(
                          new Date(
                            challengers[currentInterval + 1].end_date
                          ).getDate() + 1
                        )
                      ).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                      })}
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
                  backgroundColor: "#1677ff",
                  padding: "5px",
                  borderRadius: "15px",
                  color: "white",
                  fontWeight: "500",
                }}
              >
                <center>
                  <CalendarOutlined
                    style={{ textAlign: "center", color: "white" }}
                  />
                </center>
                {challengers[currentInterval] ? (
                  <>
                    {new Date(
                      new Date(challengers[currentInterval].start_date).setDate(
                        new Date(
                          challengers[currentInterval].start_date
                        ).getDate() + 1
                      )
                    ).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                    })}
                    <br />
                    {new Date(
                      new Date(challengers[currentInterval].end_date).setDate(
                        new Date(
                          challengers[currentInterval].end_date
                        ).getDate() + 1
                      )
                    ).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                    })}
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
                disabled={currentInterval === 0}
              >
                <div style={{ fontSize: "10px", marginRight: "5px" }}>
                  {currentInterval > 0 && challengers[currentInterval - 1] ? (
                    <>
                      {new Date(
                        new Date(
                          challengers[currentInterval - 1].start_date
                        ).setDate(
                          new Date(
                            challengers[currentInterval - 1].start_date
                          ).getDate() + 1
                        )
                      ).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                      })}{" "}
                      <CalendarOutlined />
                      <br />
                      {new Date(
                        new Date(
                          challengers[currentInterval - 1].end_date
                        ).setDate(
                          new Date(
                            challengers[currentInterval - 1].end_date
                          ).getDate() + 1
                        )
                      ).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                      })}{" "}
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
      // Filtrar intervalos futuros
      const today = new Date().toISOString().split("T")[0];
      const validChallengers = challengers.filter(
        (interval) => interval.start_date <= today
      );

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
            <Flex gap="small">
              {window.innerWidth > 726 && <OrderedListOutlined />}{" "}
              {location.pathname === "/profile_competition"
                ? window.innerWidth > 726 && "Tus pruebas en competencía"
                : "Tus pruebas"}
            </Flex>
            <Flex>{extra()}</Flex>
          </Flex>
        }
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
                <Tag color="orange">
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
                <Tag color="blue">
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
                    // Contar jugadores únicos en todos los intervalos hasta el actual
                    const allPlayers = new Set();
                    const today = new Date().toISOString().split("T")[0];

                    console.log("=== DEBUG PARTICIPANTES ===");
                    console.log("challengers:", challengers);
                    console.log("today:", today);

                    challengers.forEach((interval, index) => {
                      console.log(`Intervalo ${index}:`, interval);
                      console.log(
                        `start_date: ${interval.start_date}, <= today: ${
                          interval.start_date <= today
                        }`
                      );

                      if (interval.start_date <= today) {
                        console.log(
                          "Intervalo válido, buscando participantes..."
                        );
                        console.log("interval.data:", interval.data);
                        console.log(
                          "interval.data?.my_team:",
                          interval.data?.my_team
                        );
                        console.log(
                          "interval.data?.my_team?.activities:",
                          interval.data?.my_team?.activities
                        );

                        // Usar my_team.activities para obtener participantes únicos
                        if (interval.data?.my_team?.activities) {
                          interval.data.my_team.activities.forEach(
                            (activity, actIndex) => {
                              console.log(`Actividad ${actIndex}:`, activity);
                              console.log("activity.user:", activity.user);
                              console.log(
                                "activity.user?.email:",
                                activity.user?.email
                              );

                              if (activity.user?.email) {
                                allPlayers.add(activity.user.email);
                                console.log("Agregado:", activity.user.email);
                              }
                            }
                          );
                        }
                      }
                    });

                    console.log("Total participantes únicos:", allPlayers.size);
                    console.log("Participantes:", Array.from(allPlayers));
                    console.log("=== FIN DEBUG ===");

                    return allPlayers.size;
                  })()}
                  title="Jugadores"
                  valueStyle={{ textAlign: "center" }}
                />
              </Card>
              <Card size="small" hoverable style={{ width: "100%" }}>
                <Statistic
                  value={(() => {
                    // Contar todas las actividades agendadas hasta el intervalo actual
                    let totalActivities = 0;
                    const today = new Date().toISOString().split("T")[0];
                    challengers.forEach((interval) => {
                      if (interval.start_date <= today) {
                        if (interval.data?.user?.activities) {
                          totalActivities +=
                            interval.data.user.activities.length;
                        }
                      }
                    });
                    return totalActivities;
                  })()}
                  title="Pruebas Agendadas"
                  valueStyle={{ textAlign: "center" }}
                />
              </Card>

              <Card size="small" hoverable style={{ width: "100%" }}>
                <Statistic
                  value={(() => {
                    // Contar actividades completadas en todos los intervalos hasta el actual
                    let completedActivities = 0;
                    const today = new Date().toISOString().split("T")[0];
                    challengers.forEach((interval) => {
                      if (interval.start_date <= today) {
                        if (interval.data?.user?.activities) {
                          completedActivities +=
                            interval.data.user.activities.filter(
                              (activity) => activity.is_completed
                            ).length;
                        }
                      }
                    });
                    return completedActivities;
                  })()}
                  title="Completadas"
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
      "linear-gradient(124deg, rgba(255,255,255,1) 0%, rgba(165,171,173,1) 100%",
  },
};

export default UserChallenge;
