import React, { useState, useEffect } from "react";
import { endpoints } from "../config/endpoints";
import { List, Typography, Tag, Card, Select, Flex, Button, Table } from "antd";
import {
  TrophyFilled,
  FilterOutlined,
  RightCircleFilled,
} from "@ant-design/icons";

const { Text, Title } = Typography;
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
        throw new Error("Invalid ranking data");
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };
  const handleCompetitionChange = (value) => {
    setSelectedCompetition(value);
    getRanking(value);
  };
  useEffect(() => {
    getCompetitions();
  }, []);

  console.log(selectedCompetition);

  const data = rankingList.map((team, index) => ({
    key: index,
    position: index + 1,
    name: team.team_name,
    points: team.points,
  }));

  return (
    <Flex justify="space-between" align="top" gap={"small"}>
      <Flex justify="center" style={{ marginBottom: 20 }} gap="small">
        <Card
          size="small"
          style={{
            width: "350px",
            background:
              "linear-gradient(0deg, rgba(15,120,142,0.056481967787114895) 0%, rgba(197,239,255,0.1153054971988795) 35%, rgba(60,87,93,1) 100%)",
          }}
        >
          <List
            size="small"
            dataSource={data}
            renderItem={(item) => (
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
                  <Flex align="top">
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#0f788e",
                        color: "white",
                        borderColor: "#0f788e",
                      }}
                    >
                      ACTIVIDAD{<RightCircleFilled />}
                    </Button>
                  </Flex>
                </Flex>
              </List.Item>
            )}
            header={
              <Flex vertical gap={"large"}>
                <Select
                  onChange={handleCompetitionChange}
                  style={{ width: "100%" }}
                  suffixIcon={<FilterOutlined />}
                  placeholder="Selecciona una competencia"
                >
                  {competitions.map((competition) => (
                    <>
                      <Option key={competition.id} value={competition.id}>
                        {competition.name}
                      </Option>
                    </>
                  ))}{" "}
                </Select>
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
      <Flex align="top">
        <Card
          size="small"
          style={{
            width: "650px",
            background:
              "linear-gradient(50deg, rgba(15,120,142,0.056481967787114895) 0%, rgba(197,239,255,0.1153054971988795) 35%, rgba(60,87,93,1) 100%)",
          }}
        >
          {selectedCompetition ? (
            <>
              <Title level={3} style={{ color: "grey" }}>
                Detalle de actividad en competencía
              </Title>
              <Table />
            </>
          ) : (
            <>
              <Title level={3} style={{ color: "grey" }}>
                Ranking competencía
              </Title>
              <Table />
            </>
          )}
        </Card>
      </Flex>
    </Flex>
  );
};

export default GlobalViewer;
