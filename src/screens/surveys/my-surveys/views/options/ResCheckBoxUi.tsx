import * as React from "react";
import { Input, Checkbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

const ResCheckBoxUi = (props: {
  choice: any[];
  qId: string;
  checkAnswer: string[];
}) => {
  const onChange = (checkedValues: CheckboxValueType[]) => {
    React.useEffect(() => {
      console.log("Use effect check", props.checkAnswer);
    }, []);
  };
  return (
    <div>
      <Checkbox.Group
        onChange={onChange}
        disabled
        defaultValue={props.checkAnswer} ///['c1','c2],
      >
        {props.choice.map(
          (
            c: {
              choiceText:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal;
            },
            i: React.Key
          ) => (
            <>
              <div className="row" key={i}>
                <div className="col-6">
                  <Checkbox value={c.choiceText}>{c.choiceText}</Checkbox>
                </div>
              </div>
              <br />
            </>
          )
        )}
      </Checkbox.Group>
    </div>
  );
};

export default ResCheckBoxUi;
