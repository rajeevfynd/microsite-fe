import { Button, Input, Radio } from "antd";
import * as React from "react";
type radioProps = {
  i: number;
  j: number;
  optionText: string;
  handleDeleteOption(i: number, j: number): void;
  handleOPtionIn(
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    j: number
  ): void;
};

import { CloseCircleOutlined } from "@ant-design/icons";

const RadioUi = (props: radioProps) => {
  return (
    <div>
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Radio name="flexRadioDefault" disabled>
            <Input
              placeholder="Enter option"
              value={props.optionText}
              required
              onChange={(e) => props.handleOPtionIn(e, props.i, props.j)}
            />
          </Radio>

          <Button
            shape="circle"
            type="text"
            icon={<CloseCircleOutlined />}
            onClick={(e) => props.handleDeleteOption(props.i, props.j)}
          />
        </div>
        <br />
      </>
    </div>
  );
};

export default RadioUi;
