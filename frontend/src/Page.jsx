import React from "react";
import FormComponent from "./Components/Form";

import TableWithSorting from "./Components/TodoTable";
import { Typography } from "antd";
const { Title } = Typography;
const Page = () => {
  return (
    <div>
      <Title strong italic>
        ToDo List App
      </Title>
      <FormComponent />
      <Title strong italic level={2}>
        ToDo List Table
      </Title>
      <TableWithSorting />
    </div>
  );
};

export default Page;
