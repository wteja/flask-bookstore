import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth0 } from '@auth0/auth0-react';

function Header() {
    const { isAuthenticated, isLoading, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated)
            return;

        const setToken = async () => {
            const token = await getAccessTokenSilently();
            localStorage.setItem('access_token', token);
        }
        setToken();
    }, [isAuthenticated]);

    return (
        <div className="bg-blue-600 text-white p-5 flex items-center justify-between">
            <h1 className="font-bold text-2xl"> <Link href="/">
                <a>Book Store</a>
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
                    <Link href="/orders">
                        <a>
                            <span>My Orders</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/manage/books">
                        <a>
                            <span>Manage Books</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/manage/orders">
                        <a>
                            <span>Manage Orders</span>
                        </a>
                    </Link>
                </li>
            </ul>
            <div className="justify-self-end">
                {!isLoading && !isAuthenticated && (
                    <div onClick={() => loginWithRedirect()} className="px-4 py-2 bg-white text-blue-500 block rounded-lg cursor-pointer">Login</div>
                )}
                {!isLoading && isAuthenticated && (
                    <div onClick={() => logout()} className="px-4 py-2 bg-white text-blue-500 block rounded-lg cursor-pointer">Logout</div>
                )}
            </div>
        </div>
    )
}

export default Header;