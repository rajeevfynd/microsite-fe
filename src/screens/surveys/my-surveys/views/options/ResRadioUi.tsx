import { Input, Radio, RadioChangeEvent } from "antd";
import * as React from "react";
type radioProps = {
  choice: Choice[];
  answer: string;
};

interface Choice {
  choiceText: string;
}

const ResRadioUi = (props: radioProps) => {
  const [value, setValue] = React.useState(props.answer);
  const handleChange = (e: { target: { value: any } }) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <div>
        <Radio.Group value={value}>
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

      {/* <>
        <div className="row">
          <div className="col-6">
            <input
              key={props.i}
              className="form-check-input"
              type="radio"
              name={props.qId}
              onChange={handleChange}
              checked={props.radioAnswer}
              disabled
            />
            {props.optionText}
          </div>
        </div>
        <br />
      </> */}
    </div>
  );
};

export default ResRadioUi;
