import Book from "../../models/book";
import Link from 'next/link';

interface IBookList {
    books: Book[];
    onDelete: (id?: string | number) => Promise<void>;
}

function BookList({ books, onDelete }: IBookList) {
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
                        <th className="border border-gray-300 p-2 font-semibold text-left">ISBN</th>
                        <th className="border border-gray-300 p-2 font-semibold text-left">Title</th>
                        <th className="border border-gray-300 p-2 font-semibold">Edit</th>
                        <th className="border border-gray-300 p-2 font-semibold">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td className="border border-gray-300 text-center p-2 w-32">{book.id}</td>
                            <td className="border border-gray-300 p-2 w-48">{book.isbn}</td>
                            <td className="border border-gray-300 p-2">{book.title}</td>
                            <td className="border border-gray-300 p-2 text-center w-32">
                                <Link href={`/manage/books/form/${book.id}`}>
                                    <a className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Edit</a>
                                </Link>
                            </td>
                            <td className="border border-gray-300 p-2 text-center w-32">
                                <div onClick={() => onDelete(book.id)} className="inline-block cursor-pointer px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">Delete</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default BookList;