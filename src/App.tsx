import React, { useState } from "react";
import SearchBar from "./components/SearchBar.tsx";
import BookList from "./components/BookList.tsx";
import LoadingSpinner from "./components/LoadingSpinner.tsx";
import "./App.css";

// 本の型定義
export interface Book {
  id: string;
  title: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  infoLink?: string;
}

interface GoogleBooksResponse {
  items?: GoogleBookItem[];
  totalItems: number;
  kind: string;
}

interface GoogleBookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    infoLink?: string;
  };
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // APIを呼び出す関数
  const searchBooks = async (query: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // ここでAPIを呼び出す処理を実装
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("APIからのレスポンスに問題がありました。");
      }

      const data: GoogleBooksResponse = await response.json();

      // APIレスポンスをアプリで扱いやすい形式に変換
      const formattedBooks: Book[] = data.items
        ? data.items.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            publishedDate: item.volumeInfo.publishedDate,
            description: item.volumeInfo.description,
            imageLinks: item.volumeInfo.imageLinks,
            infoLink: item.volumeInfo.infoLink,
          }))
        : [];

      setBooks(formattedBooks);

      console.log(formattedBooks);

      setIsLoading(false);
    } catch (err) {
      setError("検索中にエラーが発生しました。もう一度お試しください。");
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Book Finder</h1>
        <p>お気に入りの本を見つけよう</p>
      </header>

      <SearchBar onSearch={searchBooks} />

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : books.length > 0 ? (
        <BookList books={books} />
      ) : (
        hasSearched && (
          <div className="no-results">
            <p>検索結果はありません。別のキーワードをお試しください。</p>
          </div>
        )
      )}

      <footer className="app-footer">
        <p>© 2025 Book Finder App</p>
      </footer>
    </div>
  );
}

export default App;
