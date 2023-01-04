import { useNavigate } from "react-router-dom";
import * as React from "react";
import TextArea from "antd/lib/input/TextArea";
import RadioUi from "./options/RadioUI";
import CheckBoxUi from "./options/CheckBoxUi";
import { useParams } from "react-router-dom";
import {
  getSurveyById,
  submitSurvey,
} from "../../../../service/survey-service";
const Survey = () => {
  const params = useParams();
  const navigate = useNavigate();
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

  const [response, setResponse] = React.useState([
    {
      questionId: "",
      answer: "",
    },
  ]);

  const handleRadioResponse = (qId: string, answer: string) => {
    let newAnswer = { questionId: qId, answer };
    if (response[0].questionId.length == 0) {
      setResponse([newAnswer]);
    } else {
      let temp = [...response];
      let c = 0;
      temp.forEach((e, i) => {
        if (e.questionId == qId) {
          temp[i] = newAnswer;
          c = 1;
        }
      });
      if (c == 0) {
        temp.push(newAnswer);
      }
      setResponse(temp);
    }
  };

  const radioUI = (i: number) => {
    return (
      <>
        <div className="form-check">
          <div>
            {survey.questions[i].choices.map(
              (op: { choiceText: string }, j) => (
                <RadioUi
                  key={j}
                  optionText={op.choiceText}
                  handleRadioResponse={handleRadioResponse}
                  qId={survey.questions[i].id}
                />
              )
            )}
          </div>
        </div>
      </>
    );
  };

  const handleCheckBoxResponse = (qId: string, answers: string[]) => {
    /// Error in inital state
    let temp = [...response];
    temp = temp.filter((i) => i.questionId !== qId);
    if (response[0].questionId.length == 0) {
      setResponse([{ questionId: qId, answer: answers[0] }]);
    } else {
      answers.map((i) => temp.push({ questionId: qId, answer: i }));
      setResponse(temp);
    }
    // setResponse(temp);
  };
  const checkBoxUI = (i: number) => {
    return (
      <>
        {
          <CheckBoxUi
            choice={survey.questions[i].choices}
            qId={survey.questions[i].id}
            handleCheckBoxResponse={handleCheckBoxResponse}
          />
        }
      </>
    );
  };
  const handleTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    i: number,
    qId: string
  ) => {
    let newAnswer = { questionId: qId, answer: e.target.value };
    if (response[0].questionId.length == 0) {
      setResponse([newAnswer]);
    } else {
      let temp = [...response];
      let c = 0;
      temp.forEach((e, i) => {
        if (e.questionId == qId) {
          temp[i] = newAnswer;
          c = 1;
        }
      });
      if (c == 0) {
        temp.push(newAnswer);
      }
      setResponse(temp);
    }
  };
  const handleSwitch = (questionType: string, i: number) => {
    switch (questionType) {
      case "SINGLE_CHOICE":
        return radioUI(i);
      case "MULTIPLE_CHOICE":
        return checkBoxUI(i);
      default:
        return (
          <TextArea
            onChange={(e) => handleTextArea(e, i, survey.questions[i].id)}
          ></TextArea>
        );
    }
  };

  React.useEffect(() => {
    getSurveyById(params.surveyId)
      .then((res) => {
        setSurvey(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  const handleSubmit = () => {
    let resBody = {
      surveyId: survey.id,
      completed: true,
      responses: response,
    };
    console.log(resBody);
    submitSurvey(resBody)
      .then((res) => navigate("/survey/my-surveys"))
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      {
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
                {survey.questions.map((question, index) => (
                  <>
                    <div
                      key={question.id}
                      className="card"
                      style={{
                        borderLeft: "4px solid rgb(66, 90, 245)",
                      }}
                    >
                      <div className="card-header">{question.questionText}</div>
                      <div className="card-body">
                        {handleSwitch(question.questionType, index)}
                      </div>
                    </div>
                    <br></br>
                  </>
                ))}
              </div>
              <div className="btn btn-primary" onClick={handleSubmit}>
                {" "}
                Submit
              </div>
            </div>
          </div>
        </form>
      }
    </>
  );
};

export default Survey;
