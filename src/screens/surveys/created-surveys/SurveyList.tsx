import { Collapse, Typography, notification, Space } from "antd";
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
// import { Surveys } from "../DummyData";
const { Text, Link } = Typography;

interface surveyType {
  id: string;
  surveyTitle: string;
  description: string;
  questions: questionsType[];
}
interface questionsType {
  id: string;
  questionText: string;
  questionType: string;
  choice: Choice[];
}
interface Choice {
  choiceText: string;
}
function SurveyList() {
  type NotificationType = "success" | "info" | "warning" | "error";
  let navigate = useNavigate();

  const [Surveys, setSurvey] = React.useState<surveyType[]>([
    {
      id: "",
      surveyTitle: "",
      description: "",
      questions: [
        {
          id: "",
          questionText: "",
          questionType: "",
          choice: [{ choiceText: "" }],
        },
      ],
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
  const deleteSurvey = (id: string) => {
    if (confirm("Do you really want to delete Survey")) {
      axios
        .delete(`http://localhost:8082/microsite/survey/delete/survey/${id}`)
        .then((res) => {
          openNotificationWithIcon("success", "successfuly deleted");
          getSurveys();
        })
        .catch((err) => {
          openNotificationWithIcon("error", err.message);
        });
    }
  };

  const getSurveys = () => {
    axios
      .get("http://localhost:8082/microsite/survey/surveys")
      .then((res) => {
        // console.log("This is res.data ", res.data);
        setSurvey(res.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  const assigneeSurvey = (id: string) => {
    let userId = prompt("Please Enter User Id", "22");
    // console.log(userId);
    if (userId != null) {
      axios
        .post("http://localhost:8082/microsite/survey/assign/survey", {
          userId,
          surveyId: id,
        })
        .then((res) =>
          openNotificationWithIcon("success", `Survey Assigned to ${userId}`)
        )
        .catch((err) => console.log(err.message));
    }
  };

  React.useEffect(() => {
    getSurveys();
  }, []);
  return (
    <div>
      <div className="question_form">
        {Surveys.length === 0
          ? "No Surveys created"
          : Surveys.map((s) => (
              <div style={{ padding: "20px" }}>
                <div className="card w-50">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-6">{s.surveyTitle}</div>
                      <div className="col-6">
                        <div style={{ position: "relative", float: "right" }}>
                          <EditTwoTone
                            onClick={(e) =>
                              navigate(`/survey/created-surveys/edit/${s.id}`)
                            }
                          />{" "}
                          <DeleteOutlined
                            style={{ color: "red" }}
                            onClick={(e) => deleteSurvey(s.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p>{s.description} </p>
                    <div style={{ position: "relative", float: "right" }}>
                      <InfoCircleFilled onClick={(e) => assigneeSurvey(s.id)} />
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
