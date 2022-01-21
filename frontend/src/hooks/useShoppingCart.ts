import { useState } from "react";
import Book from "../models/book";
import { useRepository } from "../repository";

function useShoppingCart() {
    const [books, setBooks] = useState<Book[]>([]);
    const repo = useRepository();

    function getBookIds() {
        return JSON.parse(localStorage.getItem('cartBookIds') || "[]") as string[];
    }

    async function getBooks() {
        const cartBookIds = getBookIds();
        const books = await repo.getBooksByIds(cartBookIds);
        return books;
    }

    function addBook(book: Book) {
        const cartBookIds = getBookIds();
        const exists = cartBookIds.some(id => id === book.id);
        if (!exists) {
            cartBookIds.push(book.id as string);
            localStorage.setItem('cartBookIds', JSON.stringify(cartBookIds));
            return true;
        } else {
            return false;
        }
    }

    function removeBook(book: Book) {
        const cartBookIds = getBookIds();
        const filtered = cartBookIds.filter(id => id !== book.id);
        localStorage.setItem('cartBookIds', JSON.stringify(filtered));
    }

    return { getBooks, addBook, removeBook }
}

export default useShoppingCart;