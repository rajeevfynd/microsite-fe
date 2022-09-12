import { Input } from "antd";
import * as React from "react";
type radioProps = {
  i: number;
  optionText: string;
};

const RadioUi = (props: radioProps) => {
  return (
    <div>
      <>
        <div className="row">
          <div className="col-6">
            <>
              <input
                key={props.i}
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
              />
              {props.optionText}
            </>
          </div>
        </div>
        <br />
      </>
    </div>
  );
};

export default RadioUi;
