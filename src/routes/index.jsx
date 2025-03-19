import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import SingleBlogPage from "../components/SingleBlogPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <h3 className="text-center">چیزی پیدا نکردیم متاسفانه 🤗 ...</h3>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/blogs/:blogId",
        element: <SingleBlogPage />,
      },
    ],
  },
]);
