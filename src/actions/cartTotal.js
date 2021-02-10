
export const getTotal = (order) => {
  let tt = fetch("/api/total", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  }).then((res) => res.json())
  .then((data) => {
    return data.total
  });

  return tt
};
