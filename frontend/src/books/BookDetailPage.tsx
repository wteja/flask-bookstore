import { useState, useEffect } from 'react';
import MainLayout from "../layouts/MainLayout";
import { useRouter } from 'next/router';
import { useRepository } from '../repository';
import Book from '../models/book';
import useShoppingCart from '../hooks/useShoppingCart';
import { ToastContainer, toast } from 'react-toastify';

function BookDetailPage() {
    const [book, setBook] = useState<Book>();
    const router = useRouter();
    const id = router.query.id as string;
    const repo = useRepository();
    const { addBook } = useShoppingCart();

    async function getBookDetail(id: string) {
        const book = await repo.getBookById(id);
        if (book) {
            setBook(book);
        } else {
            router.replace('/404');
        }
    }

    function addToCart() {
        if (book) {
            const success = addBook(book);
            if(success) {
                toast("Book is added to cart!");
            } else {
                toast("Book is already added!");
            }
        }
    }

    useEffect(() => {
        if (id) {
            getBookDetail(id);
        }
    }, [id]);

    return (
        <MainLayout>
            {!book && (
                <div>Loading...</div>
            )}
            {!!book && (
                <div className="flex gap-x-8">
                    <div className="lg:w-1/2">
                        <img src={book.image} />
                    </div>
                    <div className="lg:w-1/2">
                        <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
                        <h2 className="text-lg font-bold mb-4">ISBN: {book.isbn}</h2>
                        {!!book.description && (
                            <div className="mb-8">
                                {book.description}
                            </div>
                        )}
                        <div className="mt-8">
                            <div onClick={() => addToCart()} className="inline-block text-2xl cursor-pointer px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Add to cart!</div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </MainLayout>
    )
}

export default BookDetailPage;