import React, { useState, useEffect } from "react";

export default function BookManagement({ user }) {
  const [books, setBooks] = useState(() => JSON.parse(localStorage.getItem("books")) || []);
  const [form, setForm] = useState({ title: "", author: "", genre: "", isbn: "", quantity: 1 });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = () => {
    if (user.role !== "admin") {
      alert("Only admin can add books");
      return;
    }
    setBooks([...books, { ...form, id: Date.now() }]);
    setForm({ title: "", author: "", genre: "", isbn: "", quantity: 1 });
  };

  const updateBook = (id) => {
    if (user.role !== "admin") {
      alert("Only admin can update books");
      return;
    }
    const updated = books.map((b) =>
      b.id === id ? { ...b, title: form.title || b.title } : b
    );
    setBooks(updated);
  };

  const deleteBook = (id) => {
    if (user.role !== "admin") {
      alert("Only admin can delete books");
      return;
    }
    setBooks(books.filter((b) => b.id !== id));
  };

  return (
    <div>
      <h2>📖 Book Management</h2>
      {user.role === "admin" && (
        <>
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <input placeholder="Genre" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} />
          <input placeholder="ISBN" value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} />
          <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
          <button onClick={addBook}>Add Book</button>
        </>
      )}

      <ul>
        {books.map((b) => (
          <li key={b.id}>
            {b.title} by {b.author} ({b.genre}) — {b.quantity} copies
            {user.role === "admin" && (
              <>
                <button onClick={() => updateBook(b.id)}>Update</button>
                <button onClick={() => deleteBook(b.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
