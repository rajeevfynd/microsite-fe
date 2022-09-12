import { Select } from "antd";

import * as React from "react";
import TextArea from "antd/lib/input/TextArea";
import RadioUi from "./options/RadioUI";
import CheckBoxUi from "./options/CheckBoxUi";
import { Surveys } from "../DummyData";
const Survey = () => {
  const { Option } = Select;
  const survey = Surveys[0];

  const radioUI = (i: number) => {
    return (
      <>
        <div className="form-check">
          {survey.questions[i].Option.map((op) => (
            <RadioUi i={i} optionText={op.optionText} />
          ))}
        </div>
      </>
    );
  };
  const checkBoxUI = (i: number) => {
    return (
      <>
        {survey.questions[i].Option.map((op, j) => (
          <CheckBoxUi optionText={op.optionText} />
          //   <CheckBoxUi/>
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

  return (
    <div className="question_form">
      <br></br>
      <div className="section">
        <div className="question_title_section">
          <div className="question_form_top">
            {/* Title of the Survey*/}
            <h1>{survey.SurveyTile}</h1>
            <p>{survey.Description}</p>
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
        <div className="btn btn-primary"> Submit</div>
      </div>
    </div>
  );
};

export default Survey;
