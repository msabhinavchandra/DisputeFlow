import { useState, useEffect } from "react";
import { getMyDisputes, createDispute, changeStatus } from "./api";

export default function App(){
  const [auth, setAuth] = useState(""); // "alice@demo.com:pass" or "ops@demo.com:pass"
  const [role, setRole] = useState("CUSTOMER"); // toggle CUSTOMER or OPS
  const [customerId, setCustomerId] = useState(1001);
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ amount: "", merchant: "", reason: "" });

  async function refresh(){
    if(role === "CUSTOMER" && auth) {
      const data = await getMyDisputes(auth, customerId);
      setList(data);
    }
  }
  useEffect(() => { refresh(); }, [auth, role]);

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>DisputeFlow MVP</h2>

      <section style={{ marginBottom: 16 }}>
        <label>Auth (username:password): </label>
        <input placeholder="alice@demo.com:pass" value={auth} onChange={e=>setAuth(e.target.value)} />
        <select value={role} onChange={e=>setRole(e.target.value)} style={{ marginLeft: 8 }}>
          <option>CUSTOMER</option>
          <option>OPS</option>
        </select>
      </section>

      {role === "CUSTOMER" && (
        <>
          <h3>Create Dispute</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <input placeholder="Amount" value={form.amount}
              onChange={e=>setForm({...form, amount: e.target.value})} />
            <input placeholder="Merchant" value={form.merchant}
              onChange={e=>setForm({...form, merchant: e.target.value})} />
            <input placeholder="Reason" value={form.reason}
              onChange={e=>setForm({...form, reason: e.target.value})} />
            <button onClick={async ()=>{
              if(!auth) return alert("Enter auth");
              const body = {
                customerId,
                amount: Number(form.amount),
                merchant: form.merchant,
                reason: form.reason
              };
              await createDispute(auth, body);
              setForm({amount:"", merchant:"", reason:""});
              refresh();
            }}>Create</button>
          </div>

          <h3 style={{ marginTop: 24 }}>My Disputes</h3>
          <button onClick={refresh}>Refresh</button>
          <ul>
            {list.map(d => (
              <li key={d.id}>#{d.id} {d.merchant} ₹{d.amount} [{d.status}]</li>
            ))}
          </ul>
        </>
      )}

      {role === "OPS" && (
        <>
          <h3>Ops Console</h3>
          <p>Use curl to list or add a quick list endpoint later if you want. For now, change status by id.</p>
          <ChangeStatus auth={auth} />
        </>
      )}
    </div>
  );
}

function ChangeStatus({ auth }){
  const [id, setId] = useState("");
  const [status, setStatus] = useState("UNDER_REVIEW");
  return (
    <div style={{ display:"flex", gap:8 }}>
      <input placeholder="Dispute ID" value={id} onChange={e=>setId(e.target.value)} />
      <select value={status} onChange={e=>setStatus(e.target.value)}>
        <option>UNDER_REVIEW</option>
        <option>RESOLVED</option>
      </select>
      <button onClick={async ()=>{
        if(!auth) return alert("Enter auth");
        await changeStatus(auth, Number(id), status);
        alert("Updated");
      }}>Update</button>
    </div>
  );
}
