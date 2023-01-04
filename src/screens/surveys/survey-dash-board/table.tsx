import * as React from "react";
import { useVT } from "virtualizedtableforantd4";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { getDasboardTable } from "../../../service/survey-service";
import { Space, Spin, Table, TableProps, Tag } from "antd";
import { FilterValue } from "antd/es/table/interface";
import moment from "moment";

interface TableParams {
  filters?: Record<string, FilterValue>;
}

type DasboardParams = {
  id: string;
};

interface DataType {
  date: Date;
  assigneeId: string;
  assignedDate: string;
  expiredDate: string;
  status: string;
}
const DasboardTable = () => {
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [totalLength, setTotalLength] = React.useState<number>(0);
  const [initialLoad, setInitialLoad] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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

      defaultSortOrder: "descend",
      sorter: (a, b) =>
        moment(a.assignedDate).unix() - moment(b.assignedDate).unix(),
    },

    {
      title: "Expire Date",

      dataIndex: "expiredDate",

      key: "expiredDate",

      defaultSortOrder: "descend",
      sorter: (a, b) =>
        moment(a.expiredDate).unix() - moment(b.expiredDate).unix(),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <>
          {text == "submitted" ? (
            <Tag color="green">submitted</Tag>
          ) : text == "expired" ? (
            <Tag color="volcano">Expired</Tag>
          ) : (
            <Tag color="geekblue">pending</Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "Expired",
          value: "expired",
        },
        {
          text: "Submitted",
          value: "submitted",
        },
        {
          text: "Pending",
          value: "pending",
        },
      ],
      onFilter: (value: any, record) => record.status.indexOf(value) === 0,
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

  const [tableData, setData] = React.useState<DataType[]>([]);

  const [hasMore, setHasMore] = React.useState(true);

  // rowSelection object indicates the need for row selection
  const loadMore = () => {
    console.log("Load MOre is called,", pageNumber);
    getDasboardTable("2", pageNumber)
      .then((res) => {
        setData([...tableData, ...res.data.content]);
        setHasMore(!res.data.last);
        setTotalLength(res.data.totalElements);
        console.log(res.data.totalElements);
      })
      .catch((err) => console.log(err.message));
    setPageNumber(pageNumber + 1);
    console.log(pageNumber);
  };
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  React.useEffect(() => {
    !initialLoad &&
      getDasboardTable("2", pageNumber)
        .then((res) => {
          console.log("Inside use Effect");
          setData(res.data.content);
          console.log(res.data.content);
          setHasMore(!res.data.last);
          console.log("Hasmore", hasMore);
          console.log("Data Lenght", tableData.length);
          setPageNumber(pageNumber + 1);
          setInitialLoad(true);
        })
        .catch((err) => console.log(err.message));
  }, []);

  const [vt] = useVT(
    () => ({
      onScroll: async ({ top, isEnd }) => {
        if (isEnd) {
          if (tableData.length != totalLength) {
            loadMore();
          }
        }
      },
      scroll: {
        y: 500,
      },
      debug: false,
    }),
    [tableData]
  );

  React.useEffect(() => {
    !initialLoad &&
      getDasboardTable("1", pageNumber)
        .then((res) => {
          console.log("Inside use Effect");
          setData(res.data.content);
          setHasMore(!res.data.last);
          setTotalLength(res.data.totalElements);
          setInitialLoad(true);
        })
        .catch((err) => console.log(err.message));
    setPageNumber(pageNumber + 1);
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      style={{ padding: 20 }}
      components={vt}
      pagination={false}
      loading={loading}
      scroll={{
        scrollToFirstRowOnChange: false,
        y: 450,
      }}
    />
  );
};

export default DasboardTable;
