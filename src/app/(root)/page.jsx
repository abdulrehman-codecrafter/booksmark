"use client";
import { useEffect, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Home() {

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
  }

  async function addBook() {
    await fetch("/api/books", { method: "POST", body: JSON.stringify({ title, description }) });
    setTitle("");
    setDescription("");
    fetchBooks();
  }

  async function markComplete(id, completed) {
    await fetch("/api/books", { method: "PATCH", body: JSON.stringify({ id, completed }) });
    fetchBooks();
  }

  async function deleteBook(id) {
    await fetch("/api/books", { method: "DELETE", body: JSON.stringify({ id }) });
    fetchBooks();
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📚 My Book List</h1>
        <UserButton />
      </div>
      
      <div className="mt-4 flex gap-2">
        <input className="border p-2 w-full" placeholder="Book title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addBook}>Add</button>
      </div>

      <ul className="mt-4 space-y-2">
        {books.map((book) => (
          <li key={book.id} className="flex justify-between border p-2">
            <span className={book.completed ? "line-through" : ""}>{book.title}</span>
            <div>
              <button onClick={() => markComplete(book.id, !book.completed)} className="text-green-500">✔</button>
              <button onClick={() => deleteBook(book.id)} className="text-red-500 ml-2">✖</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
