import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { useParams } from "react-router-dom";
import ResCheckBoxUi from "./options/ResCheckBoxUi";
import ResRadioUi from "./options/ResRadioUi";
import {
  getSurveyById,
  getSurveyResponseById,
} from "../../../../service/survey-service";
const ResponseSurvey = () => {
  /// two params surveyId and AssigneeID
  const params = useParams();
  const { Option } = Select;
  let navigate = useNavigate();
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
          {survey.questions[i].choices.map((op: { choiceText: string }) => (
            <div>
              <ResRadioUi
                key={i}
                i={i}
                optionText={op.choiceText}
                qId={survey.questions[i].id}
                radioAnswer={answer[0] == op.choiceText ? true : false}
              />
            </div>
          ))}
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
    console.log("Assignee res", res.data);
    setResponse(res.data);
  };
  React.useEffect(() => {
    setIsLoading(true);

    getSurveyResponse().then((res) => {
      getSurveyById(params.surveyId)
        .then((res) => {
          console.log("Response", res.data);
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
            <div className="section">
              <div className="question_title_section">
                <div className="question_form_top">
                  {/* Title of the Survey*/}
                  <h1>{survey.surveyTitle}</h1>
                  <p>{survey.description}</p>
                </div>
              </div>
              <div className="container" style={{ paddingTop: "10px" }}>
                {survey.questions.map((q, i) => (
                  <>
                    <div
                      className="card"
                      style={{
                        borderLeft: "4px solid rgb(66, 90, 245)",
                      }}
                    >
                      <div className="card-header">{q.questionText}</div>
                      <div className="card-body">
                        {handleSwitch(q.questionType, i)}
                      </div>
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
