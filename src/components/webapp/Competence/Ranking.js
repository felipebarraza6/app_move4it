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
      title={
        <Text
          style={{
            fontSize: "18px",
            color: "rgba(10, 95, 224, 0.8)",
            fontWeight: "700",
            fontFamily: "'Montserrat', sans-serif"
          }}
        >
          <TrophyFilled
            style={{
              color: "rgba(10, 95, 224, 0.8)",
              marginRight: "10px",
            }}
          />
          Ranking General
        </Text>
      }
      style={{
        width: "100%",
        background:
          "linear-gradient(135deg, rgba(10, 95, 224, 0.05) 0%, rgba(18, 227, 194, 0.03) 100%)",
        border: "1px solid rgba(10, 95, 224, 0.2)",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(10, 95, 224, 0.1)",
      }}
    >
      <Flex vertical gap={"large"} style={{ width: "100%" }}>
        {isFirstInterval && intervals.length === 1 ? (
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(10, 95, 224, 0.03) 0%, rgba(18, 227, 194, 0.02) 100%)",
              border: "1px solid rgba(10, 95, 224, 0.1)",
              borderRadius: "12px",
              textAlign: "center",
              padding: "30px 20px",
            }}
          >
            <TrophyFilled
              style={{
                fontSize: "32px",
                color: "rgba(10, 95, 224, 0.3)",
                marginBottom: "12px",
              }}
            />
            <Text
              style={{
                fontSize: "15px",
                color: "rgba(10, 95, 224, 0.8)",
                fontWeight: "600",
                display: "block",
                marginBottom: "4px",
              }}
            >
              El ranking se activara al finalizar el primer intervalo
            </Text>
            <Tag color="cyan">
              Próximo cierre: {intervals[0]?.end_date || "---"}
            </Tag>
          </div>
        ) : (
          <List
            size="small"
            dataSource={data}
            locale={{ emptyText: "El ranking se activara al finalizar el primer intervalo" }}
            renderItem={(item) => (
              <List.Item style={{ textAlign: "left" }}>
                <Flex justify="start" style={{ width: "100%" }}>
                  <Tag
                    style={{
                      backgroundColor:
                        item.name === name_my_team
                          ? "rgba(10, 95, 224, 0.8)"
                          : "rgba(10, 95, 224, 0.1)",
                      color:
                        item.name === name_my_team
                          ? "white"
                          : "rgba(10, 95, 224, 0.8)",
                      border: "1px solid rgba(10, 95, 224, 0.3)",
                      fontWeight: "600",
                    }}
                  >
                    {item.position}
                  </Tag>
                  <Tag
                    style={{
                      backgroundColor:
                        item.name === name_my_team
                          ? "rgba(10, 95, 224, 0.8)"
                          : "rgba(10, 95, 224, 0.1)",
                      color:
                        item.name === name_my_team
                          ? "white"
                          : "rgba(10, 95, 224, 0.8)",
                      border: "1px solid rgba(10, 95, 224, 0.3)",
                      fontWeight: "600",
                    }}
                  >
                    {item.name}
                  </Tag>
                  <Tag
                    style={{
                      backgroundColor:
                        item.name === name_my_team
                          ? "rgba(10, 95, 224, 0.8)"
                          : "rgba(10, 95, 224, 0.1)",
                      color:
                        item.name === name_my_team
                          ? "white"
                          : "rgba(10, 95, 224, 0.8)",
                      border: "1px solid rgba(10, 95, 224, 0.3)",
                      fontWeight: "600",
                    }}
                  >
                    {item.points}
                  </Tag>
                </Flex>
              </List.Item>
            )}
            header={
              selectedInterval && (
                <Flex justify="flex-end" style={{ width: "100%" }}>
                  <Flex align="center">
                    <Text
                      style={{ fontSize: "14px", color: "rgba(10, 95, 224, 0.7)" }}
                    >
                      {
                        intervals.find(
                          (interval) => interval.interval_id === selectedInterval
                        )?.end_date
                      }
                    </Text>
                  </Flex>
                </Flex>
              )
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
                          ? "rgba(10, 95, 224, 0.1)"
                          : "transparent",
                      borderColor: "rgba(10, 95, 224, 0.3)",
                      color: "rgba(10, 95, 224, 0.8)",
                      fontWeight: "500",
                    }}
                    icon={
                      i.interval_id === selectedInterval ? (
                        <CalendarFilled
                          style={{
                            marginRight: "5px",
                            color: "rgba(10, 95, 224, 0.8)",
                          }}
                        />
                      ) : (
                        <CalendarOutlined
                          style={{
                            marginRight: "5px",
                            color: "rgba(10, 95, 224, 0.05)",
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
