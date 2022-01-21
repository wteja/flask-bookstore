import Book from "../../models/book";
import Link from 'next/link';

interface IBookList {
    books: Book[]
}

function BookList({ books }: IBookList) {
    return (
        <>
            <div className="flex justify-end mb-4">
                <Link href={`/manage/books/form`}>
                    <a className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Add New Book</a>
                </Link>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2 font-semibold">ID</th>
                        <th className="border border-gray-300 p-2 font-semibold">ISBN</th>
                        <th className="border border-gray-300 p-2 font-semibold">Title</th>
                        <th className="border border-gray-300 p-2 font-semibold">Edit</th>
                        <th className="border border-gray-300 p-2 font-semibold">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td className="border border-gray-300 text-center p-2">{book.id}</td>
                            <td className="border border-gray-300 p-2">{book.isbn}</td>
                            <td className="border border-gray-300 p-2">{book.title}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <Link href={`/manage/books/form/${book.id}`}>
                                    <a className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Edit</a>
                                </Link>
                            </td>
                            <td className="border border-gray-300 p-2">

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default BookList;