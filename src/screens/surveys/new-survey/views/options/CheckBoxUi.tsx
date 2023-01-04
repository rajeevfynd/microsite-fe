import * as React from "react";
import { Input, Checkbox, Button, Radio } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

type propsType = {
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
const CheckBoxUi = (props: propsType) => {
  const handleCheckBox = () => {};
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Checkbox disabled>
          <Input
            placeholder="Enter option"
            value={props.optionText}
            required
            onChange={(e) => props.handleOPtionIn(e, props.i, props.j)}
          />
        </Checkbox>

        <Button
          shape="circle"
          type="text"
          icon={<CloseCircleOutlined />}
          onClick={(e) => props.handleDeleteOption(props.i, props.j)}
        />
      </div>
      <br />
    </>
  );

  {
    /* <div className="row">
        <div className="col-6">
          <Checkbox onChange={handleCheckBox} disabled={true}>
            {" "}
            <Input
              value={props.optionText}
              placeholder="Enter option"
              required
              onChange={(e) => props.handleOPtionIn(e, props.i, props.j)}
            />{" "}
          </Checkbox>
        </div>
        <div className="col-6" data-html2canvas-ignore="true">
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
      <br /> */
  }
  //</div>
};

export default CheckBoxUi;
