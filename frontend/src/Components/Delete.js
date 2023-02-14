export async function deleteHandle(id) {
  const res = await fetch(
    `https://json-practice-api.onrender.com/userDetails/${id}`,
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
