import { useState } from "react";
import Book from "../models/book";
import { useRepository } from "../repository";

function useShoppingCart() {
    const repo = useRepository();

    function getBookIds() {
        return JSON.parse(localStorage.getItem('cartBookIds') || "[]") as string[];
    }

    function getBooks() {
        const cartBookIds = getBookIds();
        return repo.getBooksByIds(cartBookIds);
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

    function clearCart() {
        localStorage.setItem('cartBookIds', '[]');
    }

    return { getBooks, addBook, removeBook, clearCart }
}

export default useShoppingCart;