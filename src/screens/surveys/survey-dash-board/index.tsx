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
import { config } from "dotenv";

const { Title } = Typography;

function SurveyDashBoard() {
  const [placement, SetPlacement] =
    React.useState<DatePickerProps["placement"]>("topLeft");

  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };
  const searchDto = {
    searchRequestDto: [
      {
        column: "survey",
        value: "1",
      },
    ],
  };

  const { RangePicker } = DatePicker;

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    let config: AxiosRequestConfig = {
      method: "POST",
      url: "/microsite/surveys/export-to-excel",
      data: searchDto,
      responseType: "blob",
      handlerEnabled: false,
    };
    axios(config)
      .then((res) => {
        console.log(res);
        console.log(typeof res.data);
        console.log(res.data);

        //downloadFile(res.data, "survey.xlsx");
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `survey.xlsx`);
        document.body.appendChild(link);
        link.click();

        // const url = window.URL.createObjectURL(
        //   new Blob([res.data], { type: "octet-stream" })
        // );

        // const link = document.createElement("a");

        // link.href = url;

        // link.setAttribute("download", `${Date.now()}.xlsx`);

        // document.body.appendChild(link);

        // link.click();

        // link.remove();

        // fs.writeFileSynce("Survey.xls",res.data);
      })
      .catch((err) => console.log(err.message));
    setIsModalOpen(false);
  };

  const downloadFile = (data: BlobPart, name = "Survey.xlsx") => {
    console.log("Inside download file", data);
    const blob = new Blob([data]);

    const href = URL.createObjectURL(blob);

    const a = Object.assign(document.createElement("a"), {
      href,
      style: "display:none",
      download: name,
    });
    console.log("Blob data", blob);
    document.body.appendChild(a);

    a.click();
    URL.revokeObjectURL(href);
    a.remove();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <div className="container">
        <Title>Dash Board</Title>
        <Title level={2}>Survey 1</Title>
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
            title="Aplly filters"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <RangePicker placement={placement} />
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
                  value: "submitted",
                  label: "submitted",
                },
                {
                  value: "pending",
                  label: "pending",
                },
                {
                  value: "expired",
                  label: "expired",
                },
              ]}
            />
          </Modal>
        </span>

        <br></br>
        <DasboardTable />
      </div>
    </>
  );
}

export default SurveyDashBoard;
