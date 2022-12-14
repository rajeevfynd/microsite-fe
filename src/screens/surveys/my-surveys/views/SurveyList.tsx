import { Collapse, Typography, notification, Space, Card, Empty } from "antd";
import { EditTwoTone, InfoCircleFilled, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import "../../new-survey/views/questionForm.css";
import {
  getSurveysByStatus,
  getImage,
} from "../../../../service/survey-service";
import Meta from "antd/lib/card/Meta";

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

  const getSurveys = async () => {
    setIsLoading(true);
    try {
      let res = await getSurveysByStatus(false);
      setSurvey(res.data);
    } catch (error) {
      openNotificationWithIcon("error", error.message);
      setIsLoading(false);
    }

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
            {isLoading ? (
              "Loading"
            ) : Surveys.length === 0 ? (
              <Empty description={<span>No Surveys</span>} />
            ) : (
              Surveys.map((i) => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyList;
