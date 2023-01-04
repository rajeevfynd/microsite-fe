import * as React from "react";
import { Checkbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

interface choiceprops {
  choice: Choice[];
  qId: string;
  handleCheckBoxResponse(quid: string, answer: CheckboxValueType[]): void;
  //  isEdit: boolean;
}
interface Choice {
  choiceText: string;
}

const CheckBoxUi: React.FC<choiceprops> = ({
  choice,
  qId,
  handleCheckBoxResponse,
}): JSX.Element => {
  const onChange = (checkedValues: CheckboxValueType[]) => {
    handleCheckBoxResponse(qId, checkedValues);
  };
  return (
    <div>
      <Checkbox.Group onChange={onChange}>
        {choice.map((c, i) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {" "}
              <Checkbox value={c.choiceText}>{c.choiceText}</Checkbox>
            </div>
          </>
        ))}
      </Checkbox.Group>
    </div>
  );
};

export default CheckBoxUi;
