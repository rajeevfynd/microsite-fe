import { FileExcelOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Modal,
  RadioChangeEvent,
  Select,
} from "antd";

import fs from "fs";

import { Col, Row, Statistic } from "antd";

import { Progress, Tooltip } from "antd";

import { Typography } from "antd";
import axios, {
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
} from "axios";
import * as React from "react";
import DasboardTable from "./table";
import { useParams } from "react-router";

type columnType = {
  column: string;
  value: string;
};

const { Title } = Typography;

function SurveyDashBoard() {
  const [placement, SetPlacement] =
    React.useState<DatePickerProps["placement"]>("topLeft");

  const params = useParams();

  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };
  const searchDto = {
    column: "survey",
    value: "2",
  };

  const [status, setStatus] = React.useState({
    column: "",
    value: "",
  });

  const [pickDate, setPickDate] = React.useState({
    column: "expireDate",
    value: "",
  });

  const { RangePicker } = DatePicker;

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    var searchArray: columnType[] = [searchDto];
    if (status.column !== "") {
      searchArray.push(status);
    }
    if (pickDate.value !== "") {
      searchArray.push(pickDate);
    }
    console.log("Before data sent", searchArray);
    let config: AxiosRequestConfig = {
      method: "POST",
      url: "/microsite/surveys/export-to-excel",
      data: {
        searchRequestDto: searchArray,
      },
      responseType: "blob",
      handlerEnabled: false,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        console.log(typeof res.data);
        console.log(res.data);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `survey.xlsx`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log(err.message));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
    let newStatus = { column: value, value: "" };
    setStatus(newStatus);
  };
  return (
    <>
      <div className="container" style={{ padding: "20px" }}>
        <Title>Dash Board</Title>
        <Title level={2}>Survey {params.id}</Title>
        <Card style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic title="Submitted " value={1} />
            </Col>

            <Col span={8}>
              <Statistic title="Pending" value={4} suffix="/ 5" />
            </Col>

            <Col span={2}>
              <Tooltip title="1 done /  4 to do">
                <Progress
                  percent={(1 / 5) * 100}
                  success={{ percent: (1 / 5) * 100 }}
                  type="circle"
                />
              </Tooltip>
            </Col>
          </Row>
        </Card>
        <br></br>
        <span>
          <Button
            style={{ display: "inline-flex", backgroundColor: "green" }}
            type="primary"
            shape="round"
            icon={<FileExcelOutlined />}
            onClick={showModal}
          >
            Export as Excel
          </Button>
          <Modal
            title="Apply filters"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <RangePicker
              placement={placement}
              onChange={(value, dateString) => {
                console.log("Value", value);
                console.log("Date range selected ", dateString);
                setPickDate({
                  column: "expireDate",
                  value: dateString.toString(),
                });
              }}
            />
            <Select
              showSearch
              placeholder="Select status"
              onChange={onChangeSelect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "Submitted",
                  label: "submitted",
                },
                {
                  value: "Pending",
                  label: "pending",
                },
                {
                  value: "Expired",
                  label: "expired",
                },
              ]}
            />
          </Modal>
        </span>

        <br></br>
      </div>
      <DasboardTable />
    </>
  );
}

export default SurveyDashBoard;
