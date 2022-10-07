import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { useParams } from "react-router-dom";
import ResCheckBoxUi from "./options/ResCheckBoxUi";
import ResRadioUi from "./options/ResRadioUi";
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
        choice: [{ choiceText: "" }],
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
          {survey.questions[i].choice.map((op: { choiceText: string }) => (
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
            choice={survey.questions[i].choice}
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
        // resBody.responses.map((r, j) => {
        //   if (r.questionId === survey.questions[i].id) {
        //     console.log("Answer", r.answer);
        //     correct = r.answer;
        //   }
        // });
        return <TextArea value={...response[questionID]} disabled></TextArea>;
    }
  };
  const getSurveyResponse = async () => {
    const res = await axios.get(
      `http://localhost:8082/microsite/assignee/response/${params.assigneeId}`
    );
    console.log("Assignee res", res.data.data);
    setResponse(res.data.data);
  };

  React.useEffect(() => {
    setIsLoading(true);
    getSurveyResponse().then((re) => {
      axios
        .get(`http://localhost:8082/microsite/survey/survey/${params.id}`)
        .then((res) => {
          //console.log("This is res.data ", res.data.data);
          setSurvey(res.data.data);
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
