import * as React from "react";
import { Input, Checkbox } from "antd";
import { PlusCircleTwoTone, CloseCircleFilled } from "@ant-design/icons";

type propsType = {
  i: number;
  j: number;
  optionText: string;
  handleDeleteOption(i: number, j: number): void;
  handleAddOption(i: number, j: number): void;
  handleOPtionIn(
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    j: number
  ): void;
};
const CheckBoxUi = (props: propsType) => {
  const handleCheckBox = () => {};
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <Checkbox onChange={handleCheckBox}>
            {" "}
            <Input
              value={props.optionText}
              placeholder="Enter option"
              onChange={(e) => props.handleOPtionIn(e, props.i, props.j)}
            />{" "}
          </Checkbox>
        </div>
        <div className="col-6">
          <span onClick={(_e) => console.log("hi")}>
            <PlusCircleTwoTone
              onClick={(e) => props.handleAddOption(props.i, props.j)}
            />{" "}
          </span>
          <span>
            <CloseCircleFilled
              style={{ color: "red" }}
              onClick={(e) => props.handleDeleteOption(props.i, props.j)}
            />
          </span>
        </div>
      </div>
      <br />
    </div>
  );
};

export default CheckBoxUi;
