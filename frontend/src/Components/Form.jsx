import { Form, Input, Tag, Button } from "antd";
import { useState } from "react";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { TextArea } = Input;

const TodoForm = () => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [hovering, setHovering] = useState(false);
  const handleTagClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const handleTagAdd = () => {
    if (tagInputValue && !tags.includes(tagInputValue)) {
      const newTags = [...tags, tagInputValue];
      setTags(newTags);
      setTagInputValue("");
    }
  };

  const handleSubmit = (values) => {
    const postTask = { ...values, tags, status: "open", timstamp: Date.now() };
    console.log(postTask);
    axios.post("http://localhost:8000/tasks", postTask);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      name="control-ref"
      style={{
        maxWidth: 600,
        margin: "auto",
        justifyContent: "center",
      }}
      autoComplete="off"
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="duedate"
        label="Due Date"
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <Input type="date" name="dueDate" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter a description" }]}
      >
        <Input.TextArea
          showCount
          maxLength={1000}
          style={{ height: 40, resize: "true" }}
          placeholder="Todo Description"
        />
      </Form.Item>
      <Form.Item
        name="tags"
        label="Tags"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div>
          {tags.map((tag) => (
            <Tag key={tag} closable onClose={() => handleTagClose(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
        <Input
          value={tagInputValue}
          onChange={(e) => setTagInputValue(e.target.value)}
          onPressEnter={handleTagAdd}
        />
        <Button onClick={handleTagAdd}>Add tag</Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={hovering}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
