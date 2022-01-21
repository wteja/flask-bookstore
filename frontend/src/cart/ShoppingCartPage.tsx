import BookList from "./BookList";
import useShoppingCart from "../hooks/useShoppingCart";
import MainLayout from "../layouts/MainLayout";
import Book from "../models/book";
import { useEffect, useState } from "react";

function ShoppingCartPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const { getBooks, removeBook } = useShoppingCart();

    function onDelete(book: Book) {
        removeBook(book);
        fetchBooks();
    }

    async function fetchBooks() {
        const books = await getBooks();
        setBooks(books);
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <MainLayout>
            {books && books.length > 0 && (
                <BookList books={books} onDelete={onDelete} />
            )}
            {(!books || books.length < 1) && (
                <div className="my-32 text-2xl text-center">
                    Shopping Cart is empty!
                </div>
            )}
        </MainLayout>
    )
}

export default ShoppingCartPage;