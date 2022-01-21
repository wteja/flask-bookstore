import BookList from "./BookList";
import useShoppingCart from "../hooks/useShoppingCart";
import MainLayout from "../layouts/MainLayout";
import Book from "../models/book";
import { useEffect, useState } from "react";
import { useRepository } from "../repository";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

function ShoppingCartPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const { getBooks, removeBook, clearCart } = useShoppingCart();
    const repo = useRepository();
    const router = useRouter();

    function onDelete(book: Book) {
        removeBook(book);
        fetchBooks();
    }

    async function fetchBooks() {
        const books = await getBooks();
        setBooks(books);
    }

    async function finishOrder() {
        await repo.createNewOrder(books);
        clearCart();
        toast("Thank you for ordering books with us!")
        router.push("/");
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <MainLayout>
            {books && books.length > 0 && (
                <>
                    <BookList books={books} onDelete={onDelete} />
                    <div className="flex justify-end mt-8">
                        <div onClick={() => finishOrder()} className="block cursor-pointer px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Finish Order</div>
                    </div>
                </>
            )}
            {(!books || books.length < 1) && (
                <div className="my-32 text-2xl text-center">
                    Shopping Cart is empty!
                </div>
            )}
            <ToastContainer />
        </MainLayout>
    )
}

export default ShoppingCartPage;