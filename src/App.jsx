import React, { useState, useEffect } from "react";
import BookManagement from "./Pages/BookManagement";
import UserManagement from "./Pages/UserManagement";
import Transactions from "./Pages/Transactions";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  // Always include the hard-coded admin account
  const [users, setUsers] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("users")) || [];
    // Ensure admin is always in the list
    const admin = { id: 1, username: "Sandile", password: "Sandile3", role: "admin" };
    const hasAdmin = stored.some((u) => u.username === admin.username && u.role === "admin");
    return hasAdmin ? stored : [admin, ...stored];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleLogin = (username, password) => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser(found);
      setPage("dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegister = (username, password) => {
    if (users.some((u) => u.username === username)) {
      alert("User already exists");
      return;
    }
    const newUser = { id: Date.now(), username, password, role: "user" };
    setUsers([...users, newUser]);
    alert("Registration successful! Please login.");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  if (!user) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="app-container">
      <h1 className="title">📚 Library Management System</h1>
      <nav className="nav-bar">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("books")}>Books</button>
        <button onClick={() => setPage("users")}>Users</button>
        <button onClick={() => setPage("transactions")}>Transactions</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <div className="page-content">
        {page === "dashboard" && <Dashboard />}
        {page === "books" && <BookManagement user={user} />}
        {page === "users" && <UserManagement user={user} />}
        {page === "transactions" && <Transactions />}
      </div>
    </div>
  );
}
