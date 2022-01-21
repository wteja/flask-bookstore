import { useContext, useEffect, useState } from 'react';
import { } from 'next/router';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Book from '../models/book';
import Order from '../models/order';
import { AccessControlContext } from '../auth/AccessControl';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (config && config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

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
    async getBooksByIds(ids: string[]) {
        const { data } = await axios.get(`${this.baseUrl}/selected-books?ids=${ids.join(',')}`);
        return data.data as Book[];
    }
    async getBookById(id: string) {
        const result = await axios.get(`${this.baseUrl}/books/${id}`);
        return result.data.data as Book;
    }
    async saveBook(book: Book) {
        if (!!book.id) {
            const result = await axios.patch(`${this.baseUrl}/books/${book.id}`, book);
            return result?.data as Book;
        } else {
            const result = await axios.post(`${this.baseUrl}/books`, book);
            return result?.data as Book;
        }
    }
    async deleteBookById(id: string | number) {
        await axios.delete(`${this.baseUrl}/books/${id}`);
    }
    async createNewOrder(books: Book[]) {
        const result = await axios.post(`${this.baseUrl}/orders`, {
            books
        });
        return result?.data as Book;
    }
    async getAllOrders() {
        const { data } = await axios.get(`${this.baseUrl}/orders`);
        return data.data as Order[];
    }
    async deleteOrderById(id: string | number) {
        await axios.delete(`${this.baseUrl}/order/${id}`);
    }
}

let repo: Repository;

export function useRepository() {
    if (!repo) {
        repo = new Repository();
    }

    return repo;
}