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

  return (
    <Card
      size="small"
      style={{
        width: "100%",
        background:
          "linear-gradient(0deg, rgba(15,120,142,0.056481967787114895) 0%, rgba(197,239,255,0.1153054971988795) 35%, rgba(60,87,93,1) 100%)",
      }}
    >
      <Flex vertical gap={"large"} style={{ width: "100%" }}>
        <List
          size="small"
          dataSource={data}
          renderItem={(item) => (
            <List.Item style={{ textAlign: "left" }}>
              <Flex justify="start" style={{ width: "100%" }}>
                <Tag
                  color={item.name === name_my_team ? "blue-inverse" : "blue"}
                >
                  {item.position}
                </Tag>
                <Tag
                  color={item.name === name_my_team ? "blue-inverse" : "blue"}
                >
                  {item.name}
                </Tag>
                <Tag
                  color={item.name === name_my_team ? "blue-inverse" : "blue"}
                >
                  {item.points}
                </Tag>
              </Flex>
            </List.Item>
          )}
          header={
            <Flex justify="space-between" style={{ width: "100%" }}>
              <Text style={{ fontSize: "20px", color: "white" }}>
                <TrophyFilled
                  style={{ color: "#d4b106", marginRight: "10px" }}
                />
                Ranking
              </Text>

              <Flex align="center">
                <CalendarFilled
                  style={{ color: "#d4b106", marginRight: "10px" }}
                />
                <Text style={{ fontSize: "14px", color: "white" }}>
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
                    style={{ marginRight: "5px", marginBottom: "5px" }}
                    icon={
                      i.interval_id === selectedInterval ? (
                        <CalendarFilled
                          style={{ marginRight: "5px", color: "#d4b106" }}
                        />
                      ) : (
                        <CalendarOutlined style={{ marginRight: "5px" }} />
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
