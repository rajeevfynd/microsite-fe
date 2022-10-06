import { Select, Button, notification, Space } from "antd";

import * as React from "react";

import { DeleteOutlined, CopyFilled, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import RadioUi from "./options/RadioUI";
import CheckBoxUi from "./options/CheckBoxUi";
import axios from "axios";
import { useParams } from "react-router-dom";

const Survey = () => {
  type NotificationType = "success" | "info" | "warning" | "error";
  const { Option } = Select;
  const params = useParams();

  const [surveyTitle, setSurveyTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const newQuestion = {
    id: "",
    questionText: "",
    questionType: "SMALL_TEXT",
    choice: [
      {
        id: "",
        choiceText: "",
      },
    ],
  };

  const [Survey, setSurvey] = React.useState({
    questions: [newQuestion],
  });

  const openNotificationWithIcon = (
    type: NotificationType,
    message: String
  ) => {
    notification[type]({
      message,
    });
  };

  const handleAddOption = (i: number, j: number) => {
    console.log("Inside add option ", i + " " + j);
    let t = Survey;
    t.questions[i].choice.splice(j + 1, 0, { id: "", choiceText: "" });
    console.log(t);
    setSurvey({ ...t });
  };

  const handleChoiceText = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    j: number
  ) => {
    console.log("Inside choice text ", i + " " + j);
    let t = Survey;
    t.questions[i].choice.splice(j, 0, { id: "", choiceText: e.target.value });
    t.questions[i].choice.splice(j + 1, 1);
    console.log(t);
    setSurvey({ ...t });
  };

  const handleDeleteOption = (i: number, j: number) => {
    let t = Survey;
    t.questions[i].choice.splice(j, 1);
    console.log(t);
    setSurvey({ ...t });
  };

  const radioUI = (i: number) => {
    return (
      <>
        <div className="form-check">
          {Survey.questions[i].choice.map((op, j) => (
            <RadioUi
              i={i}
              j={j}
              optionText={op.choiceText}
              handleDeleteOption={handleDeleteOption}
              handleAddOption={handleAddOption}
              handleOPtionIn={handleChoiceText}
            />
          ))}
        </div>
      </>
    );
  };
  const handleSelect = (value: string, i: number) => {
    let a = Survey.questions[i];
    a = { ...a, questionType: value };
    const l = [
      ...Survey.questions.slice(0, i),
      a,
      ...Survey.questions.slice(i + 1, Survey.questions.length),
    ];
    setSurvey({ ...Survey, questions: l });
  };
  const checkBoxUI = (i: number) => {
    return (
      <>
        {Survey.questions[i].choice.map((op, j) => (
          <CheckBoxUi
            i={i}
            j={j}
            optionText={op.choiceText}
            handleDeleteOption={handleDeleteOption}
            handleAddOption={handleAddOption}
            handleOPtionIn={handleChoiceText}
          />
        ))}
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
        return <TextArea disabled></TextArea>;
    }
  };
  const addQuestion = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const l = [...Survey.questions];
    l.push(newQuestion);
    setSurvey({ ...Survey, questions: l });
  };

  const handleQuestionText = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    let arr = Survey.questions[i];
    arr = { ...arr, questionText: e.target.value };
    const l = [
      ...Survey.questions.slice(0, i),
      arr,
      ...Survey.questions.slice(i + 1, Survey.questions.length),
    ];
    setSurvey({ ...Survey, questions: l });
    console.log(arr.questionText);
  };
  const DeleteQuestion = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    i: number
  ) => {
    const l = [
      ...Survey.questions.slice(0, i),
      ...Survey.questions.slice(i + 1, Survey.questions.length),
    ];
    setSurvey({ ...Survey, questions: l });
    console.log(`Delete at ${i}`);
  };

  const dublicateQuestion = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    i: number
  ) => {
    let t = Survey;
    let q = t.questions[i];
    t.questions.splice(i + 1, 0, { ...q, id: "" });
    console.log(t);
    setSurvey({ ...t });
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const body = {
      id: "",
      surveyTitle,
      description,
      questions: Survey.questions,
    };

    //console.log(body);
    if (edit) {
      const reqBody = { ...body, id: params.id };
      console.log(reqBody);
      axios
        .put(
          `http://localhost:8082/microsite/survey/update/survey/${params.id}`,
          reqBody
        )
        .then((res) => {
          openNotificationWithIcon("success", "Changes saved");
        })
        .catch((err) => openNotificationWithIcon("error", err.message));
    } else {
      axios
        .post("http://localhost:8082/microsite/survey/add/survey", body)
        .then((res) => {
          openNotificationWithIcon("success", surveyTitle + " created");
          setDescription("");
          setSurveyTitle("");
          setSurvey({ questions: [newQuestion] });
        })
        .catch((err) => {
          openNotificationWithIcon("error", err.message);
        });
    }
  }
  React.useEffect(() => {
    console.log("Inside useEffect");
    if (params.id) {
      setIsLoading(true);
      axios
        .get(`http://localhost:8082/microsite/survey/survey/${params.id}`)
        .then((res) => {
          setSurveyTitle(res.data.data.surveyTitle);
          setDescription(res.data.data.description);
          setSurvey({ questions: res.data.data.questions });
          setSurvey({ questions: res.data.data.questions });
          console.log("Inside get");
          console.log(Survey);
          setIsLoading(false);
        });
      setEdit(true);
    } else {
      setDescription("");
      setSurveyTitle("");
      setSurvey({ questions: [newQuestion] });
      setEdit(false);
    }
  }, [params.id]);

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="question_form">
            <br></br>
            <div className="section">
              <div className="question_title_section">
                <div className="question_form_top">
                  <input
                    type="text"
                    name="surveyTitle"
                    className="question_form_top_name"
                    style={{ color: "black" }}
                    placeholder="Survey Title"
                    value={surveyTitle}
                    onChange={(e) => setSurveyTitle(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    className="question_form_top_desc"
                    style={{ color: "black" }}
                    placeholder="Survey description"
                    name="description"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="container" style={{ paddingTop: "10px" }}>
                {Survey.questions.map((_q, _i) => (
                  <>
                    <form>
                      <div
                        className="card"
                        style={{
                          borderLeft: "4px solid rgb(66, 90, 245)",
                        }}
                      >
                        <div className="card-header">
                          <div className="row">
                            <div className="col-6">
                              <div className="input-group ">
                                <input
                                  key={_i}
                                  type="text"
                                  className="form-control"
                                  placeholder="Question"
                                  aria-label="questionText"
                                  name="questionText"
                                  aria-describedby="basic-addon1"
                                  value={_q.questionText}
                                  onChange={(e) => handleQuestionText(e, _i)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-4">
                              <Select
                                defaultValue={
                                  _q.questionType.length < 1
                                    ? "TextArea"
                                    : _q.questionType
                                }
                                onChange={(e) => handleSelect(e, _i)}
                              >
                                <Option value="SINGLE_CHOICE">
                                  SINGLE_CHOICE
                                </Option>

                                <Option value="MULTIPLE_CHOICE">
                                  MULTIPLE_CHOICE
                                </Option>

                                <Option value="SMALL_TEXT">SMALL_TEXT</Option>
                              </Select>
                            </div>

                            <div className="col-2">
                              <div
                                style={{ position: "absolute", float: "right" }}
                              >
                                <CopyFilled
                                  onClick={(e) => dublicateQuestion(e, _i)}
                                />{" "}
                                <DeleteOutlined
                                  style={{ color: "red" }}
                                  onClick={(e) => DeleteQuestion(e, _i)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body">
                          <div>{handleSwitch(_q.questionType, _i)}</div>
                        </div>
                      </div>
                      <br />
                    </form>
                  </>
                ))}
                <Button type="primary" onClick={(e) => addQuestion(e)}>
                  Add Question
                </Button>
                <div className="row" style={{ float: "right" }}>
                  <button type="submit" className="btn btn-primary">
                    {params.id ? "Save the Changes" : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Survey;
