import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, Space } from "antd";
import { FaExternalLinkAlt } from "react-icons/fa";

const ModifyComponent = ({ id, title, tag, dueDate, status }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [newTitle, setTitle] = useState(title);
  // const [newtag, setNewtag] = useState(tag);
  const [newDate, setNewdate] = useState(dueDate);
  const [newStatus, setNewstatus] = useState(status);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (event) => {
    setConfirmLoading(true);
    handleSubmit(event);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://json-practice-api.onrender.com/userDetails/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTitle,
            // tag: tag + "," + newtag,
            dueDate: newDate,
            status: newStatus,
          }),
        }
      );
      const updatedUser = await response.json();
      console.log(updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        type="primary"
        info="true"
        shape="circle"
        icon={<FaExternalLinkAlt />}
        onClick={showModal}
      />
      <Modal
        title={`Update Todo/${title}`}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        type="primary"
        htmlType="submit"
      >
        <Form>
          <Form.Item
            name="note"
            label="Title of Task"
            rules={[{ required: true }]}
          >
            <Input
              name="title" //key
              type="text"
              placeholder={title}
              value={newTitle}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Item>
          <Form.Item name="date" label="Due Date" rules={[{ required: true }]}>
            <Input
              type="date"
              name=" Due Date" //key
              placeholder={newDate}
              value={newDate}
              onChange={(event) => setNewdate(event.target.value)}
            />
          </Form.Item>
          {/* <Form.Item name="tag" label="Tags" rules={[{ required: true }]}>
            <Input
              name="tag" //key
              type="text"
              placeholder={tag.trim().toUpperCase().split(",")}
              onChange={(event) => setNewtag(event.target.value.split(","))}
              value={newtag}
            />
          </Form.Item> */}
          <Form.Item name="status" label="Status">
            <Space wrap>
              <Select
                defaultValue="open"
                style={{ width: 120 }}
                onChange={(value) => setNewstatus(value)}
                allowClear
                options={[
                  { value: "open", label: "OPEN" },
                  { value: "working", label: "WORKING" },
                  { value: "done", label: "DONE" },
                  { value: "overdue", label: "OVERDUE" },
                ]}
              />
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModifyComponent;
