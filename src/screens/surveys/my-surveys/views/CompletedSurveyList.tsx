import { notification, Space, Card } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import "../../new-survey/views/questionForm.css";
import { getSurvyesByStatus } from "../../../../service/survey-service";
import Meta from "antd/lib/card/Meta";

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
    console.log("Inside get surveys");
    setIsLoading(true);
    getSurvyesByStatus(true)
      .then((res) => {
        setSurvey(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
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
              <h3>No surveys to submit</h3>
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
