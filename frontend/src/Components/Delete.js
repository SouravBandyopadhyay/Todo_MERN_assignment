import { Alert } from "antd";
export async function deleteHandle(id) {
  const res = await fetch(
    `https://algobulls-backend.onrender.com/tasks/${id}`,
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
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}
