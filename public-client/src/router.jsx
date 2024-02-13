import { createBrowserRouter } from "react-router-dom";
import HomePage from "./views/homepage";
import DetailPage from "./views/DetailPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        children: [
            {
                path: "/cuisines/:id",
                element: <DetailPage />
            }

        ]
    }
])