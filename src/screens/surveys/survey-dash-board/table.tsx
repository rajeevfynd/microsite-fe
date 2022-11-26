import * as React from "react";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { Space, Table, TableProps, Tag } from "antd";
import { FilterValue } from "antd/es/table/interface";
import axios from "axios";
import { color } from "html2canvas/dist/types/css/types/color";
interface TableParams {
  filters?: Record<string, FilterValue>;
}

interface DataType {
  assigneeId: string;

  assignedDate: string;
  expiredDate: string;
  completed: string;
}
const DasboardTable = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
  };
  let color = "volcano";

  const columns: ColumnsType<DataType> = [
    {
      title: "Assignee",

      dataIndex: "assigneeId",

      key: "assigneeId",

      render: (text) => <a>{text}</a>,
    },

    {
      title: "Assigned Date",

      dataIndex: "assignedDate",

      key: "assignedDate",
    },

    {
      title: "Expire Date",

      dataIndex: "expiredDate",

      key: "expiredDate",
    },

    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (text) => (
        <span color={color}>
          {text ? (
            <div style={{ color: "green" }}>submitted</div>
          ) : (
            <div color={color}>Expired</div>
          )}
        </span>
      ),
    },

    {
      title: "Action",

      key: "action",

      render: (_, record) => (
        <Space size="middle">
          <div className="btn btn-primary">send Remainder</div>
        </Space>
      ),
    },
  ];

  const [data, setData] = React.useState<DataType[]>();
  // rowSelection object indicates the need for row selection
  const getTableData = async () => {
    try {
      let res = await axios.get(`/microsite/surveys/dash-board/1`);
      console.log(res.data);
      setData(res.data.data.dashBoardResponseDto);
      console.log("Data", data);
    } catch (error) {
      console.log(error.message);
    }
  };
  React.useEffect(() => {
    getTableData();
  }, []);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
        }}
        columns={columns}
        pagination={{
          position: ["bottomRight"],
        }}
        dataSource={data}
        onChange={handleChange}
      />
    </div>
  );
};

export default DasboardTable;
