import React, { useContext } from "react";
import { Row, Col, Typography } from "antd";
import FormData from "../components/webapp/ProfileUser/FormData";
import Stats from "../components/webapp/ProfileUser/Stats";
import UpdatePassword from "../components/webapp/ProfileUser/UpdatePassword";
import { AppContext } from "../App";

const { Title } = Typography;

const ProfileUser = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <Row justify={"space-evenly"}>
      <Col span={24}>
        <Title level={3}>@{state.user.username}</Title>
      </Col>
      <Col span={10} style={styles.col}>
        <FormData />
        <UpdatePassword />
      </Col>
      <Col span={10}>
        <Stats />
      </Col>
    </Row>
  );
};

const styles = {
  col: {
    padding: "0px 10px 0px 0",
  },
};

export default ProfileUser;
