// pages/Dashboard.jsx
import React from "react";

export default function Dashboard() {
  const books = JSON.parse(localStorage.getItem("books")) || [];

  return (
    <div>
      <h2>📊 Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Genre</th><th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id} style={{ background: b.quantity < 2 ? "#ffcccc" : "white" }}>
              <td>{b.title}</td><td>{b.author}</td><td>{b.genre}</td><td>{b.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
