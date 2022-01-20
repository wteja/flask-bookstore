import { useState, useEffect } from 'react';
import Link from 'next/link';
import Book from '../models/book';
import { useRepository } from '../repository';

function BookList() {
    const repo = useRepository();
    const [books, setBooks] = useState<Book[]>();

    async function loadBooks() {
        const books = await repo.getAllBooks();
        if (books?.length) {
            setBooks(books);
        }
    }

    useEffect(() => {
        loadBooks();
    }, []);

    if (!books?.length)
        return null;

    return (
        <div className="grid grid-cols-4 gap-4 my-8">
            {books.map(it => (
                <div key={it.id} className="p-4 border border-gray-300 bg-white">
                    <Link href={`/books/${it.id}`}>
                        <a>
                            <img src={it.image} className="w-full h-64 object-cover" />
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default BookList;