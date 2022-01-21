import { ReactNode } from 'react';
import Head from 'next/head';
import Footer from '../ui-kit/Footer';
import Header from '../ui-kit/Header';

interface IMainLayout {
    children: ReactNode;
}

function MainLayout({ children }: IMainLayout) {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Book Store</title>
            </Head>
            <Header />
            <div className="flex-1 py-8">
                <div className="lg:w-256 mx-auto">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;