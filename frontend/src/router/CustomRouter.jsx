import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../views/Home";
import Blogs from "../views/Blogs";
import BlogDetails from "../views/BlogDetails";
import Login from "../views/Login";
import Signup from "../views/Signup";
import Profile from "../views/Profile";
import NotFound from "../views/NotFound";
import { useAuth } from "../contexts/AuthContext";
import Create from "../views/Create";

export default function CustomRouter() {
    const { token } = useAuth();
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
                    element: token ? <Navigate to="/" /> : <Login />
                },
                {
                    path: "/signup",
                    element: token ? <Navigate to="/" /> : <Signup />
                },
                {
                    path: "/profile",
                    element: !token ? <Navigate to="/login" /> : <Profile />
                },
                {
                    path: "/create",
                    element: !token ? <Navigate to="/login" /> : <Create />
                },
                {
                    path: '*',
                    element: <NotFound />,
                },
            ]
        }
    ]);

    return <RouterProvider router={router} />
}