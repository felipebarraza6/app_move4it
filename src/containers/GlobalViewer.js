import React, { useState, useEffect } from "react";
import { endpoints } from "../config/endpoints";
import { List, Typography, Tag, Card, Select, Flex } from "antd";
import { TrophyFilled, FilterOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

const GlobalViewer = () => {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [rankingList, setRankingList] = useState([]);
  const [error, setError] = useState(null);

  const getCompetitions = async () => {
    try {
      const data = await endpoints.competence.list();
      setCompetitions(data.results);
      if (data.results.length > 0) {
        setSelectedCompetition(data.results[0].id);
        getRanking(data.results[0].id);
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const getRanking = async (competitionId) => {
    try {
      const data = await endpoints.competence.retrieve(competitionId);
      if (data && data.ranking && data.ranking.teams) {
        setRankingList(data.ranking.teams);
      } else {
        throw new Error("Datos de ranking no válidos");
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    getCompetitions();
  }, []);

  const handleCompetitionChange = (value) => {
    setSelectedCompetition(value);
    getRanking(value);
  };

  const data = rankingList.map((team, index) => ({
    key: index,
    position: index + 1,
    name: team.team_name,
    points: team.points,
  }));

  return (
    <div>
      <h1>Global Viewer</h1>
      <Flex justify="center" style={{ marginBottom: 20 }}>
        <Select
          value={selectedCompetition}
          onChange={handleCompetitionChange}
          style={{ width: "100%" }}
          suffixIcon={<FilterOutlined />}
        >
          {competitions.map((competition) => (
            <Option key={competition.id} value={competition.id}>
              {competition.name}
            </Option>
          ))}
        </Select>
      </Flex>
      <Flex justify="end">
        <Card
          size="small"
          style={{
            width: "300px",
            background:
              "linear-gradient(0deg, rgba(15,120,142,0.056481967787114895) 0%, rgba(197,239,255,0.1153054971988795) 35%, rgba(60,87,93,1) 100%)",
          }}
        >
          <List
            size="small"
            dataSource={data}
            renderItem={(item) => (
              <List.Item style={{ textAlign: "left" }}>
                <Flex justify="start" style={{ width: "100%" }}>
                  <Tag color="blue">{item.position}</Tag>
                  <Tag color="blue">{item.name}</Tag>
                  <Tag color="blue">{item.points}</Tag>
                </Flex>
              </List.Item>
            )}
            header={
              <Text style={{ fontSize: "20px", color: "white" }}>
                <TrophyFilled
                  style={{ color: "#d4b106", marginRight: "10px" }}
                />
                Ranking
              </Text>
            }
          />
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </Card>
      </Flex>
    </div>
  );
};

export default GlobalViewer;
