import { notification, Space, Card, Empty } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { getSurveysByStatus } from "../../../../service/survey-service";
import Meta from "antd/lib/card/Meta";
import { formatBase64 } from "../../../../utility/image-utils";

function CompletedSurveyList() {
  type NotificationType = "success" | "info" | "warning" | "error";
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [Surveys, setSurvey] = React.useState([
    {
      id: "",
      surveyTitle: "",
      description: "",
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

  const getSurveys = () => {
    setIsLoading(true);
    getSurveysByStatus(true)
      .then((res) => {
        setSurvey(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
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
              <h3>Loading...</h3>
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
                        src={formatBase64(i.imgUrl)}
                      />
                    }
                    actions={[
                      <InfoCircleFilled
                        onClick={(e) =>
                          navigate(`/survey/assignee/response/${i.id}/${i.id}`)
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

export default CompletedSurveyList;
