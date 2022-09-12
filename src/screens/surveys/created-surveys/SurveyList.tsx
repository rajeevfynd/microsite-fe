import { Button, Collapse, Typography } from "antd";
import {
  DeleteOutlined,
  EditTwoTone,
  InfoCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import "../new-survey/questionForm.css";
const { Panel } = Collapse;
import { Surveys } from "../DummyData";
const { Text, Link } = Typography;

function SurveyList() {
  const Text = "test";
  const history = useNavigate();
  return (
    <div>
      <div className="question_form">
        {Surveys.map((s) => (
          <div style={{ padding: "20px" }}>
            <div className="card w-50">
              <div className="card-header">
                <div className="row">
                  <div className="col-6">{s.SurveyTile}</div>
                  <div className="col-6">
                    <div style={{ position: "relative", float: "right" }}>
                      <EditTwoTone />{" "}
                      <DeleteOutlined style={{ color: "red" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <p>{s.Description} </p>
                <div style={{ position: "relative", float: "right" }}>
                  <InfoCircleFilled />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SurveyList;
