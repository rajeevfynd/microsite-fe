import * as React from "react";
import TextArea from "antd/lib/input/TextArea";
import { useParams } from "react-router-dom";
import ResCheckBoxUi from "./options/ResCheckBoxUi";
import ResRadioUi from "./options/ResRadioUi";
import {
  getSurveyById,
  getSurveyResponseById,
} from "../../../../service/survey-service";
import Title from "antd/lib/typography/Title";
import { Card } from "antd";
const ResponseSurvey = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const [survey, setSurvey] = React.useState({
    id: "",
    surveyTitle: "",
    description: "",
    questions: [
      {
        id: "",
        questionText: "",
        questionType: "",
        choices: [{ choiceText: "" }],
      },
    ],
  });

  const [resBody, setResBody] = React.useState({
    id: "",
    completed: "",
    userId: "",
    surveyId: "",
    responses: [
      {
        id: "",
        answer: "",
        surveyAssigneeId: "",
        questionId: "",
      },
    ],
  });

  interface Dic {
    [key: string]: string[];
  }

  const [response, setResponse] = React.useState<Dic>({});

  const radioUI = (i: number) => {
    let answer = response[survey.questions[i].id];
    return (
      <>
        <div className="form-check">
          <ResRadioUi answer={answer[0]} choice={survey.questions[i].choices} />
          {/* {survey.questions[i].choices.map((op: { choiceText: string }) => (
            <div>
              <ResRadioUi
                key={i}
                i={i}
                optionText={op.choiceText}
                qId={survey.questions[i].id}
                radioAnswer={answer[0] == op.choiceText ? true : false}
              />
            </div>
          ))} */}
        </div>
      </>
    );
  };

  const checkBoxUI = (i: number) => {
    let questionID = survey.questions[i].id;
    return (
      <>
        {
          <ResCheckBoxUi
            key={i.toString()}
            choice={survey.questions[i].choices}
            qId={questionID}
            checkAnswer={response[questionID]}
          />
        }
      </>
    );
  };
  const handleSwitch = (questionType: string, i: number) => {
    switch (questionType) {
      case "SINGLE_CHOICE":
        return radioUI(i);
      case "MULTIPLE_CHOICE":
        return checkBoxUI(i);
      default:
        let questionID = survey.questions[i].id;
        return <TextArea value={...response[questionID]} disabled></TextArea>;
    }
  };
  const getSurveyResponse = async () => {
    const res = await getSurveyResponseById(params.assigneeId);
    setResponse(res.data);
  };
  React.useEffect(() => {
    setIsLoading(true);
    getSurveyResponse().then((res) => {
      getSurveyById(params.surveyId)
        .then((res) => {
          setSurvey(res.data);
        })
        .catch((err) => console.log(err.message));
    });

    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <form>
          <div className="question_form">
            <br></br>
            <div className="section dark">
              <div className="question_title_section">
                <div className="question_form_top">
                  <Title>{survey.surveyTitle}</Title>

                  <p>{survey.description}</p>
                </div>
              </div>
              <div className="container" style={{ paddingTop: "10px" }}>
                {survey.questions.map((question, index) => (
                  <>
                    <div key={question.id}>
                      <Card
                        title={question.questionText}
                        className="question-card"
                        style={{
                          borderLeft: "4px solid rgb(66, 90, 245)",
                        }}
                      >
                        {handleSwitch(question.questionType, index)}
                      </Card>
                    </div>
                    <br></br>
                  </>
                ))}
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ResponseSurvey;
