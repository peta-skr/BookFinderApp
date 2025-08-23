import React from "react";
import BookCard from "./BookCard.tsx";
import type { Book } from "../App";
import "./BookList.css";

interface BookListProps {
  books: Book[];
}

function BookList({ books }: BookListProps) {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <BookCard key={book.id || index} book={book} />
      ))}
    </div>
  );
}

export default BookList;
