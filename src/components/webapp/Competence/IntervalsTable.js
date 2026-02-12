import React, { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { Descriptions, Button, Card, Flex, List, Tag, Typography } from "antd";
import { parseDateYMDLocal, normalizeDateOnly } from "../../../utils/date";
import {
  CalendarFilled,
  CalendarOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const IntervalsTable = () => {
  const { state } = useContext(AppContext);

  const allIntervals =
    state.user.enterprise_competition_overflow.last_competence
      .intervals_to_back;

  // Filtrar solo intervalos terminados y ordenar por fecha de finalización (más reciente primero)
  const todayString = new Date().toISOString().split("T")[0];
  const intervals = allIntervals
    .filter((interval) => interval.end_date < todayString)
    .sort((a, b) => {
      // Ordenar descendente: el más reciente primero (índice 0)
      return parseDateYMDLocal(b.end_date) - parseDateYMDLocal(a.end_date);
    });

  const currentIntervalValue =
    state.user.enterprise_competition_overflow.last_competence.stats
      .current_interval_data;

  const sourcesActive =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team;

  // Inicializar en 0 para empezar con el intervalo más reciente
  const [currentInterval, setCurrentInterval] = useState(0);

  const previousInterval = () => {
    // Navegar hacia la izquierda = ir al pasado (intervalos más antiguos, índice mayor)
    if (currentInterval < intervals.length - 1) {
      setCurrentInterval((prevInterval) => prevInterval + 1);
    }
  };

  const nextInterval = () => {
    // Navegar hacia la derecha = ir al futuro (intervalos más recientes, índice menor)
    if (currentInterval > 0) {
      setCurrentInterval((prevInterval) => prevInterval - 1);
    }
  };

  // Verificar estado de la competencia
  const startDate = parseDateYMDLocal(
    state.user.enterprise_competition_overflow.last_competence.start_date
  );
  const endDate = parseDateYMDLocal(
    state.user.enterprise_competition_overflow.last_competence.end_date
  );
  const today = normalizeDateOnly(new Date());

  const competitionNotStarted = today < startDate;
  const competitionEnded = today > endDate;
  const competitionActive = today >= startDate && today <= endDate;

  return (
    <Flex vertical style={{ width: "100%" }}>
    
      {competitionEnded &&
        intervals.length > 0 &&
        intervals[currentInterval] && (
          <Card
            key={intervals[currentInterval].interval_id}
            style={{
              background:
                "linear-gradient(135deg, rgba(10, 95, 224, 0.05) 0%, rgba(18, 227, 194, 0.03) 100%)",
              border: "1px solid rgba(10, 95, 224, 0.2)",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(10, 95, 224, 0.1)",
              marginBottom: "16px",
            }}
          >
            <Descriptions
              bordered
              extra={
                <Flex
                  gap="small"
                  justify="center"
                  align="center"
                  style={{ marginTop: "16px", marginBottom: "8px" }}
                >
                  {((currentIntervalValue && competitionActive) ||
                    competitionEnded) &&
                    intervals.length > 1 &&
                    intervals[currentInterval] && (
                      <>
                        {/* Botón izquierdo: ir al pasado (intervalos más antiguos) */}
                        <Button
                          shape="round"
                          type="default"
                          disabled={currentInterval >= intervals.length - 1}
                          onClick={previousInterval}
                          style={{
                            backgroundColor: "rgba(10, 95, 224, 0.1)",
                            borderColor: "rgba(10, 95, 224, 0.3)",
                            color: "rgba(10, 95, 224, 0.8)",
                          }}
                        >
                          <ArrowLeftOutlined />
                          <div style={{ fontSize: "10px", marginLeft: "5px" }}>
                            {currentInterval < intervals.length - 1 &&
                            intervals[currentInterval + 1] ? (
                              <>
                                {parseDateYMDLocal(
                                  intervals[currentInterval + 1].start_date
                                ).toLocaleDateString("es-ES", {
                                  day: "2-digit",
                                  month: "short",
                                })}{" "}
                                <br />
                                {parseDateYMDLocal(
                                  intervals[currentInterval + 1].end_date
                                ).toLocaleDateString("es-ES", {
                                  day: "2-digit",
                                  month: "short",
                                })}{" "}
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

                        {/* Indicador del intervalo actual */}
                        <div
                          style={{
                            fontSize: "12px",
                            backgroundColor: "rgba(10, 95, 224, 0.1)",
                            padding: "12px 16px",
                            marginTop: "8px",
                            marginBottom: "8px",
                            borderRadius: "8px",
                            color: "rgba(10, 95, 224, 0.8)",
                            fontWeight: "600",
                            border: "1px solid rgba(10, 95, 224, 0.3)",
                            textAlign: "center",
                            minWidth: "80px",
                          }}
                        >
                          <div
                            style={{ textAlign: "center", marginBottom: "4px" }}
                          ></div>
                          {intervals[currentInterval] ? (
                            <>
                              {parseDateYMDLocal(
                                intervals[currentInterval].start_date
                              ).toLocaleDateString("es-ES", {
                                day: "2-digit",
                                month: "short",
                              })}{" "}
                              <CalendarOutlined />
                              <br />
                              {parseDateYMDLocal(
                                intervals[currentInterval].end_date
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

                        {/* Botón derecho: ir al futuro (intervalos más recientes) */}
                        <Button
                          shape="round"
                          type="default"
                          disabled={currentInterval === 0}
                          onClick={nextInterval}
                          style={{
                            backgroundColor: "rgba(10, 95, 224, 0.1)",
                            borderColor: "rgba(10, 95, 224, 0.3)",
                            color: "rgba(10, 95, 224, 0.8)",
                          }}
                        >
                          <div style={{ fontSize: "10px", marginRight: "5px" }}>
                            {currentInterval > 0 &&
                            intervals[currentInterval - 1] ? (
                              <>
                                {parseDateYMDLocal(
                                  intervals[currentInterval - 1].start_date
                                ).toLocaleDateString("es-ES", {
                                  day: "2-digit",
                                  month: "short",
                                })}{" "}
                                <CalendarOutlined />
                                <br />
                                {parseDateYMDLocal(
                                  intervals[currentInterval - 1].end_date
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
              }
              column={2}
              title={
                <Text
                  style={{
                    fontSize: "18px",
                    color: "rgba(10, 95, 224, 0.8)",
                    fontWeight: "600",
                  }}
                >
                  Pruebas por intervalo
                </Text>
              }
            >
              <Descriptions.Item
                label={
                  <>
                    <UnorderedListOutlined style={{ marginRight: 8 }} /> Pruebas
                  </>
                }
              >
                <List
                  dataSource={intervals[currentInterval].activities}
                  grid={{
                    gutter: window.innerWidth > 900 ? 16 : 1,
                    column: window.innerWidth > 900 ? 4 : 1,
                  }}
                  renderItem={(r) => (
                    <List.Item>
                      <p
                        style={{
                          color: "rgba(10, 95, 224, 0.8)",
                          border: "1px solid rgba(10, 95, 224, 0.3)",
                          borderRadius: "5px",
                          textAlign: "center",
                          padding: "2px",
                        }}
                      >
                        {r}
                      </p>
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      {currentIntervalValue &&
        competitionActive &&
        intervals.length > 0 &&
        intervals[currentInterval] && (
          <Card
            key={intervals[currentInterval].interval_id}
            style={{
              background:
                "linear-gradient(135deg, rgba(10, 95, 224, 0.05) 0%, rgba(18, 227, 194, 0.03) 100%)",
              border: "1px solid rgba(10, 95, 224, 0.2)",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(10, 95, 224, 0.1)",
            }}
          >
            <Descriptions
              bordered
              column={2}
              title={
                <Text
                  style={{
                    fontSize: "18px",
                    color: "rgba(10, 95, 224, 0.8)",
                    fontWeight: "600",
                  }}
                >
                  Pruebas por intervalo
                </Text>
              }
            >
              <Descriptions.Item
                label={
                  <>
                    <CalendarOutlined style={{ marginRight: 8 }} /> Fecha inicio
                  </>
                }
                span={window.innerWidth > 900 ? 1 : 3}
              >
                {sourcesActive && (
                  <Tag
                    style={{
                      backgroundColor: "rgba(10, 95, 224, 0.1)",
                      color: "rgba(10, 95, 224, 0.8)",
                      border: "1px solid rgba(10, 95, 224, 0.3)",
                    }}
                  >
                    {intervals[currentInterval].start_date}
                  </Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item
                span={window.innerWidth > 900 ? 1 : 3}
                label={
                  <>
                    <CalendarFilled style={{ marginRight: 8 }} /> Fecha termino
                  </>
                }
              >
                {sourcesActive && (
                  <Tag
                    style={{
                      backgroundColor: "rgba(10, 95, 224, 0.1)",
                      color: "rgba(10, 95, 224, 0.8)",
                      border: "1px solid rgba(10, 95, 224, 0.3)",
                    }}
                  >
                    {intervals[currentInterval].end_date}
                  </Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <UnorderedListOutlined style={{ marginRight: 8 }} /> Pruebas
                  </>
                }
              >
                <List
                  dataSource={intervals[currentInterval].activities}
                  grid={{
                    gutter: window.innerWidth > 900 ? 16 : 1,
                    column: window.innerWidth > 900 ? 4 : 1,
                  }}
                  renderItem={(r) => (
                    <List.Item>
                      <p
                        style={{
                          color: "rgba(10, 95, 224, 0.8)",
                          border: "1px solid rgba(10, 95, 224, 0.3)",
                          borderRadius: "5px",
                          textAlign: "center",
                          padding: "2px",
                        }}
                      >
                        {r}
                      </p>
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
    </Flex>
  );
};

export default IntervalsTable;
