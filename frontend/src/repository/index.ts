import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Book from '../models/book';

export class Repository {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URI as string;
    }
    getAccessToken() {
        const { getAccessTokenSilently } = useAuth0()
        return getAccessTokenSilently();
    }
    async getAllBooks() {
        const { data } = await axios.get(`${this.baseUrl}/books`);
        return data.data as Book[];
    }
    async getBookById(id: string) {
        const result = await axios.get(`${this.baseUrl}/books/${id}`);
        return result?.data as Book;
    }
}

let repo: Repository;

export function useRepository() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [token, setToken] = useState("");

    async function fetchAndSetToken() {
        const rawToken = await getAccessTokenSilently();
        setToken(rawToken);
        axios.interceptors.request.use((config) => {
            if (config && config.headers && rawToken) {
                config.headers.Authorization = rawToken;
            }
            return config;
        })
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchAndSetToken();
        }
    }, [isAuthenticated]);

    if (!repo) {
        repo = new Repository();
    }

    return repo;
}