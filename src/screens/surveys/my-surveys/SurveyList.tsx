import { Button, Collapse, Typography, notification, Space } from "antd";
import { Navigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditTwoTone,
  InfoCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import "../new-survey/questionForm.css";
import axios from "axios";
const { Panel } = Collapse;
const { Text, Link } = Typography;

function SurveyList() {
  type NotificationType = "success" | "info" | "warning" | "error";
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [Surveys, setSurvey] = React.useState([
    {
      id: "",
      completed: "",
      userId: "",
      surveyId: "",
      survey: {
        id: "",
        surveyTitle: "",
        description: "",
        questions: [
          {
            id: "",
            surveyTitle: "",
            description: "",
            choice: [
              {
                id: "",
                choiceText: "",
                questionId: "",
              },
            ],
          },
        ],
      },
    },
  ]);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: String
  ) => {
    notification[type]({
      message,
    });
  };

  const getSurveys = () => {
    console.log("Inside get surveys");
    setIsLoading(true);
    axios
      .get("http://localhost:8082/microsite/assignee/all/11/false")
      .then((res) => {
        console.log("This is res.data ", res.data.data);
        setSurvey(res.data.data);
      })
      .catch((err) => console.log(err.message));
    setIsLoading(false);
  };

  React.useEffect(() => {
    getSurveys();
  }, []);
  return (
    <div>
      <div className="question_form">
        {isLoading
          ? "Loading"
          : Surveys.map((i) => (
              <div style={{ padding: "20px" }}>
                <div className="card w-50">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-6">{i.survey.surveyTitle}</div>
                      <div className="col-6">
                        <div style={{ position: "relative", float: "right" }}>
                          <EditTwoTone
                            onClick={(e) =>
                              navigate(
                                `/survey/submit/survey/${i.survey.id}/${i.id}`
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p>{i.survey.description} </p>
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
