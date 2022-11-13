import { Input } from "antd";
import * as React from "react";
type radioProps = {
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
import { PlusCircleTwoTone, CloseCircleFilled } from "@ant-design/icons";

const RadioUi = (props: radioProps) => {
  return (
    <div>
      <>
        <div className="row">
          <div className="col-6">
            <>
              <Input
                //key={props.i}
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
              />
              <Input
                placeholder="Enter option"
                value={props.optionText}
                required
                onChange={(e) => props.handleOPtionIn(e, props.i, props.j)}
              />
            </>
          </div>
          <div className="col-6" data-html2canvas-ignore="true">
            <PlusCircleTwoTone
              onClick={(e) => props.handleAddOption(props.i, props.j)}
            />
            <span> </span>
            <CloseCircleFilled
              style={{ color: "red" }}
              onClick={(e) => props.handleDeleteOption(props.i, props.j)}
            />
          </div>
        </div>
        <br />
      </>
    </div>
  );
};

export default RadioUi;
