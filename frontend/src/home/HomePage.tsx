import MainLayout from "../layouts/MainLayout";
import BookList from './BookList';

function HomePage() {
    return (
        <MainLayout>
            <h1 className="text-2xl font-semibold">Welcome to Book Store</h1>
            <BookList />
        </MainLayout>
    )
}

export default HomePage;