import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Tooltip, Button } from "antd";
import moment from "moment";
import { FaTrashAlt } from "react-icons/fa";
import ModifyComponent from "./ModifyComponent";
import Search from "antd/es/transfer/search";
import { columns } from "./Columns.jsx";
export function renderColor(status) {
  switch (status) {
    case "open":
      return <Tag color="green">OPEN</Tag>;
    case "working":
      return <Tag color="yellow">WORKING</Tag>;
    case "done":
      return <Tag color="orange">DONE</Tag>;
    case "overdue":
      return <Tag color="red">OVERDUE</Tag>;
    default:
      return <Tag color="warning">Invalid </Tag>;
  }
}
// const columns = [
//   {
//     title: "ID",
//     dataIndex: "id",
//     key: "id",
//     sorter: (a, b) => a.id - b.id,
//   },
//   {
//     title: "Timestamp",
//     dataIndex: "timstamp",
//     key: "timstamp",
//     sorter: (a, b) => a.timestamp - b.timestamp,
//     render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
//   },
//   {
//     title: "Title",
//     dataIndex: "title",
//     key: "title",
//     sorter: (a, b) => a.title.localeCompare(b.title),
//   },
//   {
//     title: "Description",
//     dataIndex: "description",
//     key: "description",
//     sorter: (a, b) => a.description.localeCompare(b.description),
//   },
//   {
//     title: "Due Date",
//     dataIndex: "dueDate",
//     key: "dueDate",
//     sorter: (a, b) => a.description.localeCompare(b.description),
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//     key: "status",
//     render: (status) => <>{renderColor(status)}</>,
//     filters: [
//       {
//         text: "OPEN",
//         value: "open",
//       },
//       {
//         text: "WORKING",
//         value: "working",
//       },
//       {
//         text: "DONE",
//         value: "done",
//       },
//       {
//         text: "OVERDUE",
//         value: "overdue",
//       },
//     ],
//     onFilter: (value, record) => record.status === value,
//   },
//   {
//     title: "Action",
//     key: "action",
//     render: ({ id, title, tag, dueDate, status }) => (
//       <Space size="middle">
//         <Tooltip title="Delete">
//           <Button
//             onClick={() => deleteHandle(id)}
//             type="primary"
//             danger
//             shape="circle"
//             icon={<FaTrashAlt />}
//           />
//         </Tooltip>
//         <Tooltip title="Modify">
//           <ModifyComponent
//             id={id}
//             status={status}
//             dueDate={dueDate}
//             title={title}
//             tag={tag}
//           />
//         </Tooltip>
//       </Space>
//     ),
//   },
// ];

const TableWithSorting = () => {
  const [data, setData] = useState([]);
  const fetchApi = async () => {
    let res = await fetch("https://json-practice-api.onrender.com/userDetails");
    let fetchedData = res.json();
    fetchedData
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ----------------
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
    setPagination(pagination);
  };
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPagination({ current: 1, pageSize: 10 });
  };

  const handleReset = () => {
    setSearchText("");
    setPagination({ current: 1, pageSize: 10 });
  };
  const searchInput = (
    <Search
      placeholder="Search"
      value={searchText}
      onChange={handleSearch}
      allowClear
      onSearch={() => console.log("Searched!")}
    />
  );
  const filteredData = searchText
    ? data.filter((record) =>
        Object.values(record).some((value) =>
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : data;

  const paginatedData = filteredData.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  useEffect(() => {
    fetchApi();
  }, [filteredData]);
  return (
    <Table
      dataSource={paginatedData.length === 0 ? filteredData : paginatedData}
      columns={columns}
      onChange={handleChange}
      pagination={true}
      sortDirections={["ascend", "descend", "ascend"]}
      size="small"
      bordered
      title={() => searchInput}
      footer={() =>
        searchText && (
          <button type="button" onClick={handleReset}>
            Reset Search
          </button>
        )
      }
    />
  );
};

export default TableWithSorting;
