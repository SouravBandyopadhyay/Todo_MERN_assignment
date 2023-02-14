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
        // border: "2px solid red",
        justifyContent: "center",
      }}
      autoComplete="off"
    >
      <Form.Item name="note" label="Task Name" rules={[{ required: true }]}>
        <Input
          name="title" //key
          value={task.name} //value
          onChange={handleChange}
          type="text"
          placeholder="Task Name"
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Task Description"
        rules={[{ required: true }]}
      >
        <TextArea
          showCount
          maxLength={1000}
          style={{ height: 50, resize: "true" }}
          name="description" //key
          value={task.name} //value
          onChange={handleChange}
          placeholder="disable resize"
        />
      </Form.Item>
      <Form.Item name="dueDate" label="Choose Due Date">
        <Input
          type="date"
          name="dueDate"
          value={task.name}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item name="tag" label="Choose Associated Tags">
        <Input name="tag" value={task.name} onChange={handleChange} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button onClick={handleClick} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
