import React, { useContext, useState, useEffect } from "react";
import {
  List,
  Typography,
  Tag,
  Card,
  Flex,
  Row,
  Segmented,
  Button,
  Col,
} from "antd";
import {
  TrophyFilled,
  CalendarOutlined,
  CalendarFilled,
} from "@ant-design/icons";
import { AppContext } from "../../../App";

const { Text } = Typography;

const Ranking = () => {
  const { state } = useContext(AppContext);
  const name_my_team = state.user.group_participation.name;
  const teams =
    state.user.enterprise_competition_overflow.last_competence.stats.teams;

  const intervals =
    state.user.enterprise_competition_overflow.last_competence.ranking
      .intervals;

  const [selectedInterval, setSelectedInterval] = useState(null);
  const [rankingList, setRankingList] = useState([]);

  useEffect(() => {
    if (intervals.length > 0) {
      const lastInterval = intervals[intervals.length - 1];
      setSelectedInterval(lastInterval.interval_id);
      setRankingList(lastInterval.ranking);
    }
  }, [intervals]);

  const handleIntervalChange = (value) => {
    const selectedInterval = intervals.find(
      (interval) => interval.interval_id === value
    );
    setRankingList(selectedInterval.ranking);
    setSelectedInterval(value);
  };

  const data = rankingList.map((team, index) => ({
    key: index,
    position: index + 1,
    name: team.team_name,
    points: team.points,
  }));

  // Verificar si estamos en el primer intervalo
  const currentIntervalData =
    state.user.enterprise_competition_overflow.last_competence.stats
      .current_interval_data;
  const isFirstInterval =
    currentIntervalData && currentIntervalData.id === intervals[0]?.interval_id;

  return (
    <Card
      size="small"
      style={{
        width: "100%",
        background:
          "linear-gradient(135deg, rgba(15,120,142,0.05) 0%, rgba(230,184,0,0.03) 100%)",
        border: "1px solid rgba(15,120,142,0.2)",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(15,120,142,0.1)",
      }}
    >
      <Flex vertical gap={"large"} style={{ width: "100%" }}>
        {isFirstInterval && intervals.length === 1 ? (
          <Card
            style={{
              background:
                "linear-gradient(135deg, rgba(15,120,142,0.1) 0%, rgba(230,184,0,0.05) 100%)",
              border: "1px solid rgba(15,120,142,0.3)",
              borderRadius: "12px",
              textAlign: "center",
              padding: "24px",
            }}
          >
            <TrophyFilled
              style={{
                fontSize: "48px",
                color: "rgba(15,120,142,0.6)",
                marginBottom: "16px",
              }}
            />
            <Text
              style={{
                fontSize: "18px",
                color: "rgba(15,120,142,0.8)",
                fontWeight: "600",
                display: "block",
                marginBottom: "8px",
              }}
            >
              <TrophyFilled style={{ marginRight: "8px" }} />
              Ranking en Proceso
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "rgba(15,120,142,0.7)",
                display: "block",
                marginBottom: "12px",
              }}
            >
              El ranking estará disponible después del primer intervalo
            </Text>
            <Text
              style={{
                fontSize: "12px",
                color: "rgba(15,120,142,0.6)",
                display: "block",
              }}
            >
              Fecha estimada: {intervals[0]?.end_date || "Próximamente"}
            </Text>
          </Card>
        ) : (
          <List
            size="small"
            dataSource={data}
            renderItem={(item) => (
              <List.Item style={{ textAlign: "left" }}>
                <Flex justify="start" style={{ width: "100%" }}>
                  <Tag
                    style={{
                      backgroundColor:
                        item.name === name_my_team
                          ? "rgba(15,120,142,0.8)"
                          : "rgba(15,120,142,0.1)",
                      color:
                        item.name === name_my_team
                          ? "white"
                          : "rgba(15,120,142,0.8)",
                      border: "1px solid rgba(15,120,142,0.3)",
                      fontWeight: "600",
                    }}
                  >
                    {item.position}
                  </Tag>
                  <Tag
                    style={{
                      backgroundColor:
                        item.name === name_my_team
                          ? "rgba(15,120,142,0.8)"
                          : "rgba(15,120,142,0.1)",
                      color:
                        item.name === name_my_team
                          ? "white"
                          : "rgba(15,120,142,0.8)",
                      border: "1px solid rgba(15,120,142,0.3)",
                      fontWeight: "600",
                    }}
                  >
                    {item.name}
                  </Tag>
                  <Tag
                    style={{
                      backgroundColor:
                        item.name === name_my_team
                          ? "rgba(15,120,142,0.8)"
                          : "rgba(15,120,142,0.1)",
                      color:
                        item.name === name_my_team
                          ? "white"
                          : "rgba(15,120,142,0.8)",
                      border: "1px solid rgba(15,120,142,0.3)",
                      fontWeight: "600",
                    }}
                  >
                    {item.points}
                  </Tag>
                </Flex>
              </List.Item>
            )}
            header={
              <Flex justify="space-between" style={{ width: "100%" }}>
                <Text
                  style={{
                    fontSize: "20px",
                    color: "rgba(15,120,142,0.8)",
                    fontWeight: "600",
                  }}
                >
                  <TrophyFilled
                    style={{
                      color: "rgba(15,120,142,0.8)",
                      marginRight: "10px",
                    }}
                  />
                  Ranking
                </Text>

                <Flex align="center">
                  <CalendarFilled
                    style={{
                      color: "rgba(15,120,142,0.8)",
                      marginRight: "10px",
                    }}
                  />
                  <Text
                    style={{ fontSize: "14px", color: "rgba(15,120,142,0.7)" }}
                  >
                    {
                      intervals.find(
                        (interval) => interval.interval_id === selectedInterval
                      )?.end_date
                    }
                  </Text>
                </Flex>
              </Flex>
            }
          />
        )}
        {intervals.length > 0 && (
          <Row>
            {intervals
              .slice()
              .reverse()
              .map((i) => (
                <Col span={8} key={i.interval_id}>
                  <Button
                    type={""}
                    onClick={() => handleIntervalChange(i.interval_id)}
                    size="small"
                    style={{
                      marginRight: "5px",
                      marginBottom: "5px",
                      backgroundColor:
                        i.interval_id === selectedInterval
                          ? "rgba(15,120,142,0.1)"
                          : "transparent",
                      borderColor: "rgba(15,120,142,0.3)",
                      color: "rgba(15,120,142,0.8)",
                      fontWeight: "500",
                    }}
                    icon={
                      i.interval_id === selectedInterval ? (
                        <CalendarFilled
                          style={{
                            marginRight: "5px",
                            color: "rgba(15,120,142,0.8)",
                          }}
                        />
                      ) : (
                        <CalendarOutlined
                          style={{
                            marginRight: "5px",
                            color: "rgba(15,120,142,0.5)",
                          }}
                        />
                      )
                    }
                  >
                    {" "}
                    {i.end_date}{" "}
                  </Button>
                </Col>
              ))}{" "}
          </Row>
        )}
      </Flex>
    </Card>
  );
};

export default Ranking;
