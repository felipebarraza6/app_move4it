import React, { useContext, useState, useEffect } from "react";
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

  // Filtrar solo intervalos terminados
  const todayString = new Date().toISOString().split("T")[0];
  const intervals = allIntervals.filter(
    (interval) => interval.end_date < todayString
  );

  const currentIntervalValue =
    state.user.enterprise_competition_overflow.last_competence.stats
      .current_interval_data;

  const sourcesActive =
    state.user.enterprise_competition_overflow.last_competence.stats.my_team;

  const [currentInterval, setCurrentInterval] = useState(0); // Inicializar en 0

  const nextInterval = () => {
    if (currentInterval < intervals.length - 1) {
      setCurrentInterval((prevInterval) => prevInterval + 1);
    }
  };

  const previousInterval = () => {
    if (currentInterval > 0) {
      setCurrentInterval((prevInterval) => prevInterval - 1);
    }
  };

  useEffect(() => {
    if (intervals.length > 0) {
      setCurrentInterval(intervals.length - 1); // Empezar en el último intervalo si hay intervalos
    } else {
      setCurrentInterval(0); // Si no hay intervalos, mantener en 0
    }
  }, [intervals]);

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
      {competitionNotStarted && (
        <Card style={{ marginBottom: "16px" }}>
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
        </Card>
      )}
      {competitionEnded && (
        <Card style={{ marginBottom: "16px" }}>
          <Tag color="blue">
            {`La competencia terminó el ${endDate.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}`}
          </Tag>
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
                "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
              border: "1px solid rgba(15,120,142,0.2)",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(15,120,142,0.1)",
            }}
          >
            <Descriptions
              bordered
              column={2}
              title={
                <Text
                  style={{
                    fontSize: "18px",
                    color: "rgba(15,120,142,0.8)",
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
                      backgroundColor: "rgba(15,120,142,0.1)",
                      color: "rgba(15,120,142,0.8)",
                      border: "1px solid rgba(15,120,142,0.3)",
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
                      backgroundColor: "rgba(15,120,142,0.1)",
                      color: "rgba(15,120,142,0.8)",
                      border: "1px solid rgba(15,120,142,0.3)",
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
                          color: "rgba(15,120,142,0.8)",
                          border: "1px solid rgba(15,120,142,0.3)",
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
      <Flex
        gap="small"
        justify="center"
        style={{ marginTop: "16px", marginBottom: "8px" }}
      >
        {currentIntervalValue &&
          intervals.length > 1 &&
          intervals[currentInterval] && (
            <>
              <Button
                shape="round"
                onClick={previousInterval}
                disabled={currentInterval === 0}
                style={{
                  backgroundColor:
                    currentInterval === 0
                      ? "rgba(15,120,142,0.1)"
                      : "rgba(15,120,142,0.8)",
                  borderColor: "rgba(15,120,142,0.3)",
                  color:
                    currentInterval === 0 ? "rgba(15,120,142,0.4)" : "white",
                  fontWeight: "600",
                  boxShadow:
                    currentInterval === 0
                      ? "none"
                      : "0 2px 8px rgba(15,120,142,0.3)",
                }}
              >
                <ArrowLeftOutlined />
                Anterior
              </Button>
              <Button
                shape="round"
                onClick={nextInterval}
                disabled={currentInterval >= intervals.length - 1}
                style={{
                  backgroundColor:
                    currentInterval >= intervals.length - 1
                      ? "rgba(15,120,142,0.1)"
                      : "rgba(15,120,142,0.8)",
                  borderColor: "rgba(15,120,142,0.3)",
                  color:
                    currentInterval >= intervals.length - 1
                      ? "rgba(15,120,142,0.4)"
                      : "white",
                  fontWeight: "600",
                  boxShadow:
                    currentInterval >= intervals.length - 1
                      ? "none"
                      : "0 2px 8px rgba(15,120,142,0.3)",
                }}
              >
                Siguiente <ArrowRightOutlined />
              </Button>
            </>
          )}
      </Flex>
    </Flex>
  );
};

export default IntervalsTable;
