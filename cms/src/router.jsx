import { createBrowserRouter, redirect } from "react-router-dom"
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import CategoryPage from "./views/CategoryPage";
import EditPage from "./views/EditPage";
import AddCuisine from "./views/AddCuisinePage";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
            const access_token = localStorage.access_token

            if (access_token) {
                return redirect("/");
            }
            return null
        }
    }, {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
            const access_token = localStorage.access_token

            if (!access_token) {
                return redirect("/login")
            }
            return null
        }
    }, {
        path: "/",
        element: <HomePage />
    }, {
        path: "/category",
        element: <CategoryPage />
    }, {
        path: "/edit/:id",
        element: <EditPage />
    }, {
        path: "/addcuisine",
        element: <AddCuisine />
    }
])

