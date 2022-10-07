import { Input } from "antd";
import * as React from "react";
type radioProps = {
  optionText: string;
  qId: string;
  handleRadioResponse(qId: string, answer: string): void;
};

const RadioUi = (props: radioProps) => {
  const [value, setValue] = React.useState(false);
  const handleChange = (e: { target: { value: any } }) => {
    console.log(e.target.value);
    console.log(props.optionText);
    props.handleRadioResponse(props.qId, props.optionText);
    setValue(!value);
  };
  return (
    <div>
      <>
        <div className="row">
          <div className="col-6">
            <input
              id={props.qId}
              className="form-check-input"
              type="radio"
              name={props.optionText}
              // checked={value}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={props.optionText}>
              {props.optionText}
            </label>
            {/* <label htmlFor="html">HTML</label><br></br> */}
          </div>
        </div>
        <br />
      </>
    </div>
  );
};

export default RadioUi;
