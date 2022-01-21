import { useState } from "react";
import Book from "../models/book";

function useShoppingCart() {
    const [books, setBooks] = useState<Book[]>([]);
    function addBook(book: Book) {
        const exists = books.some(it => it.id === book.id);
        if (!exists) {
            setBooks([
                ...books,
                book
            ]);
        }
    }

    function removeBook(book: Book) {
        const filtered = books.filter(it => it.id !== book.id);
        setBooks([...filtered]);
    }

    return { books, addBook, removeBook }
}

export default useShoppingCart;