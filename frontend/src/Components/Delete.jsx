import { Alert } from "antd";
export async function deleteHandle(id) {
  const res = await fetch(
    `http://localhost:8000/tasks${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const deletedData = res.json();
  deletedData
    .then((res) => {
      alert("done");
    })
    .catch((err) => {
      alert("err");
    });
}
