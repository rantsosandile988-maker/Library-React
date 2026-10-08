import React, { useState, useEffect } from "react";

export default function Transactions() {
  const [books, setBooks] = useState(() => JSON.parse(localStorage.getItem("books")) || []);
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem("transactions")) || []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [books, transactions]);

  const borrowBook = (id) => {
    setBooks(
      books.map((b) =>
        b.id === id && b.quantity > 0 ? { ...b, quantity: b.quantity - 1 } : b
      )
    );
    setTransactions([...transactions, { id: Date.now(), type: "Borrow", bookId: id }]);
  };

  const returnBook = (id) => {
    setBooks(
      books.map((b) =>
        b.id === id ? { ...b, quantity: b.quantity + 1 } : b
      )
    );
    setTransactions([...transactions, { id: Date.now(), type: "Return", bookId: id }]);
  };

  return (
    <div>
      <h2>🔄 Transactions</h2>
      {books.map((b) => (
        <div key={b.id}>
          {b.title} — {b.quantity} copies
          <button onClick={() => borrowBook(b.id)}>Borrow</button>
          <button onClick={() => returnBook(b.id)}>Return</button>
        </div>
      ))}

      <h3>History</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.type} → Book ID {t.bookId}
          </li>
        ))}
      </ul>
    </div>
  );
}
