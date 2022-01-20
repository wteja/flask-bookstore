import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface IAccessControl {
    children: React.ReactNode;
}

function AccessControl({ children }: IAccessControl) {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [isReady, setIsReady] = useState(false);

    async function checkToken() {
        if (isAuthenticated) {
            const token = await getAccessTokenSilently();
            localStorage.setItem('access_token', token);
        }
        setIsReady(true);
    }

    useEffect(() => {
        checkToken();
    });

    if (!isReady)
        return null;

    return <>{children}</>;
}

export default AccessControl;