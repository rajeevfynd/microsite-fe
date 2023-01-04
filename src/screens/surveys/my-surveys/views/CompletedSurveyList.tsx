import { notification, Space, Card, Empty, List } from "antd";
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
    <>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : Surveys.length === 0 ? (
        <Empty description={<span>No Surveys</span>} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "0% 3%",
          }}
        >
          <List
            grid={{ gutter: 1, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }}
            style={{ width: "100%" }}
            dataSource={Surveys}
            renderItem={(item) => (
              <List.Item key={item.surveyTitle}>
                <Card
                  hoverable
                  style={{
                    width: "250px",
                  }}
                  cover={<img src={formatBase64(item.imgUrl)} />}
                  actions={[
                    <InfoCircleFilled
                      onClick={(e) =>
                        navigate(
                          `/survey/assignee/response/${item.id}/${item.id}`
                        )
                      }
                    />,
                  ]}
                >
                  {" "}
                  <Meta
                    title={item.surveyTitle}
                    description={item.description}
                  />
                </Card>
              </List.Item>
            )}
          />
        </div>
      )}
    </>
  );
}

export default CompletedSurveyList;
