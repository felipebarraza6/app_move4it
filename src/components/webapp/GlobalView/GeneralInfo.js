import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Card as AntdCard } from "antd";

const GeneralInfo = () => {
  const startDate = "2023-01-01";
  const endDate = "2023-12-31";
  const timeToFinish = "365 days";

  return (
    <div>
      <h1>GeneralInfo</h1>
      <Card>
        <CardContent>
          <Typography variant="h6">Start Date: {startDate}</Typography>
          <Typography variant="h6">End Date: {endDate}</Typography>
          <Typography variant="h6">Time to Finish: {timeToFinish}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};
const GeneralInfoAntd = () => {
  const startDate = "2023-01-01";
  const endDate = "2023-12-31";
  const timeToFinish = "365 days";

  return (
    <div>
      <h1>GeneralInfo with Antd</h1>
      <AntdCard>
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
        <p>Time to Finish: {timeToFinish}</p>
      </AntdCard>
    </div>
  );
};

export { GeneralInfoAntd };
export default GeneralInfo;
