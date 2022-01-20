import { format } from 'date-fns';

function Footer() {
    const currentYear = format(Date.now(), 'Y');
    return (
        <div className="bg-blue-500 text-white text-sm p-4 text-center">
            <div className="mb-1">&copy; {currentYear} Book Store, All rights reserved.</div>
            <div>Created by <a href="https://wteja.netlify.com">Weerayut Teja</a></div>
        </div>
    )
}

export default Footer;