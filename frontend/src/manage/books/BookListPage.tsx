import Link from "next/link";
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Book from "../../models/book";
import { useRepository } from "../../repository";
import BookList from "./BookList";

function BookListPage() {
    const repo = useRepository();
    const [books, setBooks] = useState<Book[]>([]);
    const [firstLoad, setFirstLoad] = useState(false);

    async function fetchBooks() {
        const data = await repo.getAllBooks();
        setBooks(data);
        setFirstLoad(true);
    }

    async function onDelete(id?: string | number) {
        if(!id)
            return;

        const isAccepted = confirm("Do you want to delete this book?");
        if(isAccepted) {
            await repo.deleteBookById(id);
            await fetchBooks();
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <MainLayout>
            <h1 className="text-2xl font-semibold mb-4">Manage Books</h1>
            {firstLoad && (
                <>
                    {!books.length && (
                        <div className="text-center my-32">
                            <div>There is no book yet.</div>
                            <div className="mt-4">
                                <Link href="/manage/books/form">
                                    <a className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                        Create a new one!
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )}
                    {!!books.length && (
                        <BookList books={books} onDelete={id => onDelete(id)} />
                    )}
                </>
            )}
            {!firstLoad && (
                <div className="my-32 text-center">Loading...</div>
            )}
        </MainLayout>
    )
}

export default BookListPage;