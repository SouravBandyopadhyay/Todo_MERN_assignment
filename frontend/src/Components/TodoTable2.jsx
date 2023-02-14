import React, { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import Search from "antd/es/transfer/search";
import { columns } from "./Columns.jsx";
export function renderColor(status) {
  switch (status) {
    case "open":
      return (
        <Tag color="green">
          <strong>OPEN</strong>
        </Tag>
      );
    case "working":
      return (
        <Tag color="yellow">
          <strong>WORKING</strong>
        </Tag>
      );
    case "done":
      return (
        <Tag color="orange">
          <strong>DONE</strong>
        </Tag>
      );
    case "overdue":
      return (
        <Tag color="red">
          <strong>OVERDUE</strong>
        </Tag>
      );
    default:
      return (
        <Tag color="warning">
          <strong>Invalid </strong>
        </Tag>
      );
  }
}

const TableWithSorting = () => {
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

  // ----------------
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
    setPagination(pagination);
  };
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPagination({ current: 1, pageSize: 10 });
  };

  const handleReset = () => {
    setSearchText("");
    setPagination({ current: 1, pageSize: 10 });
  };
  const searchInput = (
    <Search
      placeholder="Search"
      value={searchText}
      onChange={handleSearch}
      allowClear
      onSearch={() => console.log("Searched!")}
    />
  );
  const filteredData = searchText
    ? data.filter((record) =>
        Object.values(record).some((value) =>
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : data;

  const paginatedData = filteredData.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <Table
      dataSource={paginatedData.length === 0 ? filteredData : paginatedData}
      columns={columns}
      onChange={handleChange}
      pagination={true}
      sortDirections={["ascend", "descend", "ascend"]}
      size="small"
      bordered
      title={() => searchInput}
      footer={() =>
        searchText && (
          <Button onClick={handleReset} type="primary" ghost htmlType="submit">
            Reset Search
          </Button>
        )
      }
    />
  );
};

export default TableWithSorting;
