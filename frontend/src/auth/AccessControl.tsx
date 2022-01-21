import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import jwtDecode from 'jwt-decode';

interface IAccessControlContext {
    token: string;
    permissions: string[];
    isLoading: boolean;
    isAuthenticated: boolean;
    canAccess: (permission: string) => boolean;
    login: () => Promise<void>;
    logout: () => void;
}

export const AccessControlContext = createContext<IAccessControlContext>({
    token: "",
    permissions: [],
    isLoading: false,
    isAuthenticated: false,
    canAccess: () => false,
    login: () => Promise.resolve(),
    logout: () => { },
})

interface IAccessControl {
    children: React.ReactNode;
}

const ACCESS_TOKEN_KEY = 'access_token';

export function useLocalStorage() {
    function setToken(token: string) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
    function getToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
    }

    return { setToken, getToken };
}

function AccessControl({ children }: IAccessControl) {
    const { getAccessTokenSilently, isAuthenticated, isLoading, loginWithRedirect: login, logout } = useAuth0();
    const [isReady, setIsReady] = useState(false);
    const { setToken: setTokenToStore } = useLocalStorage();
    const [token, setToken] = useState("");
    const [permissions, setPermissions] = useState<string[]>([]);

    async function checkToken() {
            if(isAuthenticated) {
                const token = await getAccessTokenSilently();
                setTokenToStore(token);
                setToken(token);
                const decoded = jwtDecode(token) as { permissions: string[] };
                if (decoded?.permissions?.length) {
                    setPermissions(decoded.permissions);
                } else {
                    setPermissions([]);
                }
            } else {
                setToken("");
                setPermissions([]);
            }
        setIsReady(true);
    }

    function canAccess(permission: string) {
        return permissions.indexOf(permission) > -1;
    }

    useEffect(() => {
        if (!isReady && !isLoading) {
            checkToken();
        }
    }, [isReady, isAuthenticated, isLoading]);

    if (!isReady || isLoading)
        return null;

    return <AccessControlContext.Provider value={{ isLoading, isAuthenticated, token, permissions, canAccess, login, logout }}>{children}</AccessControlContext.Provider>;
}

export default AccessControl;