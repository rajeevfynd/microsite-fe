import { Input } from "antd";
import * as React from "react";
type radioProps = {
  optionText: string;
  qId: string;
  handleRadioResponse(qId: string, answer: string): void;
};

const RadioUi = (props: radioProps) => {
  const handleChange = (e: { target: { value: any } }) => {
    console.log(e.target.value);
    console.log(props.optionText);
    props.handleRadioResponse(props.qId, props.optionText);
  };
  return (
    <div>
      <>
        <div className="row">
          <div className="col-6">
            <input
              id={props.optionText}
              className="form-check-input"
              type="radio"
              //name="flexRadioDefault"
              onChange={handleChange}
            />
            {props.optionText}
          </div>
        </div>
        <br />
      </>
    </div>
  );
};

export default RadioUi;
