import React, { useRef, useState } from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import axios from "axios";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { TextArea } = Input;
const FormComponent = () => {
  const initialData = {
    title: "", // title of task
    description: "", //description
    dueDate: "", //due date
    tag: ["todo"], // tags user can add (Optional)
    status: "open", // by default it is open
    timstamp: Date.now(),
  };
  const [task, setTask] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((elem) => ({
      ...elem,
      [name]: value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios.post("https://json-practice-api.onrender.com/userDetails", task);
  };
  return (
    <Form
      {...layout}
      name="control-ref"
      style={{
        maxWidth: 600,
        margin: "auto",

        justifyContent: "center",
      }}
      autoComplete="off"
    >
      <Form.Item
        name="note"
        label="Task Name"
        rules={[{ required: true }]}
        wrapperCol={{ offset: 1, span: 15 }}
      >
        <Input
          name="title"
          value={task.name}
          onChange={handleChange}
          type="text"
          placeholder="Task Name"
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Task Description"
        rules={[{ required: true }]}
        wrapperCol={{ offset: 1, span: 15 }}
      >
        <TextArea
          showCount
          maxLength={1000}
          style={{ height: 40, resize: "true" }}
          name="description"
          value={task.name}
          onChange={handleChange}
          placeholder="Todo Description"
        />
      </Form.Item>
      <Form.Item
        name="dueDate"
        label="Choose Due Date"
        wrapperCol={{ offset: 1, span: 15 }}
      >
        <Input
          type="date"
          name="dueDate"
          value={task.name}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        name="tag"
        label="Choose Associated Tags"
        wrapperCol={{ offset: 1, span: 15 }}
      >
        <Input name="tag" value={task.name} onChange={handleChange} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button onClick={handleClick} type="primary" ghost htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
