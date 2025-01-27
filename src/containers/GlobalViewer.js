import React, { useState, useEffect } from "react";
import { endpoints } from "../config/endpoints";
import {
  List,
  Typography,
  Tag,
  Card,
  Select,
  Flex,
  Button,
  Table,
  Segmented,
} from "antd";
import {
  TrophyFilled,
  FilterOutlined,
  RightCircleFilled,
  CalendarOutlined,
  CalendarFilled,
} from "@ant-design/icons";

const { Text, Title } = Typography;
const { Option } = Select;

const GlobalViewer = () => {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [rankingList, setRankingList] = useState([]);
  const [error, setError] = useState(null);
  const [intervals, setIntervals] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState(null);
  const [dataOverflow, setDataOverflow] = useState(null);

  useEffect(() => {
    getCompetitions();
  }, []);

  const getCompetitions = async () => {
    try {
      const data = await endpoints.competence.list();
      setCompetitions(data.results.reverse());
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const getRanking = async (competitionId) => {
    try {
      const data = await endpoints.competence.retrieve(competitionId);
      if (data.ranking.intervals.length > 0) {
        setRankingList(
          data.ranking.intervals[data.ranking.intervals.length - 1].ranking
        );
        if (data.ranking.intervals.length > 0) {
          setSelectedInterval(
            data.ranking.intervals[data.ranking.intervals.length - 1]
              .interval_id
          );
        }
        setDataOverflow(data);
      }
      console.log(data.ranking.teams);
      const reversedIntervals = data.ranking.intervals.reverse();
      setIntervals(reversedIntervals);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleCompetitionChange = (value) => {
    setSelectedCompetition(value);
    getRanking(value);
  };

  const handleIntervalChange = (value) => {
    console.log(value);
    const selectedInterval = intervals.find(
      (interval) => interval.interval_id === value
    );
    console.log("Selected Interval:", selectedInterval.ranking);
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
    <Flex justify="center" align="top" gap={"small"}>
      <Flex justify="center" style={{ marginBottom: 20 }} gap="small">
        <Card size="small" style={cardStyle}>
          <List
            size="small"
            dataSource={data}
            renderItem={(item) => (
              <Flex justify="">
                <List.Item style={{ textAlign: "left" }}>
                  <Flex
                    justify="space-between"
                    align="top"
                    style={{ width: "100%" }}
                  >
                    <Flex align="top" style={{ width: "100%" }}>
                      <Tag color="#d4b106">{item.position}</Tag>
                      <Tag color="#0f788e" style={{ width: "100px" }}>
                        {item.name}
                      </Tag>
                      <Tag
                        color="#cfb224"
                        style={{ width: "50px", textAlign: "center" }}
                      >
                        {item.points}
                      </Tag>
                    </Flex>
                  </Flex>
                </List.Item>
              </Flex>
            )}
            header={
              <Flex vertical gap={"large"}>
                <Select
                  onChange={handleCompetitionChange}
                  style={{ width: "100%" }}
                  suffixIcon={<FilterOutlined />}
                  placeholder="Selecciona una competencia"
                  dropdownRender={(menu) => <div>{menu}</div>}
                >
                  {competitions.map((competition) => (
                    <Option
                      key={competition.id}
                      value={competition.id}
                      style={{
                        color:
                          selectedCompetition === competition.id
                            ? "black"
                            : "black",
                      }}
                    >
                      {competition.name}
                    </Option>
                  ))}
                </Select>
                {intervals && (
                  <Flex>
                    <Segmented
                      vertical
                      block
                      options={intervals.map((interval) => ({
                        label: (
                          <span>
                            {interval.interval_id === selectedInterval ? (
                              <CalendarFilled
                                style={{ marginRight: "5px", color: "#d4b106" }}
                              />
                            ) : (
                              <CalendarOutlined
                                style={{ marginRight: "5px" }}
                              />
                            )}

                            {interval.end_date}
                          </span>
                        ),

                        value: interval.interval_id,
                      }))}
                      onChange={handleIntervalChange}
                      value={selectedInterval}
                      style={{ width: "100%", marginTop: "10px" }}
                    />
                  </Flex>
                )}
                <Flex
                  justify="start"
                  align="top"
                  style={{ width: "100%", marginLeft: "15px" }}
                  vertical
                >
                  <Flex align="top" style={{ marginBottom: "20px" }}>
                    <TrophyFilled
                      style={{ color: "#d4b106", fontSize: "25px" }}
                    />
                    <Text
                      style={{
                        color: "white",
                        marginLeft: "5px",
                        fontSize: "20px",
                      }}
                    >
                      Ranking
                    </Text>
                  </Flex>
                  <Flex align="top">
                    <Tag color="#d4b106">#</Tag>
                    <Tag color="#0f788e" style={{ width: "100px" }}>
                      Equipo
                    </Tag>
                    <Tag
                      color="#d4b106"
                      style={{ width: "50px", textAlign: "center" }}
                    >
                      pts
                    </Tag>
                  </Flex>
                </Flex>
              </Flex>
            }
          />
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </Card>
      </Flex>
      <Flex align="top"></Flex>
    </Flex>
  );
};

const cardStyle = {
  width: "450px",
  background:
    "linear-gradient(0deg, rgba(15,120,142,0.056481967787114895) 0%, rgba(197,239,255,0.1153054971988795) 35%, rgba(60,87,93,1) 100%)",
};

const buttonStyle = {
  backgroundColor: "#0f788e",
  color: "white",
  borderColor: "#0f788e",
};

const dropdownStyle = {
  backgroundColor: "#0f788e",
  color: "white",
  width: "10%",
};

const detailCardStyle = {
  width: "650px",
  background:
    "linear-gradient(50deg, rgba(15,120,142,0.056481967787114895) 0%, rgba(197,239,255,0.1153054971988795) 35%, rgba(60,87,93,1) 100%)",
};

export default GlobalViewer;
