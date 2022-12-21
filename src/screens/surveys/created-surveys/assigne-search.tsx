import * as React from "react";
import { UserType } from "../../../models/survey";
import { Select, Empty } from "antd";
import axios from "axios";

const { Option } = Select;

type propsType = {
  handleSelectedUser(value: React.SetStateAction<UserType[]>): void;
  userIds: UserType[];
};

const AssigneSearch = (props: propsType) => {
  const [users, SetUsers] = React.useState<UserType[]>([]);

  //const [value, setValue] = React.useState<UserType[]>([]);

  // function onChange(value: React.SetStateAction<string[]>) {
  //   props.handleSelectedUser(value);
  // }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val: String) {
    axios
      .get(`/microsite/users/search?key=${val}`)
      .then((newData) => {
        SetUsers(newData.data.data);
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <>
      <Select
        mode="multiple"
        value={props.userIds}
        style={{ width: 200 }}
        placeholder="Select User"
        optionFilterProp="children"
        onChange={(newValue) => {
          // setValue(newValue as UserType[]);
          props.handleSelectedUser(newValue as UserType[]);
          console.log("Value ", props.userIds);
        }}
        // onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
      >
        {users.length == 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          users.map((p) => <Option value={p.id}>{p.name}</Option>)
        )}
      </Select>
    </>
  );
};

export default AssigneSearch;
