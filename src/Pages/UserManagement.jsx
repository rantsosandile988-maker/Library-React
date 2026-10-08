import React, { useState, useEffect } from "react";

export default function UserManagement({ user }) {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const deleteUser = (id) => {
    if (user.role !== "admin") {
      alert("Only admin can delete users");
      return;
    }
    setUsers(users.filter((u) => u.id !== id));
  };

  const editProfile = (id) => {
    if (user.id !== id) {
      alert("You can only edit your own profile");
      return;
    }
    const updated = users.map((u) =>
      u.id === id ? { ...u, username: prompt("Enter new username:", u.username) || u.username } : u
    );
    setUsers(updated);
  };

  return (
    <div>
      <h2>👤 User Management</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} ({u.role})
            {user.role === "admin" && <button onClick={() => deleteUser(u.id)}>Delete</button>}
            {user.id === u.id && <button onClick={() => editProfile(u.id)}>Edit Profile</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
