import * as React from "react";
import { Input, Checkbox } from "antd";

type propsType = {
  optionText: string;
};
const CheckBoxUi = (props: propsType) => {
  const handleCheckBox = () => {};
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <Checkbox onChange={handleCheckBox}>{props.optionText}</Checkbox>
        </div>
      </div>
      <br />
    </div>
  );
};

export default CheckBoxUi;
