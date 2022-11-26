import { Card } from "antd";

import DasboardTable from "./table";

import { LikeOutlined } from "@ant-design/icons";

import { Col, Row, Statistic } from "antd";

import { Progress, Tooltip } from "antd";

import { Typography } from "antd";
import * as React from "react";

const { Title } = Typography;

function SurveyDashBoard() {
  return (
    <>
      <div className="container">
        <Title>Dash Board</Title>

        <Title level={2}>Survey 1</Title>

        <Card style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic
                title="Submitted "
                value={66}
                prefix={<LikeOutlined />}
              />
            </Col>

            <Col span={8}>
              <Statistic title="Pending" value={44} suffix="/ 100" />
            </Col>

            <Col span={2}>
              <Tooltip title="3 done / 3 in progress / 4 to do">
                <Progress
                  percent={100}
                  success={{ percent: 66 }}
                  type="circle"
                />
              </Tooltip>
            </Col>
          </Row>
        </Card>

        <br></br>

        <DasboardTable />
      </div>
    </>
  );
}

export default SurveyDashBoard;
