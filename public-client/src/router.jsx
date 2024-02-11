import { createBrowserRouter } from "react-router-dom";
import HomePage from "./views/homepage";
import DetailPage from "./views/DetailPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/cuisines/:id",
        element: <DetailPage />
    }
])