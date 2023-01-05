import { Input, Radio, RadioChangeEvent } from "antd";
import * as React from "react";
type radioProps = {
  choice: Choice[];
  qId: string;
  handleRadioResponse(qId: string, answer: string): void;
};

interface Choice {
  choiceText: string;
}

const RadioUi = (props: radioProps) => {
  const [value, setValue] = React.useState(false);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    props.handleRadioResponse(props.qId, e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <div>
        <Radio.Group onChange={onChange} value={value}>
          {props.choice.map((c, i) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Radio value={c.choiceText}> {c.choiceText}</Radio>
            </div>
          ))}
        </Radio.Group>
      </div>

      {/* <div className="row">
          <div className="col-6">
            <input
              id={props.qId}
              className="form-check-input"
              type="radio"
              name={props.qId}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={props.optionText}>
              {props.optionText}
            </label>
           
          </div>
        </div> */}
    </>
  );
};

export default RadioUi;
