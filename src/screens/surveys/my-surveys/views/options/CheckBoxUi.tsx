import * as React from "react";
import { Input, Checkbox } from "antd";
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
    console.log("checked = ", checkedValues);
    handleCheckBoxResponse(qId, checkedValues);
  };
  return (
    <div>
      <Checkbox.Group onChange={onChange}>
        {choice.map((c, i) => (
          <>
            <div className="row">
              <div className="col-6">
                <Checkbox value={c.choiceText}>{c.choiceText}</Checkbox>
              </div>
            </div>
            <br />
          </>
        ))}
      </Checkbox.Group>
    </div>
  );
};

export default CheckBoxUi;
