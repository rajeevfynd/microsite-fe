import { Select, Button } from "antd";

import * as React from "react";

import { DeleteOutlined, CopyFilled } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import RadioUi from "./options/RadioUI";
import CheckBoxUi from "./options/CheckBoxUi";
import axios from "axios";
import { useParams } from "react-router-dom";

const Survey = () => {
  const { Option } = Select;
  const params = useParams();

  const [surveyTitle, setSurveyTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const newQuestion = {
    id: "",
    questionText: "",
    questionType: "",
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

  const handleAddOption = (i: number, j: number) => {
    console.log(i + " " + j);
    let t = Survey;
    t.questions[i].choice.splice(j + 1, 0, { id: "", choiceText: "" });
    console.log(t);
    setSurvey({ ...t });
  };

  const handleOPtionIn = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    j: number
  ) => {
    console.log(i + " " + j);
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
              handleOPtionIn={handleOPtionIn}
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
            handleOPtionIn={handleOPtionIn}
          />
        ))}
      </>
    );
  };
  const handleSwitch = (v: string, i: number) => {
    switch (v) {
      case "radio":
        return radioUI(i);
      case "checkBox":
        return checkBoxUI(i);
      default:
        return <TextArea></TextArea>;
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
    let a = Survey.questions[i];
    a = { ...a, questionText: e.target.value };
    const l = [
      ...Survey.questions.slice(0, i),
      a,
      ...Survey.questions.slice(i + 1, Survey.questions.length),
    ];
    setSurvey({ ...Survey, questions: l });
    console.log(a.questionText);
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
    t.questions.splice(i + 1, 0, q);
    console.log(t);
    setSurvey({ ...t });
  };
  function handleSubmit(): void {
    const body = {
      surveyTitle,
      description,
      questions: Survey.questions,
    };

    console.log(body);
    // axios
    //   .post("http://localhost:8082/microsite/survey/add/survey", body)
    //   .then((res) => {
    //     console.log(res.data);
    //     setDescription("");
    //     setSurveyTitle("");
    //     setSurvey({ questions: [newQuestion] });
    //   })
    //   .catch((err) => console.log(err.message));
  }
  React.useEffect(() => {
    console.log("Inside useEffect");
    if (params.id) {
      axios
        .get(`http://localhost:8082/microsite/survey/survey/${params.id}`)
        .then((res) => {
          setSurveyTitle(res.data.data.surveyTitle);
          setDescription(res.data.data.description);
          setSurvey({ questions: res.data.data.questions });
        });
    } else {
      setDescription("");
      setSurveyTitle("");
      setSurvey({ questions: [newQuestion] });
    }
  }, [params.id]);
  return (
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
                          <Option value="radio">Radio</Option>

                          <Option value="checkBox">check Box</Option>

                          <Option value="TextArea">SmallText</Option>
                        </Select>
                      </div>

                      <div className="col-2">
                        <div style={{ position: "absolute", float: "right" }}>
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
            <div className="btn btn-primary" onClick={() => handleSubmit()}>
              {params.id ? "Save the Changes" : "Submit"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
