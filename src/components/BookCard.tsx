import React from "react";
import type { Book } from "../App";
import "./BookCard.css";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  // 表紙画像がない場合のプレースホルダー
  const coverImage = book.imageLinks?.thumbnail || "/book-placeholder.png";

  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={coverImage} alt={`${book.title}の表紙`} />
      </div>

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>

        {book.authors && (
          <p className="book-authors">著者: {book.authors.join(", ")}</p>
        )}

        {book.publishedDate && (
          <p className="book-date">出版日: {book.publishedDate}</p>
        )}

        {book.description && (
          <p className="book-description">
            {book.description.substring(0, 150)}
            {book.description.length > 150 ? "..." : ""}
          </p>
        )}

        {book.infoLink && (
          <a
            href={book.infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="book-link"
          >
            詳細を見る
          </a>
        )}
      </div>
    </div>
  );
}

export default BookCard;
