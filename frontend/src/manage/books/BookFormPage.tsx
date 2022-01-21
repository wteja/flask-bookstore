import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Book from "../../models/book";
import { useRepository } from "../../repository";

const defaultBook: Book = {
    title: "",
    isbn: "",
    image: "",
    description: ""
}

function BookFormPage() {
    const router = useRouter();
    const id = router.query.id as string;
    const [book, setBook] = useState<Book>({ ...defaultBook })
    const [originalBook, setOriginalBook] = useState<Book>({ ...defaultBook })
    const repo = useRepository();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSuccess(false);
        setError(false);
        try {
            const updatedBook = await repo.saveBook(book);
            router.push(`/manage/books`);
            setBook({ ...updatedBook });
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const name = e.target.name;
        const value = e.target.value;
        const newBook = {
            ...book,
            [name]: value
        };
        setBook(newBook);
    }

    async function getBookById(id: string) {
        const foundBook = await repo.getBookById(id);
        if (foundBook) {
            setBook({ ...foundBook });
            setOriginalBook({ ...foundBook })
        } else {
            setError(true)
        }
    }

    function resetForm() {
        setBook({ ...originalBook });
    }

    useEffect(() => {
        if (id) {
            getBookById(id);
        }
    }, [id])

    return (
        <MainLayout>
            <form onSubmit={onSubmit}>
                {success && (
                    <div className="p-4 bg-green-200 text-green-600 mb-4">Save successfully.</div>
                )}
                {error && (
                    <div className="p-4 bg-red-200 text-red-600 mb-4">Something went wrong, please try again later.</div>
                )}
                <h1 className="text-2xl font-semibold mb-4">{!!id ? "Edit Book" : "Create Book"}</h1>
                <label htmlFor="title" className="text-sm">Title *</label>
                <div className="my-2">
                    <input type="text" id="title" name="title" required className="p-2 border border-gray-500 w-full" onChange={onChangeHandler} defaultValue={book?.title} />
                </div>
                <label htmlFor="isbn" className="text-sm">ISBN *</label>
                <div className="my-2">
                    <input type="text" id="isbn" name="isbn" required className="p-2 border border-gray-500 w-full" onChange={onChangeHandler} defaultValue={book?.isbn} />
                </div>
                <label htmlFor="image" className="text-sm">Image URL *</label>
                <div className="my-2">
                    <input type="text" id="image" name="image" required className="p-2 border border-gray-500 w-full" onChange={onChangeHandler} defaultValue={book?.image} />
                </div>
                <label htmlFor="image" className="text-sm">Description</label>
                <div className="my-2">
                    <input type="text" id="description" name="description" className="p-2 border border-gray-500 w-full" onChange={onChangeHandler} defaultValue={book?.description} />
                </div>
                <div className="mt-4 mb-2 flex items-center">
                    <input type="submit" id="submit" value="Save" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer" />
                    <input type="reset" id="reset" value="Reset" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded-lg cursor-pointer ml-4" onClick={resetForm} />
                    <Link href="/manage/books">
                        <a className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded-lg cursor-pointer ml-4">
                            Back
                        </a>
                    </Link>
                </div>
            </form>
        </MainLayout>
    )
}

export default BookFormPage;