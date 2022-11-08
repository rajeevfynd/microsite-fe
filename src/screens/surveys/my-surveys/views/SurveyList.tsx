import { Collapse, Typography, notification, Space, Card } from "antd";
import { EditTwoTone, InfoCircleFilled, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import "../../new-survey/views/questionForm.css";
import {
  getSurvyesByStatus,
  getImage,
} from "../../../../service/survey-service";
import Meta from "antd/lib/card/Meta";
import Survey from "./Survey";

function SurveyList() {
  type NotificationType = "success" | "info" | "warning" | "error";
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [Surveys, setSurvey] = React.useState([
    {
      id: "",
      surveyTitle: "",
      description: "desc",
      documentId: "",
      imgUrl: "",
      questions: [
        {
          id: "",
          questionText: "",
          questionType: "",
          choices: [
            {
              id: "",
              choiceText: "",
            },
          ],
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

  const getSurveys = () => {
    console.log("Inside get surveys");
    setIsLoading(true);
    getSurvyesByStatus(false)
      .then((res) => {
        console.log(res);
        setSurvey(res.data);
      })
      .catch((err) => openNotificationWithIcon("error", err.data.message));
    setIsLoading(false);
  };

  React.useEffect(() => {
    getSurveys();
  }, []);
  return (
    <div>
      <div className="question_form">
        <div className="container">
          <div className="row">
            {isLoading
              ? "Loading"
              : Surveys.map((i) => (
                  <div className="col-lg-3">
                    <Card
                      hoverable
                      style={{ width: 200, margin: "1em" }}
                      cover={
                        <img
                          alt="example"
                          src={"data:image/png;base64," + i.imgUrl}
                        />
                      }
                      actions={[
                        <EditOutlined
                          key="edit"
                          onClick={(e) =>
                            navigate(`/survey/submit/survey/${i.id}/${8}`)
                          }
                        />,
                      ]}
                    >
                      <Meta title={i.surveyTitle} />
                    </Card>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyList;
