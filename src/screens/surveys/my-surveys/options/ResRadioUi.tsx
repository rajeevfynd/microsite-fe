import { Input } from "antd";
import * as React from "react";
type radioProps = {
  i: number;
  optionText: string;
  qId: string;
  radioAnswer: boolean;
};

const ResRadioUi = (props: radioProps) => {
  const handleChange = (e: { target: { value: any } }) => {
    console.log(e.target.value);
    console.log(props.optionText);
  };
  return (
    <div>
      <>
        <div className="row">
          <div className="col-6">
            <input
              key={props.i + 1}
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              onChange={handleChange}
              checked={props.radioAnswer}
              disabled
            />
            {props.optionText}
          </div>
        </div>
        <br />
      </>
    </div>
  );
};

export default ResRadioUi;
