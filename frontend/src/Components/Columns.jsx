import { Button, Space, Tooltip } from "antd";
import moment from "moment";
import { FaTrashAlt } from "react-icons/fa";
import ModifyComponent from "./ModifyComponent";
import { renderColor } from "./TodoTable2";
import { deleteHandle } from "./Delete";
export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Timestamp",
    dataIndex: "timstamp",
    key: "timstamp",
    sorter: (a, b) => a.timstamp - b.timstamp,
    render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    sorter: (a, b) => a.description.localeCompare(b.description),
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    sorter: (a, b) => a.dueDate.localeCompare(b.dueDate),
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
        text: "DONE",
        value: "done",
      },
      {
        text: "OVERDUE",
        value: "overdue",
      },
    ],
    onFilter: (value, record) => record.status === value,
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
