// import * as React from "react";
// import type { ColumnsType } from "antd/es/table";
// import { useState } from "react";
// import { getDasboardTable } from "../../../service/survey-service";
// import { Space, Spin, Table, TableProps, Tag } from "antd";
// import { FilterValue } from "antd/es/table/interface";
// import { useParams } from "react-router-dom";
// import * as moment from "moment";
// import InfiniteScroll from "react-infinite-scroll-component";

// interface TableParams {
//   filters?: Record<string, FilterValue>;
// }

// interface DataType {
//   date: Date;
//   assigneeId: string;
//   assignedDate: string;
//   expiredDate: string;
//   status: string;
// }
// const DasboardTable = () => {
//   const [filteredInfo, setFilteredInfo] = useState<
//     Record<string, FilterValue | null>
//   >({});
//   const handleChange: TableProps<DataType>["onChange"] = (
//     pagination,
//     filters,
//     sorter
//   ) => {
//     console.log("Various parameters", pagination, filters, sorter);
//     setFilteredInfo(filters);
//   };
//   const clearFilters = () => {
//     setFilteredInfo({});
//   };

//   const clearAll = () => {
//     setFilteredInfo({});
//   };

//   const columns: ColumnsType<DataType> = [
//     {
//       title: "Assignee",

//       dataIndex: "assigneeId",

//       key: "assigneeId",

//       render: (text) => <a>{text}</a>,
//     },

//     {
//       title: "Assigned Date",

//       dataIndex: "assignedDate",

//       key: "assignedDate",

//       defaultSortOrder: "descend",
//       sorter: (a, b) =>
//         moment(a.assignedDate).unix() - moment(b.assignedDate).unix(),
//     },

//     {
//       title: "Expire Date",

//       dataIndex: "expiredDate",

//       key: "expiredDate",

//       defaultSortOrder: "descend",
//       sorter: (a, b) =>
//         moment(a.expiredDate).unix() - moment(b.expiredDate).unix(),
//     },

//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (text) => (
//         <>
//           {text == "submitted" ? (
//             <Tag color="green">submitted</Tag>
//           ) : text == "expired" ? (
//             <Tag color="volcano">Expired</Tag>
//           ) : (
//             <Tag color="geekblue">pending</Tag>
//           )}
//         </>
//       ),
//       filters: [
//         {
//           text: "Expired",
//           value: "expired",
//         },
//         {
//           text: "Submitted",
//           value: "submitted",
//         },
//         {
//           text: "Pending",
//           value: "pending",
//         },
//       ],
//       onFilter: (value: String, record) => record.status.indexOf(value) === 0,
//     },

//     {
//       title: "Action",

//       key: "action",

//       render: (_, record) => (
//         <Space size="middle">
//           <div className="btn btn-primary">send Remainder</div>
//         </Space>
//       ),
//     },
//   ];

//   const params = useParams();

//   const [data, setData] = React.useState<DataType[]>([]);
//   const [pageNumber, setPageNumber] = React.useState(0);
//   const [hasMore, setHasMore] = React.useState(true);
//   const [initialLoad, setInitialLoad] = React.useState(false);
//   // rowSelection object indicates the need for row selection
//   const loadMore = () => {
//     console.log("Load MOre is called,", pageNumber);
//     getDasboardTable(params.id, pageNumber)
//       .then((res) => {
//         console.log("From Load more ", res.data);
//         setData([...data, ...res.data.content]);
//         setHasMore(!res.data.last);
//         console.log("Hasmore", hasMore);
//         console.log("Data Lenght", data.length);
//         setPageNumber(pageNumber + 1);
//       })
//       .catch((err) => console.log(err.message));
//   };
//   const rowSelection = {
//     onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
//       console.log(
//         `selectedRowKeys: ${selectedRowKeys}`,
//         "selectedRows: ",
//         selectedRows
//       );
//     },
//   };
//   React.useEffect(() => {
//     !initialLoad &&
//       getDasboardTable(params.id, pageNumber)
//         .then((res) => {
//           console.log("Inside use Effect");
//           setData(res.data.content);
//           setHasMore(!res.data.last);
//           console.log("Hasmore", hasMore);
//           console.log("Data Lenght", data.length);
//           setPageNumber(pageNumber + 1);
//           setInitialLoad(true);
//         })
//         .catch((err) => console.log(err.message));
//   }, []);
//   return (
//     <div>
//       <InfiniteScroll
//         dataLength={data.length}
//         next={loadMore}
//         hasMore={hasMore} //false
//         loader={<Spin size="small" />}
//         scrollableTarget="ant-table-row"
//       >
//         <Table
//           columns={columns}
//           dataSource={data}
//           onChange={handleChange}
//           pagination={false}
//           scroll={{
//             scrollToFirstRowOnChange: false,
//             y: 100,
//           }}
//         />
//       </InfiniteScroll>
//     </div>
//   );
// };

// export default DasboardTable;
