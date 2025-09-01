import { useEffect } from "react";
import { Link } from "react-router";
import '../../style.css';


const NotFoundPage = () => {
   
    useEffect(() => {
        document.title = "Error 404: Page Not Found";
        
    })
    return (
        <>
        <h1 className="text-2xl font-bold mt-12 text-center text-cf-dark-red">Error 404</h1>
        <h2 className="text-xl font-bold text-center mt-4">Page Not Found</h2>
        <p className="text-center mt-2">The page you are looking for does not exist.</p>
        
        <Link to="/" className="text-blue-500 hover:underline mt-4 block text-center">
            Go back to Examples</Link>
        </>
    )
};

export default NotFoundPage;