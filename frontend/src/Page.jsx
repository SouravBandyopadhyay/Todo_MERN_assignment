import React from "react";
import FormComponent from "./Components/Form";

import TableWithSorting from "./Components/TodoTable2";
import { Typography } from "antd";
const { Text, Title } = Typography;
const Page = () => {
  return (
    <div>
      <Title>To-Do List App</Title>
      <FormComponent />
      <TableWithSorting />
    </div>
  );
};

export default Page;
