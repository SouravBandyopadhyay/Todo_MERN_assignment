import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import { deleteHandle } from "./Delete";
import ModifyComponent from "./ModifyComponent";
import moment from "moment";

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

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Timestamp",
    dataIndex: "timstamp",
    key: "timestamp",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.timestamp - b.timestamp,
    render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "Tile",
    dataIndex: "title",
    key: "title",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.title - b.title,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.description - b.description,
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => <>{renderColor(status)}</>,
    filters: [
      {
        text: "OPEN",
        value: "open",
      },
      {
        text: "WORKING",
        value: "working",
      },
      {
        text: "done",
        value: "DONE",
      },
      {
        text: "overdue",
        value: "OVERDUE",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: "Action",
    key: "action",
    render: ({ id, title, tag, dueDate, status }) => (
      <Space size="middle">
        <Tooltip title="Delete">
          <Button
            onClick={() => deleteHandle(id)}
            type="primary"
            danger
            shape="circle"
            icon={<FaTrashAlt />}
          />
        </Tooltip>
        <Tooltip title="Modify">
          <ModifyComponent
            id={id}
            status={status}
            dueDate={dueDate}
            title={title}
            tag={tag}
          />
        </Tooltip>
      </Space>
    ),
  },
];

const TodoTable = () => {
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
  useEffect(() => {
    fetchApi();
  }, []);
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  return (
    <Table
      onChange={handleChange}
      columns={columns}
      dataSource={data}
      key={data.id}
      pagination={false}
    />
  );
};

export default TodoTable;

[
  {
    id: 1,
    title: "Task 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    dueDate: "2023-02-28T08:00:00.000Z",
    tag: ["High", "Urgent"],
    status: "open",
    timestamp: Date.now(),
  },
  {
    id: 2,
    title: "Task 2",
    description:
      "Vestibulum malesuada interdum nulla, id bibendum orci maximus non.",
    dueDate: "2023-03-10T08:00:00.000Z",
    tag: ["Medium", "Important"],
    status: "open",
    timestamp: Date.now(),
  },
  {
    id: 3,
    title: "Task 3",
    description:
      "Sed consequat, mauris sit amet hendrerit tincidunt, nibh quam malesuada massa, quis eleifend risus mauris id arcu.",
    dueDate: "2023-03-15T08:00:00.000Z",
    tag: ["Low", "Urgent"],
    status: "open",
    timestamp: Date.now(),
  },
  {
    id: 4,
    title: "Task 4",
    description: "Suspendisse nec eros in nunc bibendum malesuada.",
    dueDate: "2023-03-20T08:00:00.000Z",
    tag: ["High", "Important"],
    status: "open",
    timestamp: Date.now(),
  },
  {
    id: 5,
    title: "Task 5",
    description:
      "Praesent feugiat, velit nec laoreet lobortis, velit velit mattis risus, et rutrum metus odio eu dolor.",
    dueDate: "2023-03-25T08:00:00.000Z",
    tag: ["Medium"],
    status: "open",
    timestamp: Date.now(),
  },
  {
    id: 6,
    title: "Task 6",
    description: "Mauris non eros elit.",
    dueDate: "2023-03-30T08:00:00.000Z",
    tag: ["Low", "Important"],
    status: "open",
    timestamp: Date.now(),
  },
  {
    id: 7,
    title: "Task 7",
    description: "In ut consectetur massa.",
    dueDate: "2023-04-05T08:00:00.000Z",
    tag: ["High"],
    status: "open",
    timestamp: Date.now(),
  },
  {
    id: 8,
    title: "Task 8",
    description: "Vivamus non sapien non odio consequat consequat eu eu velit.",
    dueDate: "2023-04-10T08:00:00.000Z",
    tag: ["Medium", "Important"],
    status: "open",
    timestamp: Date.now(),
  },
];





// import React, { useEffect, useState } from "react";
// import { Button, Table, Tag } from "antd";
// import Search from "antd/es/transfer/search";
// import { columns } from "./Columns.jsx";
// export function renderColor(status) {
//   switch (status) {
//     case "open":
//       return (
//         <Tag color="green">
//           <strong>OPEN</strong>
//         </Tag>
//       );
//     case "working":
//       return (
//         <Tag color="yellow">
//           <strong>WORKING</strong>
//         </Tag>
//       );
//     case "done":
//       return (
//         <Tag color="orange">
//           <strong>DONE</strong>
//         </Tag>
//       );
//     case "overdue":
//       return (
//         <Tag color="red">
//           <strong>OVERDUE</strong>
//         </Tag>
//       );
//     default:
//       return (
//         <Tag color="warning">
//           <strong>Invalid </strong>
//         </Tag>
//       );
//   }
// }

// const TableWithSorting = () => {
//   const [data, setData] = useState([]);
//   const fetchApi = async () => {
//     let res = await fetch("https://json-practice-api.onrender.com/userDetails");
//     let fetchedData = res.json();
//     fetchedData
//       .then((res) => {
//         console.log(res);
//         setData(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // ----------------
//   const [sortedInfo, setSortedInfo] = useState({});
//   const [filteredInfo, setFilteredInfo] = useState({});
//   const [searchText, setSearchText] = useState("");
//   const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
//   const handleChange = (pagination, filters, sorter) => {
//     setSortedInfo(sorter);
//     setFilteredInfo(filters);
//     setPagination(pagination);
//   };
//   const handleSearch = (e) => {
//     setSearchText(e.target.value);
//     setPagination({ current: 1, pageSize: 10 });
//   };

//   const handleReset = () => {
//     setSearchText("");
//     setPagination({ current: 1, pageSize: 10 });
//   };
//   const searchInput = (
//     <Search
//       placeholder="Search"
//       value={searchText}
//       onChange={handleSearch}
//       allowClear
//       onSearch={() => console.log("Searched!")}
//     />
//   );
//   const filteredData = searchText
//     ? data.filter((record) =>
//         Object.values(record).some((value) =>
//           value.toString().toLowerCase().includes(searchText.toLowerCase())
//         )
//       )
//     : data;

//   const paginatedData = filteredData.slice(
//     (pagination.current - 1) * pagination.pageSize,
//     pagination.current * pagination.pageSize
//   );

//   useEffect(() => {
//     fetchApi();
//   }, []);
//   return (
//     <Table
//       rowKey={(record) => record.id}
//       dataSource={paginatedData.length === 0 ? filteredData : paginatedData}
//       columns={columns}
//       onChange={handleChange}
//       pagination={true}
//       sortDirections={["ascend", "descend", "ascend"]}
//       size="small"
//       bordered
//       title={() => searchInput}
//       footer={() =>
//         searchText && (
//           <Button onClick={handleReset} type="primary" ghost htmlType="submit">
//             Reset Search
//           </Button>
//         )
//       }
//     />
//   );
// };

// export default TableWithSorting;
// ---