import { useState, useEffect } from 'react';
import MainLayout from "../layouts/MainLayout";
import { useRouter } from 'next/router';
import { useRepository } from '../repository';
import Book from '../models/book';

function BookDetailPage() {
    const [book, setBook] = useState<Book>();
    const router = useRouter();
    const id = router.query.id as string;
    const repo = useRepository();

    async function getBookDetail(id: string) {
        const book = await repo.getBookById(id);
        setBook(book);
    }

    useEffect(() => {
        if (id) {
            getBookDetail(id);
        }
    }, [id]);

    return (
        <MainLayout>

        </MainLayout>
    )
}

export default BookDetailPage;