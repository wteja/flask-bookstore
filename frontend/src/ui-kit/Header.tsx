import { useContext } from 'react';
import Link from 'next/link';
import { AccessControlContext } from '../auth/AccessControl';

function Header() {
    const { canAccess, login, logout, isLoading, isAuthenticated } = useContext(AccessControlContext);

    return (
        <div className="bg-blue-600 text-white p-5 flex items-center justify-between">
            <h1 className="font-bold text-2xl"> <Link href="/">
                <a><span className="text-red-500">B</span><span className="text-yellow-500">O</span><span className="text-teal-500">O</span><span className="text-fuchsia-500">K</span> <span className="text-white">STORE</span></a>
            </Link>
            </h1>
            <ul className="flex-1 mx-16 text-lg flex items-center space-x-16">
                <li>
                    <Link href="/">
                        <a>
                            <span>All Books</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/cart">
                        <a>
                            <span>Shopping Cart</span>
                        </a>
                    </Link>
                </li>
                {canAccess('post:books') && (
                    <li>
                        <Link href="/manage/books">
                            <a>
                                <span>Manage Books</span>
                            </a>
                        </Link>
                    </li>
                )}
                {canAccess('delete:orders') && (
                    <li>
                        <Link href="/manage/orders">
                            <a>
                                <span>Manage Orders</span>
                            </a>
                        </Link>
                    </li>
                )}
            </ul>
            <div className="justify-self-end">
                {!isLoading && !isAuthenticated && (
                    <div onClick={() => login()} className="px-4 py-2 bg-white text-blue-500 block rounded-lg cursor-pointer">Login</div>
                )}
                {!isLoading && isAuthenticated && (
                    <div onClick={() => logout()} className="px-4 py-2 bg-white text-blue-500 block rounded-lg cursor-pointer">Logout</div>
                )}
            </div>
        </div>
    )
}

export default Header;