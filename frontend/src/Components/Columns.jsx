import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";
import moment from "moment";
import { FaTrashAlt } from "react-icons/fa";
import ModifyComponent from "./ModifyComponent";
import { renderColor } from "./TodoTable2";
import { deleteHandle } from "./Delete";
export const columns = [
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
    dataIndex: "duedate",
    key: "duedate",
    sorter: (a, b) => a.duedate.localeCompare(b.duedate),
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags) => (
      <>
        {tags.map((el) => (
          <Tag>{el}</Tag>
        ))}
      </>
    ),
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
    render: ({ id, title, tags, duedate, status }) => (
      <Space size="middle">
        <Tooltip placement="bottom" title="Delete">
          <Popconfirm
            placement="top"
            title="Are You really want to delete this task?"
            description="Delete the task"
            onConfirm={() => {
              deleteHandle(id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<FaTrashAlt />}
            />
          </Popconfirm>
        </Tooltip>

        <Tooltip title="Modify">
          <ModifyComponent
            id={id}
            status={status}
            dueDate={duedate}
            title={title}
            tag={tags}
          />
        </Tooltip>
      </Space>
    ),
  },
];
