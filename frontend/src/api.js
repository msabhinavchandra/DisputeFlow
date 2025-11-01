const base = "http://localhost:8080/api";

export async function getMyDisputes(auth, customerId){
  const res = await fetch(`${base}/disputes/my/${customerId}`, {
    headers: { Authorization: "Basic " + btoa(auth) }
  });
  return res.json();
}

export async function createDispute(auth, body){
  const res = await fetch(`${base}/disputes`, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      Authorization: "Basic " + btoa(auth)
    },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function changeStatus(auth, id, status){
  const res = await fetch(`${base}/disputes/${id}/status?status=${status}`, {
    method: "PATCH",
    headers: { Authorization: "Basic " + btoa(auth) }
  });
  return res.json();
}
