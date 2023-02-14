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
