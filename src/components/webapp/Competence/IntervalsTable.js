import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../App";
import { Descriptions, Button, Card, Flex, List, Tag } from "antd";
import {
  CalendarFilled,
  CalendarOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const IntervalsTable = () => {
  const { state } = useContext(AppContext);
  const intervals =
    state.user.enterprise_competition_overflow.last_competence
      .intervals_to_back;

  const [currentInterval, setCurrentInterval] = useState(0);

  const nextInterval = () => {
    setCurrentInterval((prevInterval) => prevInterval + 1);
  };

  const previousInterval = () => {
    setCurrentInterval((prevInterval) => prevInterval - 1);
  };

  useEffect(() => {
    setCurrentInterval(0);
  }, [intervals]);
  return (
    <Flex vertical style={{ width: "100%" }}>
      {intervals.length > 0 && (
        <Card
          key={intervals[currentInterval].interval_id}
          title={intervals[currentInterval].name}
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(170,184,193,1) 81%)",
          }}
        >
          <Descriptions bordered column={2}>
            <Descriptions.Item
              label={
                <>
                  <CalendarOutlined style={{ marginRight: 8 }} /> Fecha inicio
                </>
              }
              style={{ color: "black" }}
            >
              <Tag color="blue-inverse">
                {intervals[currentInterval].start_date}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item
              style={{ color: "black" }}
              label={
                <>
                  <CalendarFilled style={{ marginRight: 8 }} /> Fecha termino
                </>
              }
            >
              <Tag color="red-inverse">
                {intervals[currentInterval].end_date}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item
              style={{ color: "black" }}
              label={
                <>
                  <UnorderedListOutlined style={{ marginRight: 8 }} /> Pruebas
                </>
              }
            >
              <List
                dataSource={intervals[currentInterval].activities}
                grid={{ gutter: 16, column: 3 }}
                renderItem={(r) => (
                  <List.Item>
                    <Card
                      hoverable
                      style={{ background: "white" }}
                      size="small"
                    >
                      {r}
                    </Card>
                  </List.Item>
                )}
              />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
      <Flex gap="small" justify="center" style={{ marginTop: "10px" }}>
        <Button
          shape="round"
          type="primary"
          onClick={nextInterval}
          disabled={currentInterval >= intervals.length - 1}
        >
          <ArrowLeftOutlined />
          Anterior
        </Button>
        <Button
          shape="round"
          type="primary"
          onClick={previousInterval}
          disabled={currentInterval === 0}
        >
          Siguiente <ArrowRightOutlined />
        </Button>
      </Flex>
    </Flex>
  );
};

export default IntervalsTable;
