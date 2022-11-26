import * as React from "react";
import { Select } from "antd";

const { Option } = Select;

function onChange(value: string) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val: string) {
  console.log("search:", val);
}

const person = [
  {
    username: "jstuart123",
    displayName: "John Stuart",
  },
];

const AssigneSearch = () => {
  const [users, setUsers] = React.useState();
  return (
    <>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0 ||
          option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {person.map((p) => (
          <Option value={p.username}>{p.displayName}</Option>
        ))}
      </Select>
    </>
  );
};

export default AssigneSearch;
