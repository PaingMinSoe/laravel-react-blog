import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./views/Home";
import Blogs from "./views/Blogs";
import BlogDetails from "./views/BlogDetails";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/blogs",
                element: <Blogs />
            },
            {
                path: "/blogs/:id",
                element: <BlogDetails />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: localStorage.getItem('ACCESS_TOKEN') !== null ? <Navigate to="/" /> : <Signup />
            },
            {
                path: '*',
                element: <NotFound />,
            }
        ]
    }
]);

export default router;